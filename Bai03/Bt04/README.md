BÀI 04 - THÊM VÀ HIỂN THỊ DỮ LIỆU MONGODB
1. Mục tiêu
Kết nối MongoDB bằng Node.js.
Sử dụng database qlsinhvien.
Sử dụng collection students.
Thêm dữ liệu bằng insertMany().
Hiển thị dữ liệu bằng find().
Đóng kết nối MongoDB sau khi hoàn thành.
2. Công nghệ sử dụng
Node.js
MongoDB
MongoDB Node.js Driver
3. Cài đặt thư viện
bash
npm init -y
npm install mongodb

4. Cấu trúc thư mục
text
Bt04/
├── bai04.js
├── README.md
├── package.json
└── package-lock.json

5. Các bước thực hiện

Bước 1: Khởi động MongoDB trên máy.

Bước 2: Mở Terminal tại thư mục Bt04.

Bước 3: Chạy chương trình:

bash
node bai04.js


Bước 4: Kiểm tra kết quả hiển thị trên Terminal.

Bước 5: Kiểm tra dữ liệu trong MongoDB:

javascript
use qlsinhvien
db.students.find().pretty()

6. Hình ảnh minh họa
Hình 1: Cài đặt thư viện MongoDB

images/code.png

Chèn ảnh Terminal sau khi chạy lệnh npm install mongodb.

Hình 2: Chạy chương trình

images/terminal.png

Chèn ảnh Terminal sau khi chạy node bai04.js.

Hình 3: Kết quả dữ liệu MongoDB
images/mongo.png

Chèn ảnh kết quả truy vấn db.students.find().pretty().

7. Kết luận

Đã hoàn thành chương trình kết nối MongoDB bằng Node.js, thêm 3 sinh viên bằng insertMany(), hiển thị danh sách bằng find() và đóng kết nối sau khi thực hiện.