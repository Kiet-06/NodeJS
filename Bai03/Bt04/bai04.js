
const { MongoClient } = require("mongodb");

// Chuỗi kết nối MongoDB
const uri = "mongodb://127.0.0.1:27017";

// Tạo MongoClient
const client = new MongoClient(uri);

async function main() {
    try {
        // Kết nối MongoDB
        await client.connect();
        console.log("Ket noi MongoDB thanh cong!");

        // Chọn database và collection
        const db = client.db("qlsinhvien");
        const collection = db.collection("students");

        // Danh sách sinh viên
        const students = [
            {
                masv: "SV001",
                hoten: "Nguyen Van An",
                tuoi: 20,
                diem: 8.5
            },
            {
                masv: "SV002",
                hoten: "Tran Thi Binh",
                tuoi: 21,
                diem: 9.0
            },
            {
                masv: "SV003",
                hoten: "Le Van Cuong",
                tuoi: 19,
                diem: 7.5
            }
        ];

        // Thêm nhiều sinh viên
        const result = await collection.insertMany(students);

        console.log("Them sinh vien thanh cong!");
        console.log("So sinh vien da them:", result.insertedCount);

        // Hiển thị danh sách sinh viên
        console.log("\nDANH SACH SINH VIEN:");

        const data = await collection.find({}).toArray();

        console.table(data);

    } catch (error) {
        console.error("Loi:", error);
    } finally {
        // Đóng kết nối
        await client.close();
        console.log("\nDa dong ket noi MongoDB!");
    }
}

main();
