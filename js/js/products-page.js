const container = document.getElementById("productsContainer");

window.products.forEach(product => {

    container.innerHTML += `
        <div class="col-md-6 col-lg-4">

            <div class="mcard">

                <a href="product.html?id=${product.id}" class="mimg">
                    <img src="${product.image}" alt="${product.name}">
                </a>

                <div class="mbody">

                    <div class="mcat">${product.category}</div>

                    <div class="mtit">${product.name}</div>

                    <div class="mdesc">
                        ${product.description.substring(0, 80)}...
                    </div>

                    <div class="mfoot">

                        <div>
                            <div class="mprice">₹${product.price}</div>
                        </div>

                        <a href="product.html?id=${product.id}" class="madd">
                            <i class="fas fa-eye"></i>
                        </a>

                    </div>

                </div>

            </div>

        </div>
    `;

});