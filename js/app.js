const loadProducts = () => {
    const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR21rttFTjSgmkam4AJLBjA2bGxUab1ijzvHrMmiTOF8wpqFrEq50JGDWSc`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const div = document.createElement("div");
        div.classList.add("col-4");
        div.innerHTML = `
      
          <div class="card shadow-lg">
            <div class="p-5 mx-5">
                <img class="product-image card-img card-img-top" src=${image}></img>
             </div>
            <div class="card-body bg-light p-4">
               <h3 class="card-title">${product.title}</h3>
               <p>Category: ${product.category}</p>
               <h2>Price: $ ${product.price}</h2>
               <p>
                  <i class="fas fa-star-half-alt"></i>
                  <i class="fas fa-star-half-alt"></i>
                  <i class="fas fa-star-half-alt"></i>
                  <span> ${product.rating.rate}</span>
                  <span> (${product.rating.count})</span>
                   
               </p>
               <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-success">Add to cart</button>
               <button id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="setDetails(${product.id})">Details</button>
             </div>
       </div>
      
      `;
        document.getElementById("all-products").appendChild(div);
    }
};
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseInt(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
    setTotal();
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") + getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal;
};

const setDetails = id => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            // document.getElementById('ratting-point').innerText = ;
            // document.getElementById('ratting-count').innerText = ``;
        })
}

// innerText to value generator
const getTextValue = id => {
    const idName = document.getElementById(id).innerText;
    const idValue = parseFloat(idName);
    return idValue;
}


const setTotal = () => {
    const totalPrice = getTextValue('price');
    const deliveryCost = getTextValue('delivery-charge');
    const totalTax = getTextValue('total-tax');
    const inTotal = totalPrice + deliveryCost + totalTax;
    document.getElementById("total").innerText = inTotal.toFixed(2);
}