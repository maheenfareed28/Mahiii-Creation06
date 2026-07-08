const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const product = products.find(item => item.id === id);

const container = document.getElementById("productDetails");

if (!product) {

    container.innerHTML = "<h2 class='text-center mt-5'>Product not found</h2>";

} else {

    container.innerHTML = `

<div class="product-card">

<div class="container-fluid">

<div class="row g-5 align-items-start">

<div class="col-lg-6 col-md-12">

<img src="${product.image}" class="img-fluid" alt="${product.name}">

</div>

<div class="col-lg-6 col-md-12">

<h2 class="product-title">${product.name}</h2>

<h3 class="product-price">₹${product.price}</h3>

<p class="product-desc">

${product.description}

</p>

<div class="product-info">

<span>🧶 Handmade</span>

<span>💝 Custom Order</span>

<span>🚚 Made To Order</span>

</div>

<div class="delivery-box">

<div class="delivery-item">

<span>🧶</span>

<div>

<strong>100% Handmade</strong>

<p>Made with premium quality yarn.</p>

</div>

</div>

<div class="delivery-item">

<span>🚚</span>

<div>

<strong>Delivery</strong>

<p>Usually dispatched in 4–6 days.</p>

</div>

</div>

<div class="delivery-item">

<span>🎁</span>

<div>

<strong>Gift Packing</strong>

<p>Available on request.</p>

</div>

</div>

</div>

<div class="product-form">

<div class="mb-3">

<label class="form-label">Phone Model *</label>

<input
type="text"
id="phoneModel"
class="form-control"
placeholder="Example : iPhone 15 / Samsung S24 / Vivo V29">

</div>

<div class="mb-3">

<label class="form-label">Quantity</label>

<input
type="number"
id="qty"
class="form-control"
value="1"
min="1"
oninput="updateTotal()">

</div>

<div class="mb-4">

<label class="form-label">Special Instructions</label>

<textarea
id="note"
rows="4"
class="form-control"
placeholder="Write your customization here..."></textarea>

</div>

<div class="price-summary">

<div class="d-flex justify-content-between">

<span>Product Price</span>

<span id="productPrice">₹${product.price}</span>

</div>

<div class="d-flex justify-content-between">

<span>Shipping (India)</span>

<span>₹80</span>

</div>

<small style="color:#777;display:block;margin-top:5px;">

*International shipping charges will be shared after order confirmation.*

</small>

<hr>

<div class="d-flex justify-content-between fw-bold">

<span>Total</span>

<span id="totalPrice">₹${product.price + 80}</span>

</div>

</div>

<button
class="whatsapp-btn"
onclick="orderWhatsapp()">

Order on WhatsApp

</button>

</div> <!-- second column -->

</div> <!-- row -->

</div> <!-- container -->

</div> <!-- product-card -->

`;

    updateTotal();

}

function updateTotal() {

    const qty = Number(document.getElementById("qty").value) || 1;

    const shipping = 80;

    const productTotal = product.price * qty;

    const grandTotal = productTotal + shipping;

    document.getElementById("productPrice").innerText = "₹" + productTotal;

    document.getElementById("totalPrice").innerText = "₹" + grandTotal;

}

function orderWhatsapp() {

    const model = document.getElementById("phoneModel").value.trim();

    if (model === "") {
        alert("Please enter your phone model.");
        return;
    }

    const qty = Number(document.getElementById("qty").value);
    const note = document.getElementById("note").value;

    const deliveryCharge = 80;
    const subtotal = product.price * qty;
    const total = subtotal + deliveryCharge;

    const imageLink = `https://mahiii-creation.netlify.app/${product.image}`;
    const productLink = `https://mahiii-creation.netlify.app/product.html?id=${product.id}`;

    const message = `🛍️ New Order

Product : ${product.name}

Price : ₹${product.price}

Quantity : ${qty}

Subtotal : ₹${subtotal}

Delivery Charges :
₹${deliveryCharge} (Within India)

International Shipping :
Calculated separately based on destination country.

Total : ₹${total}

Phone Model :
${model}

Special Instructions :
${note || "None"}

Product Image :
${imageLink}

Product Link :
${productLink}`;

    const url = `https://wa.me/918441897087?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


