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
