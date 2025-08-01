// firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// ⚠️ Lưu ý: storageBucket phải đúng domain (dùng `.appspot.com`)
const firebaseConfig = {
    apiKey: "AIzaSyBGxrdn_MjQ0Gb5FwVVtTRJ-UiS2t8mK34",
    authDomain: "astream-b536b.firebaseapp.com",
    projectId: "astream-b536b",
    storageBucket: "astream-b536b.appspot.com",
    messagingSenderId: "1054985412110",
    appId: "1:1054985412110:web:aeaab65bd0dc9d945ae65f",
    measurementId: "G-M1GPP12YP2"
};

// Khởi tạo app và export storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
