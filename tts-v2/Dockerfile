# Base image
FROM python:3.10-slim

# Cài đặt các công cụ cần thiết
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

# Tạo thư mục làm việc
WORKDIR /app

# Copy mã nguồn vào container
COPY . .

# Cài đặt các dependency Python
RUN pip install --no-cache-dir -r requirements.txt

# # Tự động chấp nhận license và tải model vào thư mục /app/models
# RUN mkdir -p /app/models && \
#     echo "y" | python main.py --output_path=/app/models

# # Thiết lập biến môi trường để ứng dụng sử dụng model đã tải
# ENV TTS_MODELS_PATH=/app/models

# Chạy script chính khi container bắt đầu
CMD ["python", "main.py"]
