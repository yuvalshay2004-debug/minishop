async function loadProducts() {
    // URLs אפשריים
    const dockerUrl = "http://backend:5000/products";        // בתוך Docker Compose
    const hostUrl = "http://192.168.1.204:5000/products";   // מחוץ ל-Docker, מהדפדפן

    let fetchUrl;

    // ניסיון ראשוני לגשת ל-backend בתוך Docker
    try {
        const res = await fetch(dockerUrl, { method: "HEAD" });
        if (res.ok) {
            fetchUrl = dockerUrl;
        } else {
            fetchUrl = hostUrl;
        }
    } catch (err) {
        fetchUrl = hostUrl;
    }

    // בקשת הנתונים
    const res = await fetch(fetchUrl);
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

