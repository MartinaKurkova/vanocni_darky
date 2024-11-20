// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxhn-pQkx2GmEKNzarR9O0u7mexiz4MlA",
  authDomain: "vanoce-gifts.firebaseapp.com",
  projectId: "vanoce-gifts",
  storageBucket: "vanoce-gifts.firebasestorage.app",
  messagingSenderId: "236642032184",
  appId: "1:236642032184:web:2c7e9329c7add2d0a6e4cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);





function reserveGift(id) {
  // Najdeme prvek podle data-id
  const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
  const button = giftElement.querySelector('button');

  // Stav rezervace podle třídy v DOM
  const isReserved = giftElement.classList.contains('reserved');

  // Aktualizace Firestore
  db.collection("gifts").doc(id).update({
    reserved: !isReserved // Přepnutí stavu rezervace
  })
  .then(() => {
    // Po úspěšné aktualizaci změňme vzhled na stránce
    if (isReserved) {
      giftElement.classList.remove('reserved'); // Odebereme třídu
      button.textContent = 'Rezervovat'; // Text tlačítka zpět
    } else {
      giftElement.classList.add('reserved'); // Přidáme třídu
      button.textContent = 'Zrušit rezervaci'; // Text tlačítka změníme
    }
  })
  .catch((error) => {
    console.error("Chyba při aktualizaci rezervace:", error);
    alert("Něco se pokazilo, zkuste to prosím znovu.");
  });
}

