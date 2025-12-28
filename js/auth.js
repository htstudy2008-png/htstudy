import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =======================
   ĐĂNG NHẬP
======================= */
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // 🔑 LẤY TRANG CẦN QUAY LẠI
      const redirect = localStorage.getItem("redirectAfterLogin");

      if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirect;
      } else {
        // 👉 TRANG MẶC ĐỊNH
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      alert("Sai email hoặc mật khẩu");
      console.error(error);
    });
};

/* =======================
   ĐĂNG XUẤT
======================= */
export function logout() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
}

/* =======================
   BẢO VỆ TRANG (OPTIONAL)
======================= */
export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // 👉 LƯU TRANG ĐANG ĐỨNG
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "login.html";
    }
  });
}
