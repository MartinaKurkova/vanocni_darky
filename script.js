// Inicializace Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDAfNzpwtf4VNx2kEH6BeH5dN2FIuXIOo",
  authDomain: "vanocni-darky2.firebaseapp.com",
  databaseURL: "https://vanocni-darky2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vanocni-darky2",
  storageBucket: "vanocni-darky2.firebasestorage.app",
  messagingSenderId: "857067200819",
  appId: "1:857067200819:web:300337dc270c9010259e46"
};

// Inicializace Firebase aplikace
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Funkce pro načtení seznamu dárků
function loadGifts() {
  const giftListRef = db.ref("gifts");

  giftListRef.on("value", (snapshot) => {
    const gifts = snapshot.val();
    if (!gifts) {
      console.error("Žádná data v databázi.");
      return;
    }

    console.log("Načtena data:", gifts);
    for (const id in gifts) {
      const gift = gifts[id];
      const giftElement = document.querySelector(`.gift[data-id="${id}"]`);

      if (giftElement) {
        const button = giftElement.querySelector("button");

        if (gift.reserved) {
          giftElement.classList.add("reserved");
          button.textContent = "Zrušit rezervaci";
        } else {
          giftElement.classList.remove("reserved");
          button.textContent = "Rezervovat";
        }

        button.onclick = () => reserveGift(id);
      } else {
        console.warn(`Dárek s ID ${id} nebyl nalezen v HTML.`);
      }
    }
  });
}

// Funkce pro rezervaci dárku
function reserveGift(id) {
  console.log(`Rezervuji dárek s ID: ${id}`);
  const giftRef = db.ref(`gifts/${id}`);

  giftRef.once("value", (snapshot) => {
    const gift = snapshot.val();
    if (!gift) {
      console.error(`Dárek s ID ${id} nebyl nalezen v databázi.`);
      return;
    }

    const newReservedState = !gift.reserved;

    giftRef.update({ reserved: newReservedState })
      .then(() => {
        console.log(`Dárek s ID ${id} aktualizován.`);
      })
      .catch((error) => {
        console.error("Chyba při aktualizaci:", error);
      });
  });
}

// Spuštění načítání dat
loadGifts();

// Globální dostupnost funkce
window.reserveGift = reserveGift;
