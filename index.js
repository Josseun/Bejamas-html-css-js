const products = [
  {
    id: "0",
    name: "Samurai King Resting",
    category: "pets",
    price: "$10000.00",
    image: "./img/Samurai-King-Resting.jpg",
  },
  {
    id: "1",
    name: "Red Bench",
    category: "People",
    price: "$3.89",
    image: "./img/Red-bench.jpg",
  },
  {
    id: "2",
    name: "Egg Balloon",
    category: "Food",
    price: "$93.89",
    image: "./img/egg-balloons.jpg",
  },
  {
    id: "3",
    name: "Egg Balloon",
    category: "Food",
    price: "$93.89",
    image: "./img/egg-balloons.jpg",
  },
  {
    id: "4",
    name: "Man",
    category: "People",
    price: "$100.00",
    image: "./img/man.png",
  },
  {
    id: "5",
    name: "Architecture",
    category: "Landmarks",
    price: "$101.00",
    image: "./img/Architecture.jpg",
  },
  {
    id: "6",
    name: "Architecture",
    category: "Landmarks",
    price: "$101.00",
    image: "./img/Architecture.jpg",
  },
];

let selectedProducts = [];

function initHeroSection() {
  const heroContain = document.getElementById("hero-container");
  const heroProduct = products.find((product) => product.id === "0");

  if (heroProduct) {
    heroContain.innerHTML = `
                        <div class="king-cart">
                            <div class="king-name-style">
                                ${heroProduct.name}
                            </div>
                            <button id="heroAddToCart" class="king-cart-box">
                                ADD TO CART
                            </button>
                        </div>
                        <div class="hero-img">
                            <img class="king-img" src="${heroProduct.image}" alt="${heroProduct.name}">
                            <p class="Photo-tag">Photo of the day</p>
                        </div>
                    `;

    document.getElementById("heroAddToCart").addEventListener("click", () => {
      toggleProduct(heroProduct);
    });
  }
}

function initProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products
    .filter((product) => product.id !== "0")
    .forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
                            <div class="item-img-container"> 
                                ${
                                  product.id === "1"
                                    ? '<div class="tag">Best Seller</div>'
                                    : ""
                                }
                                <img class="item-img" src="${
                                  product.image
                                }" alt="${product.name}">
                                <button class="addToCart" data-product-id="${
                                  product.id
                                }">Add to Cart</button>
                            </div>
                            <p class="item-cate">${product.category}</p>
                            <h3 class="item-name">${product.name}</h3>
                            <p class="item-price">${product.price}</p>
                        `;

      container.appendChild(productDiv);

      const addToCartBtn = productDiv.querySelector(".addToCart");
      addToCartBtn.addEventListener("click", () => {
        toggleProduct(product);
      });
    });
}

function toggleProduct(product) {
  const exists = selectedProducts.find((p) => p.id === product.id);

  if (!exists) {
    selectedProducts.push(product);
    updateCounter();
    updateCartModal();
  }
}

function updateCounter() {
  const itemCount = document.getElementById("count");
  itemCount.textContent = selectedProducts.length;
}

function updateCartModal() {
  const cartItemsElement = document.getElementById("cart-items");

  if (selectedProducts.length === 0) {
    cartItemsElement.innerHTML =
      '<p style="text-align: center; color: #666; padding: 2rem; font-size: 23px; font-family: Archivo-Regular; font-weight: 500;">Your cart is empty</p>';
  } else {
    cartItemsElement.innerHTML = selectedProducts
      .map(
        (product) => `
                                    <div style="padding: 1rem; border-bottom: 1px solid #eee; display: flex;  flex-direction: column; justify-content: space-between; align-items: center;">
                                             <div style="width:100%; display:flex; justify-content: end; align-items: center; margin-bottom: 10px;">
                                 </div>
                <div style="width:100%; display:flex; justify-content: space-between; align-items: center;">
             <div>
                                    <div style=" font-size: 20px;
                        font-family: Archivo-Regular; 
                        font-weight: 700;">${product.name}</div>
                                    <div style=" font-size: 29px; color:#656565;
                        font-family: Archivo-Regular; 
                        font-weight: 400;">${product.price}</div>
                                </div>
  <img style="width:149px; height:86px; " src=${product.image} alt="">
        </div>
   </div> `
      )
      .join("");
  }
}

function openCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "flex";
}

function closeCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "none";
}

function toggleCart() {
  const cartModal = document.getElementById("cart-modal");
  const isVisible = cartModal.style.display === "flex";
  cartModal.style.display = isVisible ? "none" : "flex";
}

function openSort() {
  const sortModal = document.getElementById("sort-modal");
  sortModal.style.display = "flex";
}

function closeSort() {
  const sortModal = document.getElementById("sort-modal");
  sortModal.style.display = "none";
}

function toggleSort() {
  const sortModal = document.getElementById("sort-modal");
  const isVisible = sortModal.style.display === "flex";
  sortModal.style.display = isVisible ? "none" : "flex";
}

function clearCart() {
  selectedProducts = [];
  updateCounter();
  updateCartModal();
}

function removeFromCart(productId) {
  const index = selectedProducts.findIndex((p) => p.id === productId);
  if (index > -1) {
    selectedProducts.splice(index, 1);
    updateCounter();
    updateCartModal();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initHeroSection();
  initProducts();

  const cartModal = document.getElementById("cart-modal");
  cartModal.addEventListener("click", function (e) {
    if (e.target === cartModal) {
      closeCart();
    }
  });

  // Close cart with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeCart();
    }
  });
});
