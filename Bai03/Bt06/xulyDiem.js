// xulyDiem.js - Module xử lý điểm học tập

// Kiểm tra điểm hợp lệ (0 -> 10)
const laDiemHopLe = (diem) =>
  typeof diem === "number" && diem >= 0 && diem <= 10;

// Tính điểm trung bình 3 môn, làm tròn 2 chữ số
function tinhDiemTB(toan, van, anh) {
  if (![toan, van, anh].every(laDiemHopLe)) {
    throw new Error("Điểm phải là số trong khoảng 0 đến 10");
  }
  return Math.round(((toan + van + anh) / 3) * 100) / 100;
}

// Xếp loại theo điểm trung bình
function xepLoai(diemTB) {
  if (diemTB >= 8) return "Giỏi";
  if (diemTB >= 6.5) return "Khá";
  if (diemTB >= 5) return "Trung bình";
  return "Yếu";
}

module.exports = { tinhDiemTB, xepLoai };