// Import thư viện
const express = require('express');
const cors = require('cors');

// Tạo ứng dụng Express
const app = express();

// Sử dụng CORS để cho phép yêu cầu từ các nguồn khác nhau
app.use(cors()); // Hoặc dùng cors({ origin: 'http://localhost:8080' }) nếu frontend chạy trên port khác

// Middleware để parse body của request dưới dạng JSON
app.use(express.json());

// Dữ liệu giả lập người dùng (thông thường bạn sẽ lưu trữ trong cơ sở dữ liệu)
const users = [];

// Route đăng ký
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra xem tài khoản và mật khẩu có được cung cấp hay không
    if (!username || !password) {
        return res.status(400).json({ message: 'Tài khoản và mật khẩu không được để trống.' });
    }

    // Kiểm tra xem tài khoản đã tồn tại hay chưa
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Tài khoản đã tồn tại.' });
    }

    // Thêm người dùng mới vào mảng (thông thường bạn sẽ lưu vào cơ sở dữ liệu)
    users.push({ username, password });

    // Gửi phản hồi thành công
    res.status(200).json({ message: 'Đăng ký thành công!' });
});

// Route đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra tài khoản có tồn tại không
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Đăng nhập thành công
        return res.status(200).json({ message: 'Đăng nhập thành công!' });
    }

    // Đăng nhập thất bại
    res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng.' });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
