import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7JAgI_eAdSWoGYEXySQYRyqPS4M5DWTU",
  authDomain: "htstudy-3c8ae.firebaseapp.com",
  projectId: "htstudy-3c8ae",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
