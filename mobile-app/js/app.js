function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price, img });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang");
}

function loadCart() {
  const cartBox = document.getElementById("cartBox");
  const totalBox = document.getElementById("total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    total += item.price;

    cartBox.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <h4>${item.name}</h4>
          <p>Rp ${item.price}</p>
        </div>
      </div>
    `;
  });

  totalBox.innerText = "Rp " + total;
}
