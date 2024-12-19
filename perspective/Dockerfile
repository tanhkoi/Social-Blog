# Sử dụng Python làm image gốc
FROM python:3.9-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp vào container
COPY . /app

# Cài đặt các thư viện cần thiết
RUN pip install --no-cache-dir flask google-api-python-client

# Expose cổng 5001
EXPOSE 5001

# Chạy server khi container khởi động
CMD ["python", "app.py"]
