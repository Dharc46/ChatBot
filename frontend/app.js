// Hàm đăng nhập (Giả sử bạn sử dụng API đăng nhập ở backend)
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Gửi yêu cầu đăng nhập tới server
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Đăng nhập thành công!') {
          // Chuyển sang trang chatbot sau khi đăng nhập thành công
          window.location.href = 'chat.html'; // Điều hướng tới trang chatbot
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Lỗi:', error));
  }
  
  // Hàm đăng ký (Giả sử bạn sử dụng API đăng ký ở backend)
  function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
  
    // Gửi yêu cầu đăng ký tới server
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.message === 'Đăng ký thành công!') {
          // Sau khi đăng ký thành công, chuyển tới trang đăng nhập
          showLogin();
        }
      })
      .catch(error => console.error('Lỗi:', error));
  }
  
  // Hàm chuyển sang trang đăng ký
  function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
  }
  
  // Hàm chuyển về trang đăng nhập
  function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
  }

  
  