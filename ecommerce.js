// ===============================
// MOBILE MENU
// ===============================

const close = document.querySelector(".close");
const open = document.querySelector(".ham");
const menu = document.querySelector(".menu");

close.addEventListener("click", () => {
    menu.style.visibility = "hidden";
});

open.addEventListener("click", () => {
    menu.style.visibility = "visible";
});


// ===============================
// PRODUCT CONTAINER
// ===============================

const productContainer = document.querySelector(".container");


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<h2>No products found</h2>";
        return;
    }

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.classList.add("items");

        productCard.style.cursor = "pointer";

        productCard.innerHTML = `
            <div class="img img1">
                <img src="${product.imageUrl}" alt="${product.name}">
            </div>

            <div class="name">
                ${product.name}
            </div>

            <div class="price">
                ₹${product.price}
            </div>

            <div class="info">
                ${product.description}
            </div>
        `;

        productCard.addEventListener("click", () => {
            window.location.href = `product-details.html?id=${product.id}`;
        });

        productContainer.appendChild(productCard);
    });
}


// ===============================
// LOAD ALL PRODUCTS
// ===============================

function loadProducts() {

    fetch("https://rahul-shop-backend.onrender.com/api/products")
        .then(response => response.json())
        .then(products => {

            console.log("Products:", products);

            displayProducts(products);
        })
        .catch(error => {
            console.error("Error loading products:", error);
        });
}


// ===============================
// SEARCH PRODUCTS
// ===============================

const searchInput = document.querySelector("#input");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.trim();

    // Agar search box empty hai
    if (searchText === "") {
        loadProducts();
        return;
    }

    // Backend search API
    fetch(
        `https://rahul-shop-backend.onrender.com/api/products/search?name=${encodeURIComponent(searchText)}`
    )
        .then(response => response.json())
        .then(products => {

            console.log("Search Results:", products);

            displayProducts(products);
        })
        .catch(error => {
            console.error("Search error:", error);
        });
});




// ===============================
// INITIAL LOAD
// ===============================

loadProducts();