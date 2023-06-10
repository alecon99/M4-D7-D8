/* api,token,id prodotto per chiamata ajax */
const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjA0MmI5YzBmNzAwMTQ0ODRmOTMiLCJpYXQiOjE2ODYwNjkzMTUsImV4cCI6MTY4NzI3ODkxNX0.hwiNNYbHLmCRZWW5ChRTyOERSFCe6N1kx-w6XiB3OGw";
const params = new URLSearchParams(window.location.search);
const paramsId = params.get('product');

/* elementi dom */
const detailCardContainer = document.getElementById("detail-card-container");
const imgProduct = document.getElementById("img-product");
const nameProduct = document.getElementById("name-product");
const descriptionProduct = document.getElementById("description-product");
const brandProduct = document.getElementById("brand-product");
const priceProduct = document.getElementById("price-product");

/* chiamata AJAX */
if (window.location.search) {
    async function detailProducts() {
        const res = await fetch(apiUrl + paramsId, {headers: {"Authorization": "Bearer "+ token }});
        const json =  await res.json();
        postDetail(json);
    }
    window.onload = detailProducts();
} 

/* funzione inserisci dati nel DOM */
function postDetail(element){
    imgProduct.src = element.imageUrl;
    imgProduct.alt = element.name;
    nameProduct.innerText = element.name;
    descriptionProduct.innerText = element.description;
    brandProduct.innerText = "BRAND: "+element.brand;
    priceProduct.innerText = "€ " + element.price;

    detailCardContainer.classList.remove("d-none");
}
