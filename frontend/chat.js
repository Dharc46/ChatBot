let chatHistory = [];  // Mảng lưu trữ các cuộc trò chuyện

// Hàm gửi tin nhắn
function sendMessage(event) {
  // Kiểm tra nếu người dùng nhấn Enter hoặc click vào icon send
  if ((event && event.key === 'Enter') || !event) {
    const inputElement = document.getElementById("chat-input");
    const message = inputElement.value.trim();

    // Kiểm tra xem có một cuộc trò chuyện nào đang được mở
    if (currentChatIndex !== undefined && currentChatIndex >= 0 && currentChatIndex < chatHistory.length) {
      // Nếu có tin nhắn, gửi tin nhắn và xóa input
      if (message) {
        const chatContent = document.getElementById("chat-content");
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = message;
        chatContent.appendChild(userMessage);

        // Cuộn xuống tin nhắn mới
        chatContent.scrollTop = chatContent.scrollHeight;

        // Lưu tin nhắn vào cuộc trò chuyện hiện tại
        chatHistory[currentChatIndex].messages.push(message);

        // Cập nhật lại tiêu đề trong danh sách lịch sử chat
        const chatHistoryList = document.getElementById("chat-history-list");
        const chatItem = chatHistoryList.children[currentChatIndex];
        chatItem.textContent = getFirstMessagePreview(chatHistory[currentChatIndex]);

        // Xóa nội dung trường nhập liệu
        inputElement.value = "";
      }
    } else {
      console.error('No valid chat session found to send message!');
    }
  }
}

// Hàm thoát khỏi chat
function logout() {
  window.location.href = 'index.html';  // Chuyển về trang đăng nhập
}

// Hàm bắt đầu một cuộc chat mới
let currentChatIndex = undefined;  // Biến lưu trữ chỉ số cuộc trò chuyện hiện tại
// Hàm bắt đầu một cuộc chat mới
function newChat() {
    // Tạo một cuộc trò chuyện mới, không làm mất tin nhắn cũ
    const newChat = {
      messages: [],  // Mảng lưu trữ tin nhắn
    };
  
    // Thêm chat mới vào lịch sử
    chatHistory.push(newChat);
  
    // Cập nhật danh sách lịch sử chat
    const chatHistoryList = document.getElementById("chat-history-list");
    const newChatItem = document.createElement("li");
  
    // Hiển thị đoạn đầu tiên của tin nhắn đầu tiên trong cuộc trò chuyện
    newChatItem.textContent = getFirstMessagePreview(newChat);
  
    // Khi nhấn vào dòng chat cũ, load lại cuộc trò chuyện đó
    newChatItem.onclick = function () {
      loadChat(chatHistory.length - 1); // Mở cuộc trò chuyện mới
    };
  
    // Thêm phần tử li vào danh sách lịch sử
    chatHistoryList.appendChild(newChatItem);
  
    // Mở cuộc trò chuyện mới
    loadChat(chatHistory.length - 1);
  
    // Hiển thị lại bàn tay chào khi bắt đầu cuộc trò chuyện mới
    handWave.style.display = "block";
  }
  

// Lấy preview của tin nhắn đầu tiên trong cuộc trò chuyện
function getFirstMessagePreview(chat) {
  // Nếu có tin nhắn, trả về preview của tin nhắn đầu tiên (đoạn đầu)
  if (chat.messages.length > 0) {
    return chat.messages[0].slice(0, 20) + "...";  // Cắt chuỗi tin nhắn đầu tiên
  }
  return "New Chat";  // Nếu chưa có tin nhắn
}

// Hàm tải cuộc trò chuyện theo chỉ số
function loadChat(chatIndex) {
  // Cập nhật chỉ số cuộc trò chuyện hiện tại
  currentChatIndex = chatIndex;

  // Lấy cuộc trò chuyện từ mảng chatHistory
  const chat = chatHistory[chatIndex];

  // Cập nhật giao diện hiển thị tin nhắn
  const chatContent = document.getElementById("chat-content");
  chatContent.innerHTML = "";  // Xóa nội dung chat cũ

  // Hiển thị tất cả tin nhắn trong chat
  chat.messages.forEach(function (message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("user-message");
    messageDiv.textContent = message;
    chatContent.appendChild(messageDiv);
  });

  // Cuộn xuống cuối để thấy tin nhắn mới
  chatContent.scrollTop = chatContent.scrollHeight;

  // Gán sự kiện gửi tin nhắn cho cuộc trò chuyện này
  const inputElement = document.getElementById("chat-input");
  inputElement.value = "";  // Xóa ô nhập liệu
  inputElement.onkeydown = function (event) {
    if (event.key === "Enter") {
      sendMessage();  // Gửi tin nhắn khi nhấn Enter
    }
  };
}

// Tự động tạo chat session mới sau khi trang tải
window.addEventListener("load", function () {
  setTimeout(function () {
    newChat();  // Tạo một cuộc trò chuyện mới
    document.getElementById("loading-container").style.display = "none"; // Ẩn loading
    document.getElementById("chat-container").style.display = "flex"; // Hiển thị chat
  }, 1000); // Đợi 1 giây (1000ms) trước khi ẩn loading và hiển thị chat
});

// Lấy phần tử biểu tượng bàn tay
const handWave = document.getElementById("hand-wave");

// Lấy trường nhập tin nhắn và nút gửi
const chatInput = document.getElementById("chat-input");
const sendButton = document.querySelector(".send-button");

// Lắng nghe sự kiện khi người dùng nhấn phím Enter
chatInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    // Ẩn bàn tay khi người dùng nhấn Enter
    handWave.style.display = "none";
    
    // Thực hiện gửi tin nhắn hoặc các thao tác khác
    sendMessage();
  }
});

// Lắng nghe sự kiện khi người dùng ấn nút gửi
sendButton.addEventListener("click", function() {
  // Ẩn bàn tay khi người dùng nhấn nút gửi
  handWave.style.display = "none";
  
  // Thực hiện gửi tin nhắn hoặc các thao tác khác
  sendMessage();
});






