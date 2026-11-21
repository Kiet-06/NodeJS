// bai08.js - Quản lý tập tin với module fs
const fs = require("fs");
const path = require("path");

const thuMuc = path.join(__dirname, "data");
const fileGoc = path.join(thuMuc, "ghichu.txt");
const fileMoi = path.join(thuMuc, "ghichu_moi.txt");
const fileTam = path.join(thuMuc, "tam.txt");

// Hàm in thông báo kết quả từng thao tác
const baoCao = (buoc, noiDung) => console.log(`[Bước ${buoc}] ${noiDung}`);

// Dọn dữ liệu cũ để chạy lại nhiều lần không bị lỗi
[fileGoc, fileMoi, fileTam].forEach((f) => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

console.log("===== QUẢN LÝ TẬP TIN VỚI FILE SYSTEM =====");

// Bước 1: Tạo thư mục data
fs.mkdir(thuMuc, { recursive: true }, (err) => {
  if (err) return console.error("Lỗi tạo thư mục:", err.message);
  baoCao(1, "Đã tạo thư mục data");

  // Bước 2: Tạo ghichu.txt và ghi 3 dòng
  const noiDung = [
    "Dòng 1: Hôm nay mình học module fs trong Node.js",
    "Dòng 2: fs.writeFile dùng để tạo và ghi tập tin",
    "Dòng 3: fs.rename dùng để đổi tên tập tin",
  ].join("\n");

  fs.writeFile(fileGoc, noiDung, "utf8", (err) => {
    if (err) return console.error("Lỗi ghi tập tin:", err.message);
    baoCao(2, "Đã tạo ghichu.txt và ghi 3 dòng nội dung");

    // Bước 3: Đổi tên ghichu.txt thành ghichu_moi.txt
    fs.rename(fileGoc, fileMoi, (err) => {
      if (err) return console.error("Lỗi đổi tên:", err.message);
      baoCao(3, "Đã đổi tên ghichu.txt thành ghichu_moi.txt");

      // Bước 4: Đọc và hiển thị nội dung sau khi đổi tên
      fs.readFile(fileMoi, "utf8", (err, data) => {
        if (err) return console.error("Lỗi đọc tập tin:", err.message);
        baoCao(4, "Nội dung ghichu_moi.txt:");
        console.log("--------------------------------------");
        console.log(data);
        console.log("--------------------------------------");

        // Bước 5: Tạo tam.txt
        fs.writeFile(fileTam, "Tập tin tạm, sắp bị xóa", "utf8", (err) => {
          if (err) return console.error("Lỗi tạo tam.txt:", err.message);
          baoCao(5, "Đã tạo tập tin tam.txt");

          // Bước 6: Xóa tam.txt bằng fs.unlink()
          fs.unlink(fileTam, (err) => {
            if (err) return console.error("Lỗi xóa tam.txt:", err.message);
            baoCao(6, "Đã xóa tập tin tam.txt");

            // Kiểm tra kết quả cuối cùng
            console.log("\nDanh sách trong thư mục data:", fs.readdirSync(thuMuc));
            console.log("===== HOÀN THÀNH =====");
          });
        });
      });
    });
  });
});