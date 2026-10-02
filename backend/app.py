from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import time
from google import genai
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load FAQ data for context
DATA_PATH = os.path.join(os.path.dirname(__file__), 'faq_data.json')
with open(DATA_PATH, 'r') as f:
    faq_data = json.load(f)

faq_context = "Here is the knowledge base for the University IT Helpdesk:\n\n"
for item in faq_data:
    faq_context += f"Q: {item['question']}\nA: {item['answer']}\n\n"

SYSTEM_INSTRUCTION = (
    "You are the University IT Helpdesk FAQ Assistant. "
    "Answer questions primarily using the knowledge base below. "
    "If a user asks a general greeting or small talk, reply naturally but concisely. "
    "If a user asks a question completely unrelated to university IT or the knowledge base, "
    "politely inform them that you can only help with IT Helpdesk related questions.\n\n"
    f"Knowledge Base:\n{faq_context}"
)

# Configure Gemini client
api_key = os.getenv("GEMINI_API_KEY")
client = None
if api_key and api_key != "your_api_key_here":
    client = genai.Client(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY not found or not set. Please add it to your .env file.")

MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"]

def call_gemini(user_question):
    """Try each model with retries and exponential backoff."""
    for model_name in MODELS:
        for attempt in range(5):
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=user_question,
                    config=genai.types.GenerateContentConfig(
                        system_instruction=SYSTEM_INSTRUCTION,
                        temperature=0.3,
                        max_output_tokens=1024,
                    ),
                )
                if response.text:
                    return response.text
            except Exception as e:
                error_str = str(e)
                print(f"Model {model_name} attempt {attempt+1} failed: {error_str}")
                if "503" in error_str or "UNAVAILABLE" in error_str:
                    wait_time = min(3 * (attempt + 1), 15)
                    print(f"Retrying in {wait_time}s...")
                    time.sleep(wait_time)
                    continue
                elif "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                    print(f"Quota exhausted for {model_name}, trying next model...")
                    break
                elif "404" in error_str or "NOT_FOUND" in error_str:
                    break
                else:
                    break
    return None

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True)
    if not data or 'question' not in data:
        return jsonify({"error": "Invalid request. 'question' is required."}), 400
        
    user_question = data['question']
    
    if not client:
        return jsonify({"answer": "Error: GEMINI_API_KEY is not configured on the backend. Please add it to your .env file."})
        
    try:
        answer = call_gemini(user_question)
        if answer:
            return jsonify({"answer": answer})
        else:
            return jsonify({"answer": "Sorry, the AI service is temporarily busy. Please try again in a moment."})
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return jsonify({"answer": "Sorry, something went wrong. Please try again."})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
