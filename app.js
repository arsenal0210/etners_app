// 🚀 탭 전환 기능
function openTab(tabName) {
    let tabs = document.querySelectorAll(".tab-content");
    let buttons = document.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// 📤 배송 등록 기능 (localStorage 저장)
function submitLogistics() {
    let logisticsList = JSON.parse(localStorage.getItem("logisticsData")) || [];

    let newLogistics = {
        date: document.getElementById("deliveryDate").value,
        time: document.getElementById("deliveryTime").value,
        sender: document.getElementById("sender").value,
        receiver: document.getElementById("receiver").value,
        bus: document.getElementById("busNumber").value,
        bag: document.getElementById("bagCount").value,
        box: document.getElementById("boxCount").value,
        dolly: document.getElementById("dollyCount").value
    };

    logisticsList.push(newLogistics);
    localStorage.setItem("logisticsData", JSON.stringify(logisticsList));

    displayLogistics();
}

// 📜 배송 내역 표시 기능 (localStorage에서 불러오기)
function displayLogistics() {
    let logisticsList = JSON.parse(localStorage.getItem("logisticsData")) || [];
    let logisticsContainer = document.getElementById("logisticsList");
    logisticsContainer.innerHTML = "";

    logisticsList.forEach((log, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("logistics-item");
        itemDiv.innerHTML = `
            <p>📅 ${log.date} ${log.time}</p>
            <p>🚌 버스번호: ${log.bus}</p>
            <p>🚚 ${log.sender} → ${log.receiver}</p>
            <p>🎒 가방: ${log.bag} | 📦 박스: ${log.box} | 🔄 대차: ${log.dolly}</p>
            <button onclick="deleteLogistics(${index})">🗑 삭제</button>
        `;
        logisticsContainer.prepend(itemDiv);
    });
}

// 🗑 특정 배송내역 삭제 기능
function deleteLogistics(index) {
    let logisticsList = JSON.parse(localStorage.getItem("logisticsData")) || [];
    logisticsList.splice(index, 1);
    localStorage.setItem("logisticsData", JSON.stringify(logisticsList));
    displayLogistics();
}

// 💬 채팅 메시지 전송 기능 (localStorage 저장 추가)
function sendMessage(message = null) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    let nickname = document.getElementById("nickname").value;
    let chatInput = document.getElementById("chatMessage");
    let chatMessage = message ? message : chatInput.value.trim();

    if (!chatMessage) {
        alert("메시지를 입력하세요!");
        return;
    }

    let now = new Date();
    let kstTime = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let newMessage = {
        nickname: nickname,
        message: chatMessage,
        time: kstTime
    };

    messages.push(newMessage);
    localStorage.setItem("chatMessages", JSON.stringify(messages));

    displayMessages();
    chatInput.value = "";
}

// 📜 채팅 내역 표시 기능 (localStorage에서 불러오기)
function displayMessages() {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    messages.forEach((msg, index) => {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message");

        messageDiv.innerHTML = `
            <div>
                <b>${msg.nickname}</b>: ${msg.message} 
                <span class="message-time">${msg.time}</span>
            </div>
            <div class="message-actions">
                <button class="pin-button" onclick="pinMessage(this)">📌</button>
                <button class="delete-button" onclick="deleteMessage(${index})">🗑</button>
            </div>
        `;

        chatBox.appendChild(messageDiv);
    });
}

// 🗑 특정 메시지 삭제 기능 (localStorage 반영)
function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.splice(index, 1);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    displayMessages();
}

// 📌 댓글 고정 기능
function pinMessage(button) {
    let pinnedContainer = document.getElementById("pinnedMessageContainer");
    let pinnedMessage = document.getElementById("pinnedMessage");

    pinnedMessage.innerHTML = button.parentElement.parentElement.innerHTML.replace(/<div class="message-actions">.*<\/div>/, "");
    pinnedContainer.style.display = "flex";
}

// ❌ 고정된 댓글 해제
function unpinMessage() {
    document.getElementById("pinnedMessage").innerHTML = "";
    document.getElementById("pinnedMessageContainer").style.display = "none";
}

// 🚀 매크로 버튼 생성 (버튼 크기 키움)
function createMacroButtons() {
    let macroMessages = ["온양출발 🚍", "천안출발 🚍", "기흥출발 🚍", "DSR출발 🚍", "화성출발 🚍", "물건수령 📦"];

    let macroContainer = document.getElementById("macroButtonsLeft");

    macroMessages.forEach(msg => {
        let button = document.createElement("button");
        button.classList.add("macro-button");
        button.textContent = msg;
        button.onclick = () => sendMessage(msg);
        macroContainer.appendChild(button);
    });
}

// 🚀 초기화 실행
document.addEventListener("DOMContentLoaded", () => {
    displayLogistics(); // 배송 내역 불러오기
    displayMessages(); // 채팅 메시지 불러오기
    createMacroButtons(); // 매크로 버튼 생성
});
