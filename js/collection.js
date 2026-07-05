// URL se category read karega
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Heading change karega
const title = document.getElementById("categoryTitle");
title.innerText = category
    ? category.replace("-", " ").toUpperCase()
    : "All Products";

// Product container
const container = document.getElementById("productsContainer");

// Category ke products filter karo
const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

// Products show karo
filteredProducts.forEach(product => {

    container.innerHTML += `
    
    <div class="col-md-4 mb-4">
    
        <div class="card h-100 shadow-sm"
     onclick="window.location.href='product.html?id=${product.id}'"
     style="cursor:pointer;">

            <img src="${product.image}" class="card-img-top" alt="${product.name}">

            <div class="card-body">

                <h5>${product.name}</h5>

                <p>₹${product.price}</p>

                <p>${product.description}</p>

              <a href="product.html?id=${product.id}" class="btn btn-danger">
    View Product
</a>

            </div>

        </div>

    </div>

    `;

});