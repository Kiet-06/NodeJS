// bai03.js - Thao tác tập tin bằng module fs
const fs = require("fs").promises;

const tenFile = "thongtin.txt";

const sinhVien = {
  hoTen: "Nguyễn Anh Kiệt",
  maSV: "CDCNTT18B14",
  lop: "CDCNTT18B",
};

async function main() {
  try {
    // 1. Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
    const noiDungBanDau = `Họ tên: ${sinhVien.hoTen}\nMã sinh viên: ${sinhVien.maSV}`;
    await fs.writeFile(tenFile, noiDungBanDau, "utf8");
    console.log("Đã tạo tập tin", tenFile);

    // 2. Đọc và hiển thị nội dung lên Terminal
    console.log("\n--- Nội dung ban đầu ---");
    console.log(await fs.readFile(tenFile, "utf8"));

    // 3. Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
    await fs.appendFile(tenFile, `\nLớp: ${sinhVien.lop}`, "utf8");
    console.log("\nĐã ghi nối thêm tên lớp");

    // 4. Đọc lại tập tin để chứng minh nội dung đã cập nhật
    console.log("\n--- Nội dung sau khi cập nhật ---");
    console.log(await fs.readFile(tenFile, "utf8"));
  } catch (err) {
    console.error("Lỗi thao tác tập tin:", err);
  }
}

main();