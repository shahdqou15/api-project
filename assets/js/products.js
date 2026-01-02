const productContainer = document.querySelector(".products .row");
const sortSelect = document.querySelector(".sortProducts");
const myModal = document.querySelector(".my-modal");
const modalCard = document.querySelector(".product-details");
const closeBtn = modalCard.querySelector(".close-btn");


const params = new URLSearchParams(location.search);
const categoryName = params.get('categoryName');

const getProducts = async (sortBy = "", order = "") => {
    try {
        let url = categoryName
            ? `https://dummyjson.com/products/category/${categoryName}`
            : `https://dummyjson.com/products`;

        if (sortBy && order) {
            url += `?sortBy=${sortBy}&order=${order}`;
        }

        const response = await axios.get(url);
        return response.data.products;
    } catch (error) {
        console.error(error);
        return [];
    }
};


const displayProducts = (products) => {
    productContainer.innerHTML = products.map( (product) => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 product-card" data-id="${product.id}">
                <img src="${product.thumbnail}" class="card-img-top product-img" alt="image-card">
                <div class="card-body">
                    <h6 class="card-title fw-semibold text-success-emphasis">${product.title}</h6>
                    <p class="fw-bold">$${product.price}</p>
                </div>
            </div>
        </div>
    `
        ).join("");
};


const showProductDetails = async (id) => {

        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const product = response.data;

        modalCard.querySelector(".details-image").src = product.thumbnail;
        modalCard.querySelector(".details-title").textContent = product.title;
        modalCard.querySelector(".details-description").textContent = product.description;
        modalCard.querySelector(".details-price").textContent = product.price;
        modalCard.querySelector(".details-category").textContent = product.category;

        myModal.classList.remove("d-none");
        modalCard.classList.remove("d-none");
    
};


closeBtn.addEventListener("click", () => {
    myModal.classList.add("d-none");
});


const init = async () => {
    let products = await getProducts(); 
    displayProducts(products);

    sortSelect.addEventListener("change", async (e) => {
        const value = e.target.value;
        if (!value) return;

        const [sortBy, order] = value.split("-");
        const sortedProducts = await getProducts(sortBy, order);
        displayProducts(sortedProducts);
    });

    productContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".product-card");
        if (!card) return;

        const id = card.dataset.id;
        showProductDetails(id);
    });
};

init();

