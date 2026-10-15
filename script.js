function openWhatsApp() {
    document.getElementById("whatsappPopup").style.display = "flex";
}


function closeWhatsApp() {
    document.getElementById("whatsappPopup").style.display = "none";
}


function goToWhatsApp() {

    // Ganti dengan nomor WhatsApp Dolcera
    const phoneNumber = "6281234567890";

    const message =
        "Hello Dolcera! I would like to place an order.";

    const whatsappURL =
        "https://wa.me/" + phoneNumber + "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}


// Tutup popup jika klik area di luar box

window.onclick = function (event) {

    const popup =
        document.getElementById("whatsappPopup");

    if (event.target === popup) {
        closeWhatsApp();
    }

}

let currentSlide = 0;

const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");


// const sayHello = (name) =>{
//     console.log(name)
// }

const showSlide = (index) => {

    if (index >= items.length) {
        currentSlide = 0;
    }

    else if (index < 0) {
        currentSlide = items.length - 1;
    }

    else {
        currentSlide = index;
    }

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[currentSlide].classList.add("active");
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function prevSlide() {
    showSlide(currentSlide - 1);
}


/* Auto slide setiap 3 detik */

setInterval(() => {
    nextSlide();
}, 3000);

function sendEmail() {
    const email = document.getElementById("emailInput").value;

    if (email.trim() === "") {
        alert("Please enter your email!");
        return;
    }

    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}



const productGrid = document.getElementById("productGrid");

function displayProducts(productList) {

    productGrid.innerHTML = "";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="catalog-image">

                <img src="${product.image}" alt="${product.name}">

                ${product.badge
                ? `<span class="product-badge">${product.badge}</span>`
                : ""
            }

            </div>

            <div class="catalog-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="catalog-rating">
                    ★★★★★
                </div>

                <div class="catalog-bottom">

                    <span class="catalog-price">
                        Rp${product.price.toLocaleString("id-ID")}
                    </span>

                    <button
                        class="view-btn"
                        onclick="openProductModal(${product.id})">
                        View
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });
}

displayProducts(products);

function filterProducts(category) {

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {
        button.classList.remove("active");

        if (button.textContent === category) {
            button.classList.add("active");
        }
    });

    if (category === "All") {
        displayProducts(products);
    } else {

        const filteredProducts = products.filter(
            product => product.category === category
        );

        displayProducts(filteredProducts);
    }
};

let selectedProduct = null;

function openProductModal(id) {

    selectedProduct = products.find(product => product.id === id);

    document.getElementById("modalImage").src =
        selectedProduct.image;

    document.getElementById("modalCategory").textContent =
        selectedProduct.category;

    document.getElementById("modalName").textContent =
        selectedProduct.name;

    document.getElementById("modalDescription").textContent =
        selectedProduct.description;

    document.getElementById("modalPrice").textContent =
        "Rp" + selectedProduct.price.toLocaleString("id-ID");

    document.getElementById("modalRating").textContent =
        "★★★★★";

    document.getElementById("productModal").style.display = "flex";

    modalQuantity = 1;
    document.getElementById("modalQuantity").textContent = modalQuantity;
}

function closeProductModal() {

    document.getElementById("productModal").style.display = "none";
}

let cart = [];

function addToCart(product) {

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    // Show attractive notification
    showCartToast(product.name);
}

function showCartToast(productName) {

    const toast = document.getElementById("cartToast");
    const productText = document.getElementById("toastProductName");

    productText.textContent = productName + " has been added to your cart.";

    toast.classList.add("show");

    setTimeout(() => {
        closeCartToast();
    }, 3500);
}

function closeCartToast() {

    const toast = document.getElementById("cartToast");

    toast.classList.remove("show");
}

function addToCartFromModal() {

    if (!selectedProduct) return;

    const existingProduct = cart.find(
        item => item.id === selectedProduct.id
    );

    if (existingProduct) {

        existingProduct.quantity += modalQuantity;

    } else {

        cart.push({
            ...selectedProduct,
            quantity: modalQuantity
        });

    }

    updateCart();

    showCartToast(
        `${selectedProduct.name} x${modalQuantity}`
    );

    closeProductModal();
}

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    displayCart();
}

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your Cart is Empty</h3>
                <p>Add some delicious desserts to get started.</p>
            </div>
        `;

        document.getElementById("cartTotal").textContent = "Rp0";
        return;
    }

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    Rp${item.price.toLocaleString("id-ID")}
                </p>

                <div class="quantity-control">

                    <button 
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button 
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-right">

                <strong>
                    Rp${itemTotal.toLocaleString("id-ID")}
                </strong>

                <button 
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    // Hitung diskon voucher
    let discount = 0;

    if (appliedVoucher === "SWEET20") {
        discount = total * discountRate;
    }

    const finalTotal = total - discount;

    document.getElementById("cartTotal").innerHTML = `
    ${appliedVoucher === "SWEET20"
            ? `
            <div class="cart-discount">
                <span>Subtotal:</span>
                <span>Rp${total.toLocaleString("id-ID")}</span>
            </div>

            <div class="cart-discount">
                <span>Voucher (${appliedVoucher}):</span>
                <span>-Rp${discount.toLocaleString("id-ID")}</span>
            </div>
        `
            : ""
        }

    <strong>
        Rp${finalTotal.toLocaleString("id-ID")}
    </strong>
`;
}

function changeQuantity(id, amount) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity += amount;

    // Kalau quantity menjadi 0, hapus dari cart
    if (product.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);

    }

    updateCart();
}

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}

function openCart() {
    document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function goToCategory(category) {
    // Arahkan ke section Our Dessert Menu
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });

    // Filter sesuai kategori
    filterProducts(category);
}

// function checkout() {

//     if (cart.length === 0) {
//         alert("Your cart is empty.");
//         return;
//     }

//     placeOrder();

//     document.getElementById("checkoutModal").classList.add("active");
// }

let modalQuantity = 1;

function changeModalQuantity(amount) {

    modalQuantity += amount;

    if (modalQuantity < 1) {
        modalQuantity = 1;
    }

    document.getElementById("modalQuantity").textContent =
        modalQuantity;
}

function closePromo() {
    document.getElementById("promoPopup").style.display = "none";
}

window.addEventListener("load", function () {
    document.getElementById("promoPopup").style.display = "flex";
});

function openPromotion() {
    document.getElementById("promotionModal").classList.add("active");
}

function closePromotion() {
    document.getElementById("promotionModal").classList.remove("active");
}

function redeemVoucher() {
    const input = document.getElementById("voucherInput");
    const message = document.getElementById("voucherMessage");

    const code = input.value.trim().toUpperCase();

    if (code === "SWEET20") {
        localStorage.setItem("dolceraVoucher", "SWEET20");

        message.textContent = "✓ Voucher successfully redeemed! 20% OFF applied.";
        message.className = "voucher-success";

        input.value = "SWEET20";
        input.disabled = true;

        // Ubah tombol menjadi Redeemed
        const button = input.nextElementSibling;
        button.textContent = "Redeemed";
        button.disabled = true;
        updateCart();

    } else {
        message.textContent = "Invalid voucher code.";
        message.className = "voucher-error";
    }
}

function calculateTotal(subtotal) {
    let discount = 0;

    const voucher = localStorage.getItem("dolceraVoucher");

    if (voucher === "SWEET20") {
        discount = subtotal * 0.20;
    }

    const total = subtotal - discount;

    return {
        subtotal: subtotal,
        discount: discount,
        total: total
    };
}

function updateCheckoutSummary() {

    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    Rp${itemTotal.toLocaleString("id-ID")}
                </span>
            </div>
        `;
    });

    // Hitung discount
    let discount = 0;

    if (appliedVoucher === "SWEET20") {
        discount = subtotal * discountRate;
    }

    const total = subtotal - discount;

    checkoutTotal.innerHTML = `
        <div class="checkout-row">
            <span>Subtotal</span>
            <span>Rp${subtotal.toLocaleString("id-ID")}</span>
        </div>

        ${appliedVoucher
            ? `
            <div class="checkout-row voucher-row">
                <span>
                    Voucher (${appliedVoucher})
                </span>

                <span>
                    -Rp${discount.toLocaleString("id-ID")}
                </span>
            </div>
            `
            : ""
        }

        <div class="checkout-row checkout-final">
            <strong>Total</strong>
            <strong>Rp${total.toLocaleString("id-ID")}</strong>
        </div>
    `;
}







/* ==============================
   DOLCERA VOUCHER SYSTEM
   ============================== */

let appliedVoucher = "";
let discountRate = 0;


/* ==============================
   LOAD SAVED VOUCHER
   ============================== */

const savedVoucher = localStorage.getItem("dolceraVoucher");

if (savedVoucher === "SWEET20") {
    appliedVoucher = "SWEET20";
    discountRate = 0.20;
}

function redeemVoucher() {

    const input = document.getElementById("voucherInput");
    const message = document.getElementById("voucherMessage");

    if (!input || !message) return;

    const code = input.value.trim().toUpperCase();

    // Empty code
    if (code === "") {

        message.textContent = "Please enter a voucher code.";
        message.className = "voucher-error";

        return;
    }


    // Correct voucher
    if (code === "SWEET20") {

        appliedVoucher = "SWEET20";
        discountRate = 0.20;

        localStorage.setItem(
            "dolceraVoucher",
            "SWEET20"
        );


        message.textContent =
            "✓ Voucher applied! You got 20% OFF.";

        message.className = "voucher-success";


        input.value = "SWEET20";
        input.disabled = true;


        const button =
            input.nextElementSibling;

        if (button) {
            button.textContent = "Redeemed";
            button.disabled = true;
        }


        // Update checkout if it is already open
        if (
            typeof updateCheckoutSummary === "function"
        ) {
            updateCheckoutSummary();
        }

    }

    // Wrong voucher
    else {

        appliedVoucher = "";
        discountRate = 0;

        message.textContent =
            "Invalid voucher code.";

        message.className =
            "voucher-error";
    }
}


/* ==============================
   CHECKOUT SUMMARY
   ============================== */

function updateCheckoutSummary() {
    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if(checkoutItems){
        checkoutItems.innerHTML = "";
    }

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    Rp${itemTotal.toLocaleString("id-ID")}
                </span>
            </div>
        `;
    });

    // Hitung diskon
    let discount = 0;

    if (appliedVoucher === "SWEET20") {
        discount = subtotal * 0.20;
    }

    // Harga akhir setelah diskon
    const total = subtotal - discount;

    checkoutTotal.innerHTML = `
        <div class="checkout-row">
            <span>Subtotal</span>
            <span>
                Rp${subtotal.toLocaleString("id-ID")}
            </span>
        </div>

        ${appliedVoucher === "SWEET20"
            ? `
                <div class="checkout-row voucher-row">
                    <span>Voucher (SWEET20)</span>
                    <span>
                        -Rp${discount.toLocaleString("id-ID")}
                    </span>
                </div>
            `
            : ""
        }

        <div class="checkout-row checkout-final">
            <strong>Total</strong>
            <strong>
                Rp${total.toLocaleString("id-ID")}
            </strong>
        </div>
    `;
}


/* ==============================
   CHECKOUT
   ============================== */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    placeOrder();


    document
        .getElementById("checkoutModal")
        .classList.add("active");
}


/* ==============================
   PLACE ORDER
   ============================== */

// function placeOrder() {
//     const name =
//         document.getElementById("customerName").value.trim();

//     const phone =
//         document.getElementById("customerPhone").value.trim();

//     const payment =
//         document.getElementById("paymentMethod").value;

//     if (!name || !phone || !payment) {
//         alert("Please complete your information.");
//         return;
//     }

//     let subtotal = 0;

//     let message =
//         `Hello Dolcera! I would like to place an order.\n\n`;

//     message += `Name: ${name}\n`;
//     message += `Phone: ${phone}\n`;
//     message += `Payment: ${payment}\n\n`;

//     message += `ORDER DETAILS:\n`;

//     cart.forEach(item => {
//         const itemTotal = item.price * item.quantity;

//         subtotal += itemTotal;

//         message +=
//             `${item.name} x${item.quantity} - Rp${itemTotal.toLocaleString("id-ID")}\n`;
//     });

//     // Hitung diskon voucher
//     let discount = 0;

//     if (appliedVoucher === "SWEET20") {
//         discount = subtotal * 0.20;
//     }

//     // Total setelah voucher
//     const total = subtotal - discount;

//     message += `\nSubtotal: Rp${subtotal.toLocaleString("id-ID")}`;

//     if (appliedVoucher === "SWEET20") {
//         message +=
//             `\nVoucher: SWEET20 (-Rp${discount.toLocaleString("id-ID")})`;
//     }

//     // INI HARGA YANG SUDAH DIKURANGI VOUCHER
//     message += `\nTotal: Rp${total.toLocaleString("id-ID")}`;

//     const phoneNumber = "6281234567890";

//     const whatsappURL =
//         `https://wa.me/${phoneNumber}?text=` +
//         encodeURIComponent(message);

//     window.open(whatsappURL, "_blank");
// }

// function placeOrder() {

//     const name = document.getElementById("customerName").value.trim();
//     const phone = document.getElementById("customerPhone").value.trim();
//     const payment = document.getElementById("paymentMethod").value;

//     if (!name || !phone || !payment) {
//         alert("Please complete your information.");
//         return;
//     }

//     let subtotal = 0;

//     let message = `Hello Dolcera! I would like to place an order.\n\n`;

//     message += `Name: ${name}\n`;
//     message += `Phone: ${phone}\n`;
//     message += `Payment: ${payment}\n\n`;

//     message += `ORDER DETAILS:\n`;

//     cart.forEach(item => {

//         const itemTotal = item.price * item.quantity;

//         subtotal += itemTotal;

//         message +=
//             `${item.name} x${item.quantity} - Rp${itemTotal.toLocaleString("id-ID")}\n`;
//     });

//     // Calculate voucher
//     let discount = 0;

//     if (appliedVoucher === "SWEET20") {
//         discount = subtotal * 0.20;
//     }

//     const total = subtotal - discount;

//     message += `\nSubtotal: Rp${subtotal.toLocaleString("id-ID")}`;

//     if (appliedVoucher === "SWEET20") {
//         message +=
//             `\nVoucher: SWEET20 (-Rp${discount.toLocaleString("id-ID")})`;
//     }

//     message += `\nTotal: Rp${total.toLocaleString("id-ID")}`;

//     const phoneNumber = "6281234567890";

//     const whatsappURL =
//         `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//     window.open(whatsappURL, "_blank");
// }

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const phoneNumber = "6281234567890";

    const whatsappMessage =
        `Hello Dolcera!%0A%0A` +
        `Name: ${name}%0A` +
        `Email: ${email}%0A%0A` +
        `Message:%0A${message}`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");

});

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");

    navbar.classList.toggle("active");

    hamburger.classList.toggle("active");
}

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {

        document
            .getElementById("navbar")
            .classList.remove("active");

        document
            .getElementById("hamburger")
            .classList.remove("active");
    });
});

function placeOrder() {

    let subtotal = 0;

    let message =
        `Hello Dolcera! I would like to place an order.\n\n`;

    message += `ORDER DETAILS:\n`;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        message +=
            `${item.name} x${item.quantity} - Rp${itemTotal.toLocaleString("id-ID")}\n`;
    });

    // Calculate voucher discount
    let discount = 0;

    if (appliedVoucher === "SWEET20") {
        discount = subtotal * discountRate;
    }

    // Final price after voucher
    const total = subtotal - discount;

    message +=
        `\nSubtotal: Rp${subtotal.toLocaleString("id-ID")}`;

    if (appliedVoucher === "SWEET20") {
        message +=
            `\nVoucher: SWEET20 (-Rp${discount.toLocaleString("id-ID")})`;
    }

    message +=
        `\nTotal: Rp${total.toLocaleString("id-ID")}`;

    const phoneNumber = "6281234567890";

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=` +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});