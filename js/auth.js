import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =======================
   ĐĂNG NHẬP
======================= */
window.login = async function () {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu");
    return;
  }

  try {
    // 🔐 ĐĂNG NHẬP
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // 👤 CẬP NHẬT HỌ TÊN
    if (!user.displayName && fullName) {
  await updateProfile(user, {
    displayName: fullName
  });
}

    // 🔁 QUAY LẠI TRANG TRƯỚC
    const redirect = localStorage.getItem("redirectAfterLogin");

    if (redirect) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      window.location.href = "index.html";
    }

  } catch (error) {
    alert("Sai email hoặc mật khẩu");
    console.error(error);
  }
};

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
