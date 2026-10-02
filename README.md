# Chatbot for FAQs

## 1. Project Title and Overview
**Chatbot for FAQs** is a lightweight web application built for an internship project. It allows users to ask questions related to a specific topic (in this case, a University IT Helpdesk) and instantly receive the most relevant answer from a curated FAQ dataset. It uses a modern React frontend and a Python backend powered by TF-IDF (Term Frequency-Inverse Document Frequency) and cosine similarity for natural language matching.

## 2. Problem Statement
Users often have recurring questions that can be answered with predefined, standardized responses. Manually searching through static FAQ pages can be time-consuming. This project solves that problem by providing a conversational interface that automatically matches user questions to existing FAQs.

## 3. Project Objectives
- Create a conversational chatbot interface to simplify FAQ discovery.
- Implement an explainable and deterministic natural language matching engine.
- Provide a robust fallback mechanism for queries that cannot be confidently answered.
- Build a full-stack web application demonstrating integration between a React frontend and a Flask backend.

## 4. Features Implemented
- **FAQ Matching Engine:** Evaluates user questions against a structured dataset.
- **Explainable NLP:** Uses TF-IDF and cosine similarity to score matches rather than a black-box AI model.
- **Configurable Fallback:** Safely handles unknown questions by presenting a polite fallback message when similarity scores fall below 0.3.
- **Responsive UI:** A clean, accessible chat interface that works seamlessly on desktop and mobile devices.
- **Resilient Error Handling:** Prevents blank submissions, duplicate requests during loading, and gracefully handles backend unavailability.

## 5. Technology Stack Actually Used
- **Frontend:** React, Vite, Plain CSS
- **Backend:** Python, Flask, Flask-CORS
- **Machine Learning / NLP:** scikit-learn (TF-IDF Vectorizer)
- **Testing:** pytest

## 6. Project Folder Structure
```text
faq-chatbot/
├── PROJECT_WORKFLOW.md
├── README.md
├── backend/
│   ├── app.py                 # Flask API endpoint
│   ├── faq_data.json          # Curated FAQ dataset
│   ├── matcher.py             # TF-IDF & cosine similarity logic
│   ├── requirements.txt       # Python dependencies
│   └── tests/
│       ├── test_app.py        # API tests
│       └── test_matcher.py    # Core matching logic tests
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx            # Main React chat component
        ├── App.css            # Custom CSS styling
        └── main.jsx
```

## 7. Prerequisites
- **Node.js** (v18+ recommended) and npm
- **Python** (v3.8+ recommended)

## 8. Installation and Setup Steps
Clone or open the repository, then set up the backend and frontend separately.

### Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows:** `venv\Scripts\activate`
   - **Mac/Linux:** `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup
1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## 9. How to Run the Backend
Ensure your virtual environment is active, then run:
```bash
cd backend
python app.py
```
The backend will run on `http://localhost:5000`.

## 10. How to Run the Frontend
In a separate terminal, run:
```bash
cd frontend
npm run dev
```
The frontend will typically run on `http://localhost:5173`. Open this URL in your browser.

## 11. How to Execute Available Tests
To run the automated backend tests:
```bash
cd backend
# Ensure virtual environment is active
set PYTHONPATH=.    # On Windows
export PYTHONPATH=. # On Mac/Linux
pytest tests/
```
To verify the frontend builds successfully:
```bash
cd frontend
npm run build
```

## 12. FAQ Dataset Format
The dataset is located at `backend/faq_data.json`. It is a JSON array of objects.
To add a new approved FAQ, append an object in the following format:
```json
{
  "id": "unique-id-here",
  "question": "The canonical question?",
  "answer": "The official answer.",
  "alternatives": [
    "optional alternative phrasing 1",
    "optional alternative phrasing 2"
  ]
}
```

## 13. Explanation of Text Preprocessing
Before any matching occurs, text is normalized to remove inconsistencies:
1. **Case folding:** All text is converted to lowercase.
2. **Whitespace trimming:** Leading and trailing spaces are removed.
3. **Punctuation removal:** Standard punctuation (e.g., `?`, `!`, `.`) is stripped out to ensure queries like "password?" and "password" are treated identically.

## 14. Explanation of TF-IDF and Cosine Similarity
- **TF-IDF (Term Frequency-Inverse Document Frequency):** Converts text into a mathematical vector. It gives high weight to words that are frequent in a specific question but rare across the entire dataset (identifying key topics), and low weight to common words like "the" or "how".
- **Cosine Similarity:** Measures the angle between the user's question vector and the FAQ vectors. A score of `1.0` means exact match, while `0.0` means no shared significant vocabulary.

## 15. Similarity Threshold and Fallback Behavior
The similarity threshold is configured as `SIMILARITY_THRESHOLD = 0.3` in `backend/matcher.py`. 
- If the highest cosine similarity score is **≥ 0.3**, the chatbot returns the matched answer.
- If the score is **< 0.3**, the chatbot assumes the user's intent is unknown and returns a safe fallback message: *"Sorry, I couldn't find a reliable answer to that question. Please try rephrasing it or choose one of the available FAQs."*

## 16. Known Limitations
- **Vocabulary matching:** Because the system relies on TF-IDF, it cannot understand complex synonyms out-of-the-box unless those synonyms are explicitly added to the `"alternatives"` array in the dataset.
- **No LLM Generation:** The chatbot does not generate text dynamically; it can only return hardcoded answers from the JSON dataset.
- **Local Development Only:** The application currently relies on local SQLite/file systems and localhost ports. It is not configured for production cloud deployment.

## 17. Demonstration Sequence for Internship Review
Follow these steps to demonstrate the project to your reviewer:
1. **Start the servers:** Start both the Flask API and the Vite frontend. Open the browser to the frontend URL.
2. **Exact Match Demo:** Type *"How do I reset my password?"* and hit Enter. Show how the exact answer is instantly retrieved.
3. **Alternative Phrasing Demo:** Type *"I forgot my password"* (which does not perfectly match the canonical question). Show how the system still retrieves the correct password reset answer.
4. **Fallback Demo:** Type *"Where is the best place to eat on campus?"*. Show how the chatbot politely declines to answer because it falls below the similarity threshold for the IT Helpdesk context.
5. **Robustness Demo:** Submit an empty text box (the button should be disabled). Attempt to submit just spaces; show how the UI prompts for a valid question.
