const searchInput = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

function showProducts(list) {

    results.innerHTML = "";

    list.forEach(product => {

        results.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow-sm">

                <img src="${product.image}" class="card-img-top">

                <div class="card-body">

                    <h5>${product.name}</h5>

                    <p>₹${product.price}</p>

                    <a href="product.html?id=${product.id}" class="btn btn-dark">
                        View Product
                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

showProducts(products);

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    showProducts(filtered);

});