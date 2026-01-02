const getCategories = async () => {

    const response = await axios.get(`https://dummyjson.com/products/category-list`);
    return response.data;
}

const displayCategories = async () => {

    const result = await getCategories();
    const categories = result.map((category) => {
        return `
        <div class="col-md-4 col-lg-3 mb-4">
            <a class="text-decoration-none" href="./products.html?categoryName=${category}">
                <div class="card category-card text-center h-100">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <h5 class="mb-0 text-capitalize">${category}</h5>
                    </div>
                 </div>
            </a>
        </div>`

    }).join(" ")

    document.querySelector(".categories .row").innerHTML = categories;
}

displayCategories();





const getProducts = async () => {
    const response = await axios.get(`https://dummyjson.com/products?limit=10`);
    return response.data.products;
}

const displayProducts = async () => {

    const result = await getProducts();
    const products = result.map((product) => {
        return `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 product-card" data-id="${product.id}">
                <img src="${product.thumbnail}" class="card-img-top product-img " alt="product-image">
                    <div class="card-body">
                        <h6 class="card-title fw-semibold text-danger-emphasis">${product.title}</h6>
                        <p class="fw-bold ">$${product.price}</p>
                    </div>
            </div>
        </div>`

    }).join(" ")

    document.querySelector(".products .row").innerHTML = products;







};


displayProducts();




const getProductDetails = async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
};

const showProductDetails = async (id) => {
    const myModal = document.querySelector(".my-modal");
    const product = await getProductDetails(id);
    const closeBtn = document.querySelector(".close-btn");
    
    document.querySelector(".my-modal").classList.remove("d-none");
    document.querySelector(".details-image").src = product.thumbnail;
    document.querySelector(".details-title").textContent = product.title;
    document.querySelector(".details-description").textContent = product.description;
    document.querySelector(".details-price").textContent = product.price;
    document.querySelector(".details-category").textContent = product.category;
    document.querySelector(".product-details").classList.remove("d-none");

    const closeModal = () => {
        myModal.classList.add("d-none");
    };
    closeBtn.addEventListener("click", () => {
        closeModal();
    });
};


document.querySelector(".products .row").addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const id = card.dataset.id;
    showProductDetails(id);
});





