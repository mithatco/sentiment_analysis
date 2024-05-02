from flask import Flask, request, jsonify
from transformers import pipeline
import os

# Set the cache directory
os.environ['TRANSFORMERS_CACHE'] = '/tmp/transformers_cache/'

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}}) 

# Load the sentiment analysis pipeline
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
sentiment_analyzer = pipeline("sentiment-analysis", model=model_name)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/analyze', methods=['POST'])
def analyze():
    print(request.json)
    data = request.json
    text = data['text']
    result = sentiment_analyzer(text)
    response = jsonify(result)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=False)
