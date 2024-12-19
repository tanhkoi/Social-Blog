from flask import Flask, request, jsonify, send_file
import torch
from TTS.api import TTS
import os

# Kiểm tra thiết bị (CPU hoặc GPU)
device = "cuda" if torch.cuda.is_available() else "cpu"

# Hàm để tạo file âm thanh từ văn bản
def generate_audio(text):
    tts = TTS("tts_models/en/ljspeech/fast_pitch").to(device)
    output_path = "outputs/output.wav"
    tts.tts_to_file(text=text, file_path=output_path)
    return output_path

# Khởi tạo Flask app
app = Flask(__name__)

# Tạo thư mục outputs nếu chưa tồn tại
os.makedirs("outputs", exist_ok=True)

@app.route("/generate-audio", methods=["POST"])
def generate_audio_api():
    try:
        # Lấy dữ liệu từ request
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' in request body"}), 400

        text = data["text"]

        # Tạo file âm thanh
        audio_path = generate_audio(text)

        # Trả về file âm thanh
        return send_file(audio_path, mimetype="audio/wav")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
