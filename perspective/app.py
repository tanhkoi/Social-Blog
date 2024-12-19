from flask import Flask, request, jsonify
from googleapiclient import discovery
import os

app = Flask(__name__)

# Replace with your actual API key
API_KEY = os.getenv("PERSPECTIVE_API_KEY", "AIzaSyAcYTEw8QXhJs6NZavzjPUo1ed79z2T-LE")

client = discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=API_KEY,
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
)

@app.route('/api/perspective/analyze', methods=['POST'])
def analyze_comment():
    try:
        # Get the comment text from the request body
        data = request.get_json()
        comment_text = data.get('text', '')

        if not comment_text:
            return jsonify({"error": "Text is required"}), 400

        analyze_request = {
            'comment': {'text': comment_text},
            'requestedAttributes': {'TOXICITY': {}}
        }

        response = client.comments().analyze(body=analyze_request).execute()
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
