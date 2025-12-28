import { auth } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const fullNameEl = document.getElementById("fullName");
const emailEl = document.getElementById("email");
const uidEl = document.getElementById("uid");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // ❌ Chưa đăng nhập → quay về login
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = "login.html";
    return;
  }

  // ✅ Đã đăng nhập → hiển thị hồ sơ
  fullNameEl.textContent = user.displayName || "Chưa cập nhật";
  emailEl.textContent = user.email;
  uidEl.textContent = user.uid;
});
