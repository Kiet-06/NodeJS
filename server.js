// Nạp module http có sẵn của Node.js (không cần cài thêm gì)
const http = require("http");

// Cổng mà server sẽ lắng nghe, truy cập qua localhost:3000
const PORT = 3000;

// Nội dung trang HTML sẽ trả về cho trình duyệt
const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTTP Server đầu tiên</title>
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
    <p>Họ và tên: <strong>Nguyễn Trần Nhật Tiến</strong></p>
    <p>Lớp: CDCNTT18B</p>
    <p>Bài 2: HTTP Server đầu tiên bằng Node.js</p>
  </div>
</body>
</html>`;

// Tạo server: mỗi khi có người truy cập (request), hàm này chạy
// req = yêu cầu từ trình duyệt, res = phản hồi mình gửi lại
const server = http.createServer((req, res) => {
  // Báo mã 200 (thành công) và kiểu nội dung là HTML, hỗ trợ tiếng Việt (utf-8)
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  // Gửi nội dung HTML về và kết thúc phản hồi
  res.end(html);
});

// Bật server, bắt đầu lắng nghe ở cổng 3000
server.listen(PORT, () => {
  // In ra Terminal để biết server đã chạy
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});