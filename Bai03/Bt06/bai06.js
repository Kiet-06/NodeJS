// bai06.js - Chương trình chính
const { tinhDiemTB, xepLoai } = require("./xulyDiem");

const dsSinhVien = [
  { hoTen: "Nguyễn Anh Kiệt", toan: 8.5, van: 7.5, anh: 9 },
  { hoTen: "Trần Minh Thư", toan: 6, van: 7, anh: 6.5 },
  { hoTen: "Lê Quốc Bảo", toan: 4, van: 5.5, anh: 4.5 },
];

console.log("===== KẾT QUẢ HỌC TẬP =====");

const ketQua = dsSinhVien.map((sv) => {
  const dtb = tinhDiemTB(sv.toan, sv.van, sv.anh);
  return { "Họ tên": sv.hoTen, "Điểm TB": dtb, "Xếp loại": xepLoai(dtb) };
});

// In từng dòng
ketQua.forEach((kq, i) => {
  console.log(
    `${i + 1}. ${kq["Họ tên"]} | ĐTB: ${kq["Điểm TB"]} | Xếp loại: ${kq["Xếp loại"]}`
  );
});

// In thêm dạng bảng
console.table(ketQua);