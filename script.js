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

