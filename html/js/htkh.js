let currentEmailOrPhone = null; // Lưu Email/SĐT thực tế dùng đăng nhập
let displayRandomName = null;   // Lưu Tên ngẫu nhiên để hiển thị
let currentOtpCode = null; 


function openModal(title, htmlContent) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerHTML = htmlContent;
    document.getElementById("infoModal").style.display = "flex";
}
function closeModal(modalId) { document.getElementById(modalId).style.display = "none"; }
function hideError(errorId) { document.getElementById(errorId).style.display = "none"; }

function validateInput(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^0\d{9}$/; 
    return emailRegex.test(input) || phoneRegex.test(input);
}


function generateRandomName() {
    const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng"];
    const middleNames = ["Thị", "Văn", "Minh", "Hoàng", "Ngọc", "Thanh", "Đức", "Hữu"];
    const lastNames = ["Anh", "Tuấn", "Hùng", "Linh", "Trang", "Khánh", "Phương", "Khang", "Vy", "Bảo"];
    
    let f = firstNames[Math.floor(Math.random() * firstNames.length)];
    let m = middleNames[Math.floor(Math.random() * middleNames.length)];
    let l = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${f} ${m} ${l}`;
}


function showLoginModal() {
    closeModal('forgotPwModal'); closeModal('registerModal');
    document.getElementById("loginModal").style.display = "flex";
}

function handleLogin(event) {
    event.preventDefault(); 
    let userInput = document.getElementById("username").value.trim();
    if (!validateInput(userInput)) {
        document.getElementById("loginError").style.display = "block"; return; 
    }
    
  
    currentEmailOrPhone = userInput; 
    displayRandomName = generateRandomName(); 
    
    closeModal('loginModal');
    openModal("Hệ thống", `<div style="text-align:center; padding: 10px 0;"><i class="fa fa-check-circle" style="font-size: 60px; color: #2a704a; margin-bottom: 15px;"></i><h3 style="color: #333; margin-top:0;">Đăng nhập thành công!</h3><p style="color: #555;">Kính chào Quý khách <strong>${displayRandomName}</strong> đã quay trở lại với hệ thống MPO.</p></div>`);
    
    
    document.getElementById("userMenu").innerHTML = `<a href="#" onclick="showAccountInfo()"><i class="fa fa-user-circle"></i> ${displayRandomName}</a>`;
}

function showRegisterModal() {
    closeModal('loginModal'); document.getElementById('registerModal').style.display = 'flex';
}

function handleRegister(event) {
    event.preventDefault();
    let user = document.getElementById("regUser").value.trim();
    let pass = document.getElementById("regPass").value;
    let passConfirm = document.getElementById("regPassConfirm").value;

    if (!validateInput(user)) { document.getElementById("regUserError").style.display = "block"; return; }
    if (pass !== passConfirm) { document.getElementById("regPassError").style.display = "block"; return; }

    closeModal('registerModal');
    openModal("Đăng ký tài khoản", `<div style="text-align:center; padding: 10px 0;"><i class="fa fa-user-check" style="font-size: 60px; color: #2a704a; margin-bottom: 15px;"></i><h3 style="color: #333; margin-top:0;">Đăng ký thành công!</h3><p style="color: #555;">Tài khoản <strong>${user}</strong> đã được tạo. Vui lòng đăng nhập để trải nghiệm dịch vụ.</p><button onclick="closeModal('infoModal'); showLoginModal()" class="btn-login" style="margin-top:15px; width:100%;">Tới trang Đăng nhập</button></div>`);
}


function showForgotPassword() {
    closeModal('loginModal'); document.getElementById('forgotPwModal').style.display = 'flex';
    document.getElementById('fpStep1').style.display = 'block'; 
    document.getElementById('fpStep2').style.display = 'none';
    document.getElementById('fpStep3').style.display = 'none';
    document.getElementById('fpInput').value = ''; hideError('fpError');
}

function backToLogin() { closeModal('forgotPwModal'); showLoginModal(); }
function backToStep1() { document.getElementById('fpStep2').style.display = 'none'; document.getElementById('fpStep1').style.display = 'block'; }

function handleSendCode(event) {
    event.preventDefault();
    let fpInput = document.getElementById("fpInput").value.trim();
    if (!validateInput(fpInput)) { document.getElementById("fpError").style.display = "block"; return; }
    document.getElementById('fpStep1').style.display = 'none'; document.getElementById('fpStep2').style.display = 'block';
    document.getElementById('otpInput').value = ''; hideError('otpError');
    setTimeout(() => {
        currentOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
        document.getElementById('generatedOtp').innerText = currentOtpCode;
        document.getElementById('otpNotification').style.display = 'block';
    }, 3500);
}

function closeOtpNotification() { document.getElementById('otpNotification').style.display = 'none'; document.getElementById('otpInput').focus(); }

function handleVerifyCode(event) {
    event.preventDefault();
    let inputOtp = document.getElementById("otpInput").value.trim();
    if (inputOtp !== currentOtpCode) { document.getElementById("otpError").style.display = "block"; return; }
    
   
    document.getElementById('fpStep2').style.display = 'none';
    document.getElementById('fpStep3').style.display = 'block';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmNewPass').value = '';
    hideError('resetPassError');
}

function handleResetPassword(event) {
    event.preventDefault();
    let newPass = document.getElementById("newPass").value;
    let confirmPass = document.getElementById("confirmNewPass").value;

    if (newPass !== confirmPass) { document.getElementById("resetPassError").style.display = "block"; return; }

    closeModal('forgotPwModal');
    openModal("Đổi mật khẩu thành công", `
        <div style="text-align:center; padding: 10px 0;">
            <i class="fa fa-key" style="font-size: 60px; color: #2a704a; margin-bottom: 15px;"></i>
            <h3 style="color: #333; margin-top:0;">Thành công!</h3>
            <p style="color: #555;">Mật khẩu của bạn đã được thay đổi an toàn. Vui lòng đăng nhập lại bằng mật khẩu mới.</p>
            <button onclick="closeModal('infoModal'); showLoginModal()" class="btn-login" style="margin-top:15px; width:100%;">Tới trang Đăng nhập</button>
        </div>
    `);
}


function showAccountInfo() {
    if (!currentEmailOrPhone) { showLoginModal(); return; }
    const tierList = [{ name: "Đồng (Bronze)", color: "#cd7f32" }, { name: "Bạc (Silver)", color: "#c0c0c0" }, { name: "Vàng (Gold)", color: "gold" }, { name: "Bạch Kim (Platinum)", color: "#e5e4e2" }, { name: "Kim Cương (Diamond)", color: "#b9f2ff" }];
    let randomTier = tierList[Math.floor(Math.random() * tierList.length)];
    let randomPoints = Math.floor(Math.random() * 10000) + 50;
    let isEmail = currentEmailOrPhone.includes('@');
    
    const htmlInfo = `
        <div style="text-align:center; margin-bottom:15px;">
            <i class="fa fa-user-circle" style="font-size: 50px; color: #ccc;"></i>
            <h3 style="margin: 10px 0 0 0; color: #333;">${displayRandomName}</h3>
            <p style="margin: 5px 0 0 0; font-size:13px; color: #777;">Khách hàng thành viên</p>
        </div>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
            <p style="margin-top:0;"><strong>SĐT Đăng nhập:</strong> ${!isEmail ? currentEmailOrPhone : "Chưa cập nhật"}</p>
            <p><strong>Email Đăng nhập:</strong> ${isEmail ? currentEmailOrPhone : "Chưa cập nhật"}</p>
            <p><strong>Hạng:</strong> ${randomTier.name} <i class="fa fa-star" style="color:${randomTier.color}; text-shadow: 0 0 1px #000;"></i></p>
            <p style="margin-bottom:0;"><strong>Điểm tích lũy:</strong> <span style="color:#2a704a; font-weight:bold;">${randomPoints.toLocaleString('vi-VN')} điểm</span></p>
        </div>
        <button style="margin-top:20px; width:100%; padding:12px; background:#dc3545; color:#fff; border:none; border-radius:5px; font-weight:bold; cursor:pointer;" onclick="location.reload()">Đăng xuất</button>
    `;
    openModal("Thông tin tài khoản", htmlInfo);
}

function showPackaging() {
    const htmlInfo = `<div style="text-align: left; color: #444; font-size: 14px;"><p style="margin-top: 0; font-weight: bold; color: #333;">MPO cam kết mang đến trải nghiệm nhận hàng hoàn hảo với Quy chuẩn đóng gói 4 bước Premium:</p><div style="margin-bottom: 12px; padding: 12px; background: #f8f9fa; border-left: 4px solid #2a704a; border-radius: 4px;"><strong style="color: #2a704a;"><i class="fa fa-pump-medical"></i> Bước 1: Khử khuẩn & Kiểm định</strong><br>Sản phẩm được chuyên viên kiểm tra ngoại quan, đối chiếu hạn sử dụng và sát khuẩn bề mặt trước khi đóng gói.</div><div style="margin-bottom: 12px; padding: 12px; background: #f8f9fa; border-left: 4px solid #2a704a; border-radius: 4px;"><strong style="color: #2a704a;"><i class="fa fa-box-open"></i> Bước 2: Lớp bảo vệ chống sốc</strong><br>Bọc kín 3 lớp xốp hơi (bubble wrap) hoặc giấy tổ ong thân thiện môi trường để cố định tuyệt đối sản phẩm.</div><div style="margin-bottom: 12px; padding: 12px; background: #f8f9fa; border-left: 4px solid #2a704a; border-radius: 4px;"><strong style="color: #2a704a;"><i class="fa fa-gift"></i> Bước 3: Hộp tiêu chuẩn & Quà tặng</strong><br>Sử dụng hộp carton 5 lớp siêu cứng có in logo MPO. Lót thêm xốp chèn và đính kèm Thư cảm ơn + Sample trải nghiệm.</div><div style="margin-bottom: 12px; padding: 12px; background: #f8f9fa; border-left: 4px solid #2a704a; border-radius: 4px;"><strong style="color: #2a704a;"><i class="fa fa-video"></i> Bước 4: Ghi hình & Niêm phong</strong><br>Quá trình đóng gói được Camera an ninh ghi hình. Dán băng keo niêm phong bảo mật ngoài vỏ hộp chống bóc trộm.</div><p style="font-style: italic; font-size: 13px; color: #dc3545; text-align: center; margin-bottom: 0;">* Quý khách vui lòng từ chối nhận hàng nếu tem niêm phong có dấu hiệu rách nát.</p></div>`;
    openModal("Quy chuẩn Đóng gói Premium", htmlInfo);
}

function showWarranty() {
    const htmlInfo = `<div style="text-align: left; color: #444; font-size: 14px; max-height: 55vh; overflow-y: auto; padding-right: 5px;"><p style="margin-top: 0;">Chính sách bảo hành điện tử chính hãng áp dụng cho 100% đơn hàng tại hệ thống MPO:</p><h4 style="color: #2a704a; border-bottom: 1px dashed #ccc; padding-bottom: 5px; margin-top: 15px;"><i class="fa fa-leaf"></i> 1. Đối với Dược & Mỹ Phẩm</h4><ul style="padding-left: 20px; margin-bottom: 10px; line-height: 1.6;"><li><strong>Cam kết chất lượng:</strong> Hoàn tiền 200% nếu phát hiện hàng giả, hàng nhái.</li><li><strong>Bảo hành đền bù:</strong> Hỗ trợ khiếu nại với hãng và đền bù sản phẩm mới nếu sản phẩm bị biến chất, đổi màu hoặc có vật thể lạ bên trong trước khi mở seal.</li></ul><h4 style="color: #2a704a; border-bottom: 1px dashed #ccc; padding-bottom: 5px;"><i class="fa fa-plug"></i> 2. Đối với Thiết bị làm đẹp</h4><ul style="padding-left: 20px; margin-bottom: 10px; line-height: 1.6;"><li><strong>Đổi mới 1:1:</strong> Áp dụng trong vòng <strong>30 ngày</strong> đầu tiên nếu thiết bị gặp lỗi phần cứng từ nhà sản xuất (không lên nguồn, liệt phím...).</li><li><strong>Bảo hành sửa chữa:</strong> Miễn phí linh kiện và nhân công từ <strong>12 - 24 tháng</strong> (Tùy theo model sản phẩm).</li></ul><h4 style="color: #dc3545; border-bottom: 1px dashed #ccc; padding-bottom: 5px;"><i class="fa fa-ban"></i> 3. Các trường hợp từ chối bảo hành</h4><ul style="padding-left: 20px; margin-bottom: 15px; line-height: 1.6;"><li>Sản phẩm đã quá hạn sử dụng, cạo sửa mã vạch hoặc mất tem phụ của MPO.</li><li>Thiết bị điện tử hư hỏng do rơi vỡ, vào nước (với máy không chống nước), sạc sai nguồn điện hoặc tự ý tháo lắp.</li></ul><div style="background: #e3f7ea; padding: 12px; border-radius: 5px; text-align: center; font-weight: bold; color: #2a704a;"><i class="fa fa-headset"></i> Trung tâm Bảo hành MPO: 1800 6324 (Miễn phí)</div></div>`;
    openModal("Chính sách Bảo hành Toàn diện", htmlInfo);
}

function showReturnConfirm() { document.getElementById("confirmModal").style.display = "flex"; }

function processReturn() {
    closeModal('confirmModal'); 
    let returnCode = "RET-" + Math.floor(10000 + Math.random() * 90000);
    const successHtml = `<div style="text-align: center; padding: 15px 0;"><i class="fa fa-check-circle" style="font-size: 60px; color: #2a704a; margin-bottom: 15px;"></i><h3 style="color: #333; margin-top:0;">Đã tiếp nhận yêu cầu!</h3><p style="color: #555; line-height: 1.6; font-size: 14px;">Mã yêu cầu đổi trả của bạn là: <br><strong style="color: #2a704a; font-size: 20px; letter-spacing: 1px;">${returnCode}</strong></p><p style="color: #555; font-size: 14px;">Chuyên viên CSKH của MPO sẽ liên hệ với bạn qua số điện thoại đăng ký trong vòng <strong>24 giờ làm việc</strong> để hướng dẫn thủ tục thu hồi hàng tận nơi.</p><button onclick="closeModal('infoModal')" class="btn-login" style="margin-top:15px; width:100%;">Đóng thông báo</button></div>`;
    openModal("Trạng thái Đổi/Trả", successHtml);
}

function performSearch() {
    let query = document.getElementById('searchInput').value.trim();
    if(query !== "") openModal("Kết quả", `<p>Đang tìm kiếm: <strong>"${query}"</strong></p>`);
    else alert('Vui lòng nhập từ khóa!');
}


function openChat() {
    document.getElementById("chatBox").style.display = "flex";
    let body = document.getElementById("chatBody");
    if (body.innerHTML.trim() === "") {
        setTimeout(() => { bot("Kính chào Quý khách!"); }, 500);
        setTimeout(() => { bot("Chào mừng Quý khách đến với Trung tâm CSKH MPO. MPO có thể hỗ trợ thông tin gì cho Quý khách hôm nay ạ?"); }, 1200);
    }
}
function closeChat() { document.getElementById("chatBox").style.display = "none"; }

function bot(text) {
    let body = document.getElementById("chatBody");
    let msg = document.createElement("div"); msg.className = "message bot"; msg.innerText = text;
    body.appendChild(msg); body.scrollTop = body.scrollHeight; 
}

function sendMessage() {
    let input = document.getElementById("userInput"); if (input.value.trim() === "") return;
    let body = document.getElementById("chatBody");
    let msg = document.createElement("div"); msg.className = "message user"; msg.innerText = input.value.trim();
    body.appendChild(msg); input.value = ""; body.scrollTop = body.scrollHeight;
    
   
    setTimeout(() => { bot("MPO đã ghi nhận thông tin của Quý khách. Xin vui lòng đợi trong giây lát, chuyên viên tư vấn sẽ phản hồi ngay ạ."); }, 1000);
}
function handleKeyPress(e) { if (e.key === 'Enter') sendMessage(); }