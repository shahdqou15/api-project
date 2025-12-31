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
    
    document.querySelector(".categories .row").innerHTML= categories;
}

displayCategories();