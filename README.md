# Hướng Dẫn Cài Đặt Bark

> [!NOTE]
>- Notes lỗi khi cài đặt và chạy chương trình ở dưới
>- Lần đầu call api thì chương trình sẽ tải một đống thứ trong generation.py, tầm đâu đó hơn **10GB**

- Yêu cầu:
  > Python 3.9 (này tự mò)
## Các bước cài đặt
### 1. Mở thư mục Bark với VSCode:
![image](https://github.com/user-attachments/assets/0d701ab3-f2ad-4092-9178-ec25526dd0e4)
### 2. Cài đặt thư viện với pip:
> Mở terminal trên vscode:
```
pip install .
```
### 3. Chạy server lên:
```
python run app.py
```
Như hình là ok nhé
![image](https://github.com/user-attachments/assets/fad7553a-79c5-489c-a9e9-05c8eb46e7d2)

## Số lỗi có thể xuất hiện:
> 1:
```
ERROR: After October 2020 you may experience errors when installing or updating packages. 
This is because pip will change the way that it resolves dependency conflicts.

We recommend you use --use-feature=2020-resolver to test your packages with the new resolver before it becomes the default.

botocore 1.35.82 requires urllib3<1.27,>=1.25.4; python_version < "3.10", 
but you'll have urllib3 2.2.3 which is incompatible.
```
```
pip install urllib3<1.27 && pip install .
```
> 2:
```
Traceback (most recent call last):
  File "D:\bark\app.py", line 1, in <module>
    from flask import Flask, request, jsonify, send_file
ModuleNotFoundError: No module named 'flask'
```
```
pip install flask
```
> 3:
```
No GPU being used. Careful, inference might be very slow!
```
```
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117 --force-reinstall
```
