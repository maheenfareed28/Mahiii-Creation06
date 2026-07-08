document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("popularProductsContainer");

    if (!container) return;

    container.innerHTML = "";

    const popular = window.products.filter(product =>
        window.popularProducts.includes(product.id)
    );

    popular.forEach(product => {

        container.innerHTML += `

        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

            <div class="card h-100 shadow-sm">

                <img src="${product.image}"
                     class="card-img-top"
                     alt="${product.name}"
                     style="height:260px;object-fit:cover;">

                <div class="card-body d-flex flex-column">

                    <h5>${product.name}</h5>

                    <p class="text-muted small">
                        ${product.description}
                    </p>

                    <h5 class="mt-auto">
                        ₹${product.price}
                    </h5>

                    <a href="product.html?id=${product.id}"
                       class="btn btn-danger w-100 mt-3">

                        View Product

                    </a>

                </div>

            </div>

        </div>

        `;

    });

});