// bai10.js - Liên kết hai collection bằng aggregate() và $lookup
const { MongoClient } = require("mongodb");

const URI = "mongodb://127.0.0.1:27017";
const TEN_DB = "qlsinhvien";

const dsKhoa = [
  { makhoa: "CNTT", tenkhoa: "Công nghệ thông tin" },
  { makhoa: "KT", tenkhoa: "Kinh tế" },
  { makhoa: "NN", tenkhoa: "Ngoại ngữ" },
];

const dsSinhVien = [
  { masv: "SV001", hoten: "Nguyễn Anh Kiệt", makhoa: "CNTT" },
  { masv: "SV002", hoten: "Trần Minh Thư", makhoa: "KT" },
  { masv: "SV003", hoten: "Lê Quốc Bảo", makhoa: "CNTT" },
  { masv: "SV004", hoten: "Phạm Thu Hà", makhoa: "NN" },
  { masv: "SV005", hoten: "Võ Hoàng Nam", makhoa: "KT" },
];

async function main() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("Đã kết nối MongoDB");

    const db = client.db(TEN_DB);
    const departments = db.collection("departments");
    const studentsJoin = db.collection("students_join");

    // Làm sạch để chạy lại nhiều lần vẫn cho kết quả giống nhau
    await departments.deleteMany({});
    await studentsJoin.deleteMany({});

    // Bước 1: Thêm dữ liệu vào hai collection
    const kqKhoa = await departments.insertMany(dsKhoa);
    console.log(`[Bước 1] Đã thêm ${kqKhoa.insertedCount} khoa vào collection departments`);

    const kqSv = await studentsJoin.insertMany(dsSinhVien);
    console.log(`[Bước 2] Đã thêm ${kqSv.insertedCount} sinh viên vào collection students_join`);

    // Bước 3: aggregate() + $lookup để lấy tên khoa theo makhoa
    const ketQua = await studentsJoin
      .aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "makhoa",
            foreignField: "makhoa",
            as: "khoa",
          },
        },
        { $unwind: "$khoa" },
        {
          $project: {
            _id: 0,
            masv: 1,
            hoten: 1,
            makhoa: 1,
            tenkhoa: "$khoa.tenkhoa",
          },
        },
        { $sort: { masv: 1 } },
      ])
      .toArray();

    console.log("\n[Bước 3] Danh sách sinh viên kèm tên khoa:");
    ketQua.forEach((sv, i) => {
      console.log(`${i + 1}. ${sv.masv} | ${sv.hoten} | Khoa: ${sv.tenkhoa} (${sv.makhoa})`);
    });

    console.table(ketQua);
  } catch (err) {
    console.error("Lỗi:", err.message);
  } finally {
    await client.close();
    console.log("\nĐã đóng kết nối");
  }
}

main();