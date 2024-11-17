function reserveGift(id) {
    let reservedGifts = JSON.parse(localStorage.getItem("reservedGifts") || "[]");
    if (!reservedGifts.includes(id)) {
      reservedGifts.push(id);
      localStorage.setItem("reservedGifts", JSON.stringify(reservedGifts));
      const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
      giftElement.classList.add("reserved");
      giftElement.querySelector("button").textContent = "Zrušit rezervaci";
      giftElement.querySelector("button").onclick = () => unreserveGift(id);
    }
  }

  // Zrušení rezervace dárku
  function unreserveGift(id) {
    let reservedGifts = JSON.parse(localStorage.getItem("reservedGifts") || "[]");
    reservedGifts = reservedGifts.filter(giftId => giftId !== id);
    localStorage.setItem("reservedGifts", JSON.stringify(reservedGifts));
    const giftElement = document.querySelector(`.gift[data-id="${id}"]`);
    giftElement.classList.remove("reserved");
    giftElement.querySelector("button").textContent = "Rezervovat";
    giftElement.querySelector("button").onclick = () => reserveGift(id);
  }

  // Kontrola při načtení stránky
  window.onload = checkReservedGifts;