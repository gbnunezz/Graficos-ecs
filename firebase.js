import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyBedvMd0Vo2Yv8_5fA3vQc_nVs0Y4R01A4",
  authDomain: "bancodados-7e614.firebaseapp.com",
  databaseURL: "https://bancodados-7e614-default-rtdb.firebaseio.com",
  projectId: "bancodados-7e614",
  storageBucket: "bancodados-7e614.firebasestorage.app",
  messagingSenderId: "353343280701",
  appId: "1:353343280701:web:42fee872dea2386862fc54",
  measurementId: "G-15PH4K57MZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const refConsumo = ref(db, 'consumo');

export async function pegarDados() {
  try {
    const snapshot = await get(refConsumo);
    const obj = snapshot.val();
    if (!obj) throw new Error("Sem dados");
    return obj;
  } catch (e) {
    console.warn("Usando dados de exemplo:", e.message);
    const exemplo = {};
    const hoje = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      exemplo[`item${i}`] = {
        data: d.toISOString().split('T')[0],
        consumo: (50 + Math.random() * 150).toFixed(2)
      };
    }
    return exemplo;
  }
}
