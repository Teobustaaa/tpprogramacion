document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const addToCartButtons = document.querySelectorAll(".anadir-carrito");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Cargar carrito desde localStorage si existe
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  actualizarCarrito();

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".producto");

      // Validar cantidad
      const inputCantidad = productCard.querySelector(".input-cantidad");
      const qty = parseInt(inputCantidad.value);
      if (!qty || qty < 1) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
      }

      // Validar talle
      const selectTalle = productCard.querySelector("select[name='talle']");
      const talle = selectTalle.value;
      if (!talle) {
        alert("Por favor, seleccione un talle.");
        return;
      }

      const title = productCard.querySelector(".titulo")?.innerText || "Producto";
      const priceText = productCard.querySelector(".precio")?.innerText || "$0";
      const price = parseFloat(priceText.replace("$", "").replace(".", "").trim()) || 0;
      const img = productCard.parentElement.querySelector(".producto-img")?.src || "";

      const idProducto = `${title}-${talle}`;
      const existing = cart.find(item => item.id === idProducto);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ id: idProducto, title, price, img, qty, talle });
      }

      guardarCarrito();
      actualizarCarrito();

      // Limpiar cantidad
      inputCantidad.value = "";
    });
  });

  // Botón finalizar compra
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("¡Compra finalizada!");
    cart = [];
    guardarCarrito();
    actualizarCarrito();
  });

  function actualizarCarrito() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="text-center m-0">Tu carrito está vacío</p>`;
      cartTotal.textContent = "";
      cartCount.textContent = "0";
      return;
    }

    let totalGeneral = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      totalGeneral += subtotal;

      const li = document.createElement("div");
      li.classList.add("cart-item", "d-flex", "align-items-center", "mb-2");
      li.innerHTML = `
        <img src="${item.img}" alt="${item.title}" style="width:50px; height:auto; margin-right:10px; border-radius:5px;">
        <div class="flex-grow-1">
          <p class="m-0 fw-bold">${item.title} (${item.talle})</p>
          <small>${item.qty} x $${item.price.toLocaleString()} = $${subtotal.toLocaleString()}</small>
        </div>
        <button class="btn btn-sm btn-danger ms-2" data-index="${index}">x</button>
      `;

      cartItems.appendChild(li);

      // Botón eliminar
      li.querySelector("button").addEventListener("click", (e) => {
        const idx = parseInt(e.target.dataset.index);
        cart.splice(idx, 1);
        guardarCarrito();
        actualizarCarrito();
      });
    });

    cartTotal.textContent = `Total: $${totalGeneral.toLocaleString()}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  }

  function guardarCarrito() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
