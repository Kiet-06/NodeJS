// bai07.js - Web server xử lý tham số URL (cổng 3001) có giao diện đẹp
const http = require("http");

const PORT = 3001;

// Chống chèn mã HTML từ tham số người dùng nhập
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

// Màu theo loại thông báo
const MAU = {
  ok: { nen: "#e8f8ef", vien: "#2ecc71", chu: "#1e8449" },
  loi: { nen: "#fdecea", vien: "#e74c3c", chu: "#b03a2e" },
  info: { nen: "#eaf2fb", vien: "#3498db", chu: "#21618c" },
};

// Dựng trang HTML cho mọi phản hồi
function trangHTML({ icon, tieuDe, noiDung, loai = "info" }) {
  const m = MAU[loai];
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(tieuDe)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      font-family: "Segoe UI", Tahoma, sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px;
    }
    .card {
      background: #fff; width: 100%; max-width: 480px; border-radius: 20px;
      padding: 36px 32px; text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    }
    .icon { font-size: 56px; margin-bottom: 8px; }
    h1 { font-size: 22px; color: #2c3e50; margin-bottom: 18px; }
    .ketqua {
      background: ${m.nen}; color: ${m.chu}; border-left: 6px solid ${m.vien};
      border-radius: 12px; padding: 18px; font-size: 26px; font-weight: 600;
      line-height: 1.4; word-break: break-word;
    }
    .ketqua.nho { font-size: 17px; font-weight: 500; }
    .thu { margin-top: 26px; }
    .thu p { color: #7f8c8d; font-size: 13px; margin-bottom: 10px; }
    .thu a {
      display: inline-block; margin: 4px; padding: 9px 16px; border-radius: 999px;
      background: #f1f3f9; color: #5a4fcf; text-decoration: none; font-size: 14px;
      transition: all 0.2s;
    }
    .thu a:hover { background: #5a4fcf; color: #fff; transform: translateY(-2px); }
    footer { margin-top: 22px; font-size: 12px; color: #b2bec3; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${escapeHtml(tieuDe)}</h1>
    <div class="ketqua ${loai === "info" ? "nho" : ""}">${noiDung}</div>
    <div class="thu">
      <p>Thử nhanh:</p>
      <a href="/hello?name=Minh">/hello?name=Minh</a>
      <a href="/sum?a=10&b=20">/sum?a=10&amp;b=20</a>
      <a href="/hello">/hello (lỗi)</a>
      <a href="/sum?a=10&b=abc">/sum?a=10&amp;b=abc (lỗi)</a>
    </div>
    <footer>Node.js Web Server · cổng ${PORT}</footer>
  </div>
</body>
</html>`;
}

function guiTrang(res, maTrangThai, trang) {
  res.writeHead(maTrangThai, { "Content-Type": "text/html; charset=utf-8" });
  res.end(trangHTML(trang));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const params = url.searchParams;

  // Trang chủ
  if (url.pathname === "/") {
    return guiTrang(res, 200, {
      icon: "🚀",
      tieuDe: "Web Server xử lý tham số URL",
      noiDung: "Chọn một đường dẫn bên dưới để thử",
      loai: "info",
    });
  }

  // /hello?name=Minh
  if (url.pathname === "/hello") {
    const name = (params.get("name") || "").trim();
    if (!name) {
      return guiTrang(res, 400, {
        icon: "⚠️",
        tieuDe: "Thiếu tham số",
        noiDung: "Lỗi: thiếu tham số <b>name</b>.<br>Ví dụ: /hello?name=Minh",
        loai: "loi",
      });
    }
    return guiTrang(res, 200, {
      icon: "👋",
      tieuDe: "Lời chào",
      noiDung: `Xin chào ${escapeHtml(name)}`,
      loai: "ok",
    });
  }

  // /sum?a=10&b=20
  if (url.pathname === "/sum") {
    const strA = params.get("a");
    const strB = params.get("b");

    if (strA === null || strB === null || strA.trim() === "" || strB.trim() === "") {
      return guiTrang(res, 400, {
        icon: "⚠️",
        tieuDe: "Thiếu tham số",
        noiDung: "Lỗi: thiếu tham số <b>a</b> hoặc <b>b</b>.<br>Ví dụ: /sum?a=10&amp;b=20",
        loai: "loi",
      });
    }

    const a = Number(strA);
    const b = Number(strB);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return guiTrang(res, 400, {
        icon: "❌",
        tieuDe: "Giá trị không hợp lệ",
        noiDung: "Lỗi: <b>a</b> và <b>b</b> phải là số hợp lệ",
        loai: "loi",
      });
    }

    return guiTrang(res, 200, {
      icon: "➕",
      tieuDe: `${a} + ${b}`,
      noiDung: `Tổng = ${a + b}`,
      loai: "ok",
    });
  }

  // Đường dẫn khác
  guiTrang(res, 404, {
    icon: "🔍",
    tieuDe: "404 - Không tìm thấy trang",
    noiDung: "Đường dẫn này không tồn tại",
    loai: "loi",
  });
});

server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});