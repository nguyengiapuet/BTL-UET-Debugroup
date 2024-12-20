## - Bài tập lớn Phát triển ứng dụng Web INT3306 -

#### Đề tài: _Javascript Playground_

![javascript_demo](https://github.com/user-attachments/assets/b8de2b74-228b-44d8-9f69-a658c36463a6)

### Hướng dẫn Deploy (_Trên hệ thống fall2024c8g3_)

#### Tiền xử lý Dự án: Tạo cơ sở dữ liệu

Yêu cầu cần tải file `fall2024c8g3_btlweb.sql` trong _root folder project._

**Cách 1:** Sử dụng commandline

- Bước 1: Truy cập _mysql_ trên hệ thống (yêu cầu mật khẩu truy cập)

```
mysql -u fall2024c8g3 -h $MYSQL_SERVICE_HOST --port $MYSQL_SERVICE_PORT -p
```

- Bước 2: `use fall2024c8g3;`
- Bước 3: `source fall2024c8g3_btlweb.sql;`

**Cách 2:** Sử dụng giao diện ứng dụng

- Bước 1: Truy cập PHPMyAdmin tại [liên kết cơ sở dữ liệu](https://pma.int3306.freeddns.org/)
- Bước 2: Vào trang `Import` sau đó upload file (.zip) `fall2024c8g3_btlweb.zip`

#### Thực hiện Deploy

(File `build` và các url của ứng dụng đã được thiết lập sẵn ở nhánh `deploy`)

- Bước 1: Clone repository từ nhánh **deploy**:
  ```
  git clone -b deploy https://github.com/nguyengiapuet/BTL-UET-Debugroup.git
  ```
- Bước 2: Từ root: `cd BTL-UET-Debugroup/backend`
- Bước 3: `/etc/jupyter/bin/expose 3000`
- Bước 4: `npm start`

  **_Note_**: Kiểm tra kết quả tại _Terminal_,
  nếu server in ra là "_Server is running on port 3000_", quá trình deploy hoàn tất.

- Bước 5: Truy cập ứng dụng tại `http://fall2024c8g3.int3306.freeddns.org/`

### Hướng dẫn Deploy (_Trên localhost_)

- Bước 1: Mở terminal, chạy câu lệnh: `git clone https://github.com/nguyengiapuet/BTL-UET-Debugroup.git`

- Bước 2: Tạo Cơ sở dữ liệu MySQL với tên Database là `fall2024c8g3_btlweb`

- Bước 3: Thực hiện các câu lệnh trong file Cơ sở dữ liệu`fall2024c8g3_btlweb` được lưu ở thư mục gốc sau khi clone.

- Bước 3: Quay trở lại terminal, `cd backend`

- Bước 4: `npm start`

- Bước 5: `cd ..`

- Bước 6: `cd frontend`

- Bước 7: `npm start`

- Bước 8: Truy cập `http://localhost:3000/`

#### Liên hệ: Debug members

- Nguyễn Đăng Giáp - 22022151
- Trịnh Văn Khánh - 21020343
- Phan Đăng Danh - 22022201
- Kiều Minh Tuấn - 21020394
