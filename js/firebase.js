import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7JAgI_eAdSWoGYEXySQYRyqPS4M5DWTU",
  authDomain: "htstudy-3c8ae.firebaseapp.com",
  projectId: "htstudy-3c8ae",
  appId: "1:505638767150:web:07e67c52d3bb8fb7e02dbf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
