from flask import Flask, request, jsonify, send_file
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav
import tempfile

app = Flask(__name__)

# Preload các mô hình của Bark để sử dụng
preload_models()

@app.route('/generate-audio', methods=['POST'])
def generate_audio_api():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Sử dụng Bark để tạo giọng nói từ văn bản
    try:
        audio_array = generate_audio(text)
    except Exception as e:
        return jsonify({"error": f"Audio generation failed: {str(e)}"}), 500

    # Tạo file âm thanh tạm và lưu nó
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    write_wav(temp_file.name, SAMPLE_RATE, audio_array)

    # Gửi file âm thanh về cho client
    return send_file(temp_file.name, mimetype="audio/wav", as_attachment=True)

if __name__ == '__main__':
    app.run(port=5000)
