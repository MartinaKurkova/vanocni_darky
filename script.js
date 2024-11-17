// Načtení rezervovaných dárků při načtení stránky
function checkReservedGifts() {
  const reservedGifts = JSON.parse(localStorage.getItem("reservedGifts") || "[]");

  // Projdeme všechny rezervované dárky a skryjeme je
  reservedGifts.forEach(id => {
    const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
    if (giftElement) {
      giftElement.classList.add("reserved");
      const button = giftElement.querySelector("button");
      button.textContent = "Zrušit rezervaci";
      button.onclick = () => unreserveGift(id);
    }
  });
}

// Rezervace dárku
function reserveGift(id) {
  let reservedGifts = JSON.parse(localStorage.getItem("reservedGifts") || "[]");

  // Pokud není dárek rezervován, přidáme ho do seznamu rezervací
  if (!reservedGifts.includes(id)) {
    reservedGifts.push(id);
    localStorage.setItem("reservedGifts", JSON.stringify(reservedGifts));
    const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
    giftElement.classList.add("reserved");
    const button = giftElement.querySelector("button");
    button.textContent = "Zrušit rezervaci";
    button.onclick = () => unreserveGift(id);
  }
}

// Zrušení rezervace dárku
function unreserveGift(id) {
  let reservedGifts = JSON.parse(localStorage.getItem("reservedGifts") || "[]");

  // Odstraníme dárek ze seznamu rezervací
  reservedGifts = reservedGifts.filter(giftId => giftId !== id);
  localStorage.setItem("reservedGifts", JSON.stringify(reservedGifts));
  const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
  giftElement.classList.remove("reserved");
  const button = giftElement.querySelector("button");
  button.textContent = "Rezervovat";
  button.onclick = () => reserveGift(id);
}

// Kontrola při načtení stránky
window.onload = checkReservedGifts;


function testFirestoreWrite() {
  db.collection("gifts").doc("test-doc").set({ testField: "Hello, Firebase!" })
    .then(() => {
      console.log("Data byla úspěšně zapsána!");
    })
    .catch((error) => {
      console.error("Chyba při zápisu do Firestore:", error);
    });
}