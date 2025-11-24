async function loadProducts() {
    const res = await fetch("http://back:5000/products");
    const data = await res.json();

    const list = document.getElementById("product-list");
    list.innerHTML = "";

    data.forEach(item => {
        const el = document.createElement("p");
        el.textContent = `${item.name} - ${item.price} ₪`;
        list.appendChild(el);
    });
}

loadProducts();
