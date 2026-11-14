class SinhVien {
  constructor(ma, hoTen, tuoi, diem) {
    this.ma = ma;
    this.hoTen = hoTen;
    this.tuoi = tuoi;
    this.diem = diem;
  }

  hienThi() {
    return `Mã: ${this.ma} | Họ tên: ${this.hoTen} | Tuổi: ${this.tuoi} | Điểm: ${this.diem}`;
  }
}

const danhSach = [
  new SinhVien("SV01", "Nguyễn Trần Nhật Tiến", 20, 8.5),
  new SinhVien("SV02", "Nguyễn Thành Danh", 21, 4.0),
  new SinhVien("SV03", "Lê Ngọc Khôi", 19, 6.5),
  new SinhVien("SV04", "Phạm Ngọc Hiếu", 22, 3.5),
  new SinhVien("SV05", "Nguyễn Thành Long", 20, 5.0),
];

const locDat = (ds) => ds.filter((sv) => sv.diem >= 5);

const ketQua = locDat(danhSach);

console.log("===== DANH SÁCH SINH VIÊN ĐIỂM TỪ 5 TRỞ LÊN =====");
ketQua.forEach((sv) => console.log(sv.hienThi()));
console.log(`Tổng cộng: ${ketQua.length}/${danhSach.length} sinh viên`);