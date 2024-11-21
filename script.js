// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDAfNzpwtf4VNx2kEH6BeH5dN2FIuXIOo",
  authDomain: "vanocni-darky2.firebaseapp.com",
  databaseURL: "https://vanocni-darky2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vanocni-darky2",
  storageBucket: "vanocni-darky2.firebasestorage.app",
  messagingSenderId: "857067200819",
  appId: "1:857067200819:web:300337dc270c9010259e46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function reserveGift(id) {
  // Najdeme prvek podle data-id
  const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
  const button = giftElement.querySelector('button');

  // Pokud má třídu 'reserved', zrušíme rezervaci
  if (giftElement.classList.contains('reserved')) {
      giftElement.classList.remove('reserved'); // Odebereme třídu
      button.textContent = 'Rezervovat'; // Text tlačítka zpět
  } else {
      // Přidáme rezervaci
      giftElement.classList.add('reserved');
      button.textContent = 'Zrušit rezervaci'; // Text tlačítka změníme
  }
}