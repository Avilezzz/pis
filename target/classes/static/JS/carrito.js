document.addEventListener("DOMContentLoaded", () => {
  const cart = [];

  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const buyBtn = document.getElementById("buy-btn");
  const cartFloatBtn = document.getElementById("cart-float-btn");
  const cartCountBadge = document.getElementById("cart-count");
  const cartModalEl = document.getElementById("cartModal");
  const cartModal = new bootstrap.Modal(cartModalEl);
  const checkoutModalEl = document.getElementById("checkoutModal");
  const checkoutModal = new bootstrap.Modal(checkoutModalEl);

  const checkoutForm = document.getElementById("checkout-form");

  /* Toast helper */
  function showToast(message, variant = "primary") {
    const container = document.getElementById("toast-container");
    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center text-bg-${variant} border-0`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");
    toastEl.innerHTML = `
              <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>`;
    container.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  }

  /* Helpers */
  const getTotalQty = () => cart.reduce((acc, cur) => acc + cur.quantity, 0);

  function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const row = document.createElement("tr");
      row.dataset.id = item.id;
      row.innerHTML = `
              <td>${item.name}</td>
              <td class="text-center">
                <button class="btn btn-sm btn-light dec">-</button>
                <span class="mx-2 quantity">${item.quantity}</span>
                <button class="btn btn-sm btn-light inc">+</button>
              </td>
              <td class="text-end">
                $${(item.price * item.quantity).toFixed(2)}
                <button class="btn btn-sm btn-link text-danger del" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
              </td>`;
      cartItemsContainer.appendChild(row);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    buyBtn.disabled = cart.length === 0;
    cartCountBadge.textContent = getTotalQty();
  }

  /* Delegación de eventos para controles dentro del modal */
  cartItemsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const row = btn.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const item = cart.find((it) => it.id === id);
    if (!item) return;

    if (btn.classList.contains("inc")) {
      item.quantity += 1;
    } else if (btn.classList.contains("dec")) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const idx = cart.indexOf(item);
        cart.splice(idx, 1);
      }
    } else if (btn.classList.contains("del")) {
      const idx = cart.indexOf(item);
      cart.splice(idx, 1);
    }

    updateCartModal();
  });

  /* Mostrar modal desde botón flotante */
  cartFloatBtn.addEventListener("click", () => {
    updateCartModal();
    cartModal.show();
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    const btnsNode = card.querySelectorAll(".quantity-btn");
    if (btnsNode.length < 2) return; // evita errores si la tarjeta no tiene ambos botones
    const [minusBtn, plusBtn] = btnsNode;
    const quantityDisplay = card.querySelector(".quantity-display");
    const addCartBtn = card.querySelector(".order-btn");

    minusBtn.addEventListener("click", () => {
      let qty = parseInt(quantityDisplay.textContent, 10);
      if (qty > 0) {
        qty -= 1;
        quantityDisplay.textContent = qty;
      }
    });

    plusBtn.addEventListener("click", () => {
      let qty = parseInt(quantityDisplay.textContent, 10);
      quantityDisplay.textContent = qty + 1;
    });

    addCartBtn.addEventListener("click", () => {
      const qty = parseInt(quantityDisplay.textContent, 10);
      if (qty === 0) {
        return;
      }

      const name = card.querySelector(".card-title").textContent.trim();
      const priceText = card
        .querySelector(".price-badge")
        .textContent.replace("$", "")
        .trim();
      const price = parseFloat(priceText);
      const id = card.dataset.id;

      const existing = cart.find((item) => item.id === id);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({ id, name, price, quantity: qty });
      }

      // Reiniciar cantidad visual
      quantityDisplay.textContent = 0;

      updateCartModal();
      cartModal.show();
    });
  });

  buyBtn.addEventListener("click", () => {
    cartModal.hide();
    checkoutModal.show();
  });

  /* Envío del formulario de checkout */
  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!checkoutForm.checkValidity()) {
      checkoutForm.classList.add("was-validated");
      return;
    }

    const formData = new FormData(checkoutForm);
    const pedido = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
      items: cart.map((it) => ({ productId: it.id, quantity: it.quantity })),
    };

    try {
      const resp = await fetch("/pedidos/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (!resp.ok) throw new Error("Error en servidor");

      showToast("¡Pedido registrado con éxito!", "success");

      // Reset estados
      checkoutForm.reset();
      cart.length = 0;
      updateCartModal();
      checkoutModal.hide();
    } catch (err) {
      showToast("Hubo un problema al registrar el pedido", "danger");
    }
  });
});
