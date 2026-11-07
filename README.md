# Bài 3 — Ứng dụng Node.js đầu tiên

Sinh viên: Nguyễn Trần Nhật Tiến | Mã SV: ĐIỀN-MÃ-SV-THẬT | Lớp: CDCNTT18B

## Yêu cầu
Tạo ứng dụng Node.js sử dụng module http. Server chạy tại cổng 3000. Khi truy cập trang chủ, trả về HTML có họ tên và mã sinh viên.

## Cách chạy
**Yêu cầu:** đã cài Node.js (v24.15.0).

1. Mở thư mục bai03 trong VS Code.

![Mở thư mục](images/01-mo-thu-muc.png)

2. Code trong server.js (dùng module `http`, lắng nghe cổng 3000).

![Code](images/02-code.png)

3. Mở Terminal tại thư mục bai03, chạy lệnh:
```
node server.js
```
Terminal hiện: `Server đang chạy tại http://localhost:3000`

![Terminal](images/03-terminal.png)

4. Mở trình duyệt, truy cập http://localhost:3000

![Kết quả](images/04-trinh-duyet.png)

## Kết quả
Trang web hiển thị họ tên Nguyễn Trần Nhật Tiến, mã sinh viên và lớp CDCNTT18B.

Dừng server: nhấn Ctrl + C trong Terminal.