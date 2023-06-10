/* api,token,id prodotto per chiamata ajax */
const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjA0MmI5YzBmNzAwMTQ0ODRmOTMiLCJpYXQiOjE2ODYwNjkzMTUsImV4cCI6MTY4NzI3ODkxNX0.hwiNNYbHLmCRZWW5ChRTyOERSFCe6N1kx-w6XiB3OGw";
const params = new URLSearchParams(window.location.search);
const paramsId = params.get('product');

/* elementi dom */
const detailCardContainer = document.getElementById("detail-card-container");
const cardContainer = document.getElementById("card-container");
const deletedNotify = document.getElementById("deleted-notify");
const modifyNotify = document.getElementById("modify-notify");
const deleteButton = document.getElementById("delete-button");
const modifyButton = document.getElementById("modify-button")

const inputImage = document.getElementById("inputImage");
const inputName = document.getElementById("inputName");
const inputDescription = document.getElementById("inputDescription");
const inputBrand = document.getElementById("inputBrand");
const inputPrice = document.getElementById("inputPrice");

const imgProduct = document.getElementById("img-product");
const idProduct = document.getElementById("id-product");
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
 

    /* evento click tasto elimina */
    deleteButton.addEventListener("click", ()=>{
        deletePost(paramsId)
    })

    /* evento click tasto modifica */
    modifyButton.addEventListener("click", ()=>{
        modifyPost(paramsId)
    })

    /* funzione inserisci dati nel DOM */
    function postDetail(element){
        imgProduct.src = element.imageUrl;
        imgProduct.alt = element.name;
        idProduct.innerText = "# "+element._id;
        nameProduct.innerText = "NAME: " + element.name;
        descriptionProduct.innerText ="DESCRIPTION: " + element.description;
        brandProduct.innerText = "BRAND: " + element.brand;
        priceProduct.innerText = "PRICE: " + "€ " + element.price;

        detailCardContainer.classList.remove("d-none");

        inputName.value = element.name; 
        inputDescription.value = element.description;
        inputBrand.value = element.brand;
        inputImage.value = element.imageUrl;
        inputPrice.value = element.price;
    }

    /* funzione cancella prodotto */
    async function deletePost(id) {
        const createResult = await fetch(apiUrl + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token,
            },
        });
        deletedNotify.classList.remove("d-none");
        setTimeout(()=>{
            deletedNotify.classList.add("d-none");
        }, 4000);
        detailProducts()
    }

    /* funzione modifica prodotto */
    async function modifyPost(id) {
        const newPayload = {
            "name": inputName.value,
            "description": inputDescription.value,
            "brand": inputBrand.value,
            "imageUrl": inputImage.value,
            "price": inputPrice.value,
        };
        const createResult = await fetch(apiUrl +id, {
            method: "PUT",
            body: JSON.stringify(newPayload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token,
            },
        });
        modifyNotify.classList.remove("d-none");
        setTimeout(()=>{
            modifyNotify.classList.add("d-none");
        }, 4000);
        
        detailProducts()
    }
}