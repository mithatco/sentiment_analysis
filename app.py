from flask import Flask, request, jsonify
from transformers import pipeline
import os

# Set the cache directory
os.environ['TRANSFORMERS_CACHE'] = '/tmp/transformers_cache/'

app = Flask(__name__)

# Load the sentiment analysis pipeline
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
sentiment_analyzer = pipeline("sentiment-analysis", model=model_name)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        text = data.get('text')
        if not text:
            return jsonify({"error": "No text provided"}), 400
        result = sentiment_analyzer(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)
