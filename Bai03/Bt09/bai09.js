// bai09.js - Xóa dữ liệu có điều kiện trong MongoDB
const { MongoClient } = require("mongodb");

const URI = "mongodb://127.0.0.1:27017"; // đổi thành chuỗi Atlas nếu dùng Atlas
const TEN_DB = "qlsinhvien";
const TEN_COLLECTION = "students_test";

const dsSinhVien = [
  { masv: "SV001", hoten: "Nguyễn Anh Kiệt", tuoi: 20, diem: 8.5 },
  { masv: "SV002", hoten: "Trần Minh Thư", tuoi: 19, diem: 6.5 },
  { masv: "SV003", hoten: "Lê Quốc Bảo", tuoi: 21, diem: 4.5 },
  { masv: "SV004", hoten: "Phạm Thu Hà", tuoi: 20, diem: 3.0 },
  { masv: "SV005", hoten: "Võ Hoàng Nam", tuoi: 22, diem: 7.0 },
  { masv: "SV006", hoten: "Đặng Ngọc Linh", tuoi: 19, diem: 4.0 },
];

const MA_XOA = "SV002"; // mã sinh viên dùng cho deleteOne()

async function inDanhSach(collection, tieuDe) {
  const ds = await collection.find({}, { projection: { _id: 0 } }).toArray();
  console.log(`\n${tieuDe} (${ds.length} sinh viên):`);
  console.table(ds);
}

async function main() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("Đã kết nối MongoDB");

    const collection = client.db(TEN_DB).collection(TEN_COLLECTION);

    // Làm sạch collection để chạy lại nhiều lần vẫn cho kết quả giống nhau
    await collection.deleteMany({});

    // Bước 1: Thêm sinh viên mẫu
    const kqThem = await collection.insertMany(dsSinhVien);
    console.log(`[Bước 1] Đã thêm ${kqThem.insertedCount} sinh viên vào ${TEN_DB}.${TEN_COLLECTION}`);
    await inDanhSach(collection, "Danh sách ban đầu");

    // Bước 2: deleteOne() theo mã sinh viên
    const kqMot = await collection.deleteOne({ masv: MA_XOA });
    console.log(`\n[Bước 2] deleteOne({ masv: "${MA_XOA}" }) -> đã xóa ${kqMot.deletedCount} bản ghi`);

    // Bước 3: deleteMany() điểm dưới 5
    const kqNhieu = await collection.deleteMany({ diem: { $lt: 5 } });
    console.log(`[Bước 3] deleteMany({ diem: { $lt: 5 } }) -> đã xóa ${kqNhieu.deletedCount} bản ghi`);

    // Tổng kết
    console.log(`\nTổng số bản ghi đã xóa: ${kqMot.deletedCount + kqNhieu.deletedCount}`);
    await inDanhSach(collection, "Danh sách còn lại");
  } catch (err) {
    console.error("Lỗi:", err.message);
  } finally {
    await client.close();
    console.log("\nĐã đóng kết nối");
  }
}

main();