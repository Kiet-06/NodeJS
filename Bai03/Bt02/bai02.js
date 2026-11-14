// bai02.js - Web Server với module http
const http = require("http");

const PORT = 3000;

const sinhVien = {
  hoTen: "Nguyễn Anh Kiệt",
  maSV: "CDCNTT18B14",
  lop: "CDCNTT18B",
  soThich: "lập trình Node.js",
};

// Hàm dùng chung để tạo trang HTML
const render = (title, body) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
</head>
<body>
  <nav><a href="/">Trang chủ</a> | <a href="/about">Giới thiệu</a> | <a href="/contact">Liên hệ</a></nav>
  <h1>${title}</h1>
  ${body}
</body>
</html>`;

// Bảng định tuyến
const routes = {
  "/": () =>
    render("Xin chào!", `<p>Mình là ${sinhVien.hoTen}</p><p>Mã sinh viên: ${sinhVien.maSV}</p>`),
  "/about": () =>
    render(
      "Giới thiệu bản thân",
      `<p>Họ tên: ${sinhVien.hoTen}</p>
       <p>Mã SV: ${sinhVien.maSV}</p>
       <p>Lớp: ${sinhVien.lop}</p>
       <p>Sở thích: ${sinhVien.soThich}</p>`
    ),
  "/contact": () =>
    render("Liên hệ", `<p>Vui lòng liên hệ ${sinhVien.hoTen} qua lớp ${sinhVien.lop}.</p>`),
};

const server = http.createServer((req, res) => {
  const handler = routes[req.url];

  if (handler) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(handler());
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(render("404 - Không tìm thấy trang", "<p>Trang bạn tìm không tồn tại.</p>"));
  }
});

server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});