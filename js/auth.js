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
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user; // ← 🔥 BẮT BUỘC PHẢI CÓ

    if (!user.displayName && fullName) {
      await updateProfile(user, {
        displayName: fullName
      });
    }

    const redirect = localStorage.getItem("redirectAfterLogin");
    window.location.href = redirect || "index.html";

  } catch (error) {
    console.error(error);
    alert(error.code);
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
