// Import funkcí z Firebase SDK pomocí absolutních URL
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyCDAfNzpwtf4VNx2kEH6BeH5dN2FIuXIOo",
  authDomain: "vanocni-darky2.firebaseapp.com",
  databaseURL: "https://vanocni-darky2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vanocni-darky2",
  storageBucket: "vanocni-darky2.firebasestorage.app",
  messagingSenderId: "857067200819",
  appId: "1:857067200819:web:300337dc270c9010259e46"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase inicializováno."); // Pro kontrolu, zda je Firebase připojen

// Funkce pro načtení seznamu dárků z Firebase a aktualizaci stránky
function loadGifts() {
  const giftListRef = ref(db, "gifts"); // Odkaz na větev "gifts" v databázi
  console.log("Načítám seznam dárků...");

  onValue(giftListRef, (snapshot) => {
    const gifts = snapshot.val(); // Načtení dat z Firebase
    if (!gifts) {
      console.error("Žádná data v databázi.");
      return;
    }

    console.log("Načtena data:", gifts); // Pro kontrolu načtených dat
    for (const id in gifts) {
      const gift = gifts[id];
      const giftElement = document.querySelector(`.gift[data-id="${id}"]`);

      if (giftElement) {
        const button = giftElement.querySelector("button");

        // Aktualizace stavu rezervace na základě dat z Firebase
        if (gift.reserved) {
          giftElement.classList.add("reserved");
          button.textContent = "Zrušit rezervaci";
        } else {
          giftElement.classList.remove("reserved");
          button.textContent = "Rezervovat";
        }

        // Připojení funkce na kliknutí
        button.onclick = () => reserveGift(id);
      } else {
        console.warn(`Dárek s ID ${id} nebyl nalezen v HTML.`);
      }
    }
  });
}

// Funkce pro změnu stavu rezervace v Firebase
function reserveGift(id) {
  console.log(`Rezervuji dárek s ID: ${id}`);
  const giftRef = ref(db, `gifts/${id}`); // Odkaz na konkrétní dárek

  onValue(giftRef, (snapshot) => {
    const gift = snapshot.val();
    if (!gift) {
      console.error(`Dárek s ID ${id} nebyl nalezen v databázi.`);
      return;
    }

    const newReservedState = !gift.reserved; // Přepnutí stavu rezervace
    console.log(`Nový stav rezervace pro ID ${id}: ${newReservedState}`);

    // Aktualizace stavu v databázi
    update(giftRef, { reserved: newReservedState })
      .then(() => {
        console.log(`Dárek s ID ${id} aktualizován.`);
      })
      .catch((error) => {
        console.error("Chyba při aktualizaci:", error);
      });
  }, { onlyOnce: true }); // Spustí se jen jednou pro aktuální stav
}

// Spuštění načítání dat
loadGifts();

// Udělejte funkci `reserveGift` globálně dostupnou
window.reserveGift = reserveGift;