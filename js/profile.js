import { auth } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

// ===== ELEMENTS =====
const fullNameEl = document.getElementById("fullName");
const emailEl = document.getElementById("email");
const uidEl = document.getElementById("uid");
const backBtn = document.getElementById("backBtn");

// ===== QUAY LẠI TRANG TRƯỚC =====
backBtn?.addEventListener("click", () => {
  const prev = localStorage.getItem("prevPage");

  if (prev) {
    localStorage.removeItem("prevPage");
    window.location.href = prev;
  } else {
    // fallback: nếu truy cập trực tiếp profile
    window.location.href = "index.html";
  }
});

// ===== LOAD PROFILE =====
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

    if (snap.exists() && snap.data().fullName) {
      fullNameEl.textContent = snap.data().fullName;
    } else {
      fullNameEl.textContent = user.displayName || "Chưa cập nhật";
    }

  } catch (err) {
    console.error(err);
    fullNameEl.textContent = "Lỗi tải dữ liệu";
  }
});
