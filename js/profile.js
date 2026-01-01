import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

const fullNameEl = document.getElementById("fullName");
const emailEl = document.getElementById("email");
const uidEl = document.getElementById("uid");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = "login.html";
    return;
  }

  emailEl.textContent = user.email;
  uidEl.textContent = user.uid;

  try {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      fullNameEl.textContent = snap.data().fullName || "Chưa cập nhật";
    } else {
      fullNameEl.textContent = "Chưa có hồ sơ";
    }
  } catch (err) {
    console.error("Lỗi Firestore:", err);
    fullNameEl.textContent = "Lỗi tải dữ liệu";
  }
});
