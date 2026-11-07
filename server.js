// Nạp module http có sẵn của Node.js
const http = require("http");

// Cổng server lắng nghe (theo đề: 3000)
const PORT = 3000;

// Thông tin sinh viên (sửa mã sinh viên cho đúng)
const hoTen = "Nguyễn Trần Nhật Tiến";
const maSV = "MÃ-SV-CỦA-BẠN";

// Trang HTML trả về cho trình duyệt
const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thực hành HTTP Server</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f5f7;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #fff;
      padding: 40px 60px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 { color: #0071e3; margin: 0 0 10px; }
    p { color: #555; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Xin chào!</h1>
    <p>Họ và tên: <strong>${hoTen}</strong></p>
    <p>Mã sinh viên: <strong>${maSV}</strong></p>
    <p>Lớp: CDCNTT18B</p>
  </div>
</body>
</html>`;

// Tạo server: mỗi lần có người truy cập thì trả về trang HTML
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

// Bật server ở cổng 3000
server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});