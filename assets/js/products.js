const getProducts = async()=>{
    const params = new URLSearchParams(location.search);
    const categoryName = params.get('categoryName');
    const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
    if(response.status == 200){
        return response.data.products;
    }
}
const displayCategories = async () => {

    const result = await getProducts();
    const products = result.map((product) => {
        return `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 product-card">
                <img src="${product.thumbnail}" class="card-img-top" alt="product-image">
                    <div class="card-body">
                        <h6 class="card-title">${product.title}</h6>
                        <p class="fw-bold">${product.price}</p>
                    </div>
            </div>
        </div>`       

    }).join(" ")
    
    document.querySelector(".products .row").innerHTML= products;
}

displayCategories();