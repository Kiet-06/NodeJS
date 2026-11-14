
const { MongoClient } = require("mongodb");

// Chuỗi kết nối MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function main() {
    try {
        // 1. Kết nối MongoDB
        await client.connect();
        console.log("Ket noi MongoDB thanh cong!");

        // 2. Chọn database và collection
        const db = client.db("qlsinhvien");
        const collection = db.collection("students");

        // 3. Tìm sinh viên có điểm >= 7
        console.log("\nDANH SACH SINH VIEN CO DIEM >= 7:");

        const students = await collection
            .find({ diem: { $gte: 7 } })
            .sort({ diem: -1 })
            .toArray();

        console.table(students);

        // 4. Cập nhật điểm sinh viên theo mã sinh viên
        const masv = "SV001";
        const newScore = 9.5;

        const updateResult = await collection.updateOne(
            { masv: masv },
            { $set: { diem: newScore } }
        );

        if (updateResult.matchedCount > 0) {
            console.log("\nCap nhat diem thanh cong!");
            console.log("Ma sinh vien:", masv);
            console.log("Diem moi:", newScore);
        } else {
            console.log("\nKhong tim thay sinh vien:", masv);
        }

        // 5. Hiển thị thông tin sau cập nhật
        console.log("\nTHONG TIN SINH VIEN SAU KHI CAP NHAT:");

        const updatedStudent = await collection.findOne({
            masv: masv
        });

        if (updatedStudent) {
            console.table([updatedStudent]);
        }

    } catch (error) {
        console.error("Loi:", error);
    } finally {
        // 6. Đóng kết nối MongoDB
        await client.close();
        console.log("\nDa dong ket noi MongoDB!");
    }
}

main();
