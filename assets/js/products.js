const getProducts = async()=>{
    const params = new URLSearchParams(location.search);
    const categoryName = params.get('categoryName');
    const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
    if(response.status == 200){
        return response.data.products;
    }
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
    
    document.querySelector(".products .row").innerHTML= products;
}

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



