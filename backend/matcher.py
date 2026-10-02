import json
import string
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Configuration
SIMILARITY_THRESHOLD = 0.3
FALLBACK_MESSAGE = "Sorry, I couldn't find a reliable answer to that question. Please try rephrasing it or choose one of the available FAQs."

class FAQMatcher:
    def __init__(self, data_path=None):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.faqs = []
        self.corpus = []
        self.faq_mapping = [] # maps corpus index to faq index
        
        if data_path and os.path.exists(data_path):
            self.load_data(data_path)
    
    def preprocess(self, text):
        if not text:
            return ""
        # Normalize case
        text = text.lower()
        # Trim whitespace
        text = text.strip()
        # Remove punctuation safely
        text = text.translate(str.maketrans('', '', string.punctuation))
        return text

    def load_data(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                self.faqs = json.load(f)
            
            for idx, faq in enumerate(self.faqs):
                # Add main question
                clean_q = self.preprocess(faq['question'])
                self.corpus.append(clean_q)
                self.faq_mapping.append(idx)
                
                # Add alternatives
                for alt in faq.get('alternatives', []):
                    clean_alt = self.preprocess(alt)
                    self.corpus.append(clean_alt)
                    self.faq_mapping.append(idx)
            
            if self.corpus:
                self.vectorizer.fit(self.corpus)
                self.tfidf_matrix = self.vectorizer.transform(self.corpus)
                
        except (FileNotFoundError, json.JSONDecodeError):
            self.faqs = []
            self.corpus = []

    def get_answer(self, user_question):
        if not user_question or not user_question.strip():
            return {"answer": "Please enter a question.", "score": 0.0}
            
        if not self.faqs or not self.corpus:
            return {"answer": FALLBACK_MESSAGE, "score": 0.0}
            
        clean_user_q = self.preprocess(user_question)
        user_vec = self.vectorizer.transform([clean_user_q])
        
        similarities = cosine_similarity(user_vec, self.tfidf_matrix).flatten()
        best_idx = similarities.argmax()
        best_score = similarities[best_idx]
        
        if best_score >= SIMILARITY_THRESHOLD:
            faq_idx = self.faq_mapping[best_idx]
            matched_faq = self.faqs[faq_idx]
            return {
                "matched_question": matched_faq["question"],
                "answer": matched_faq["answer"],
                "score": float(best_score)
            }
            
        return {
            "answer": FALLBACK_MESSAGE,
            "score": float(best_score)
        }
