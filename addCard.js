/* api e token per chiamata ajax */
const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjA0MmI5YzBmNzAwMTQ0ODRmOTMiLCJpYXQiOjE2ODYwNjkzMTUsImV4cCI6MTY4NzI3ODkxNX0.hwiNNYbHLmCRZWW5ChRTyOERSFCe6N1kx-w6XiB3OGw";

/* elementi dom */
const inputName = document.getElementById("inputName");
const inputDescription = document.getElementById("inputDescription");
const inputBrand = document.getElementById("inputBrand");
const inputImage = document.getElementById("inputImage");
const inputPrice = document.getElementById("inputPrice");
const cardContainer = document.getElementById("card-container");

/* avvio funzione prodotti al caricamneto della pagina */
window.onload = AllProduct();

/* chiamata AJAX */
async function AllProduct() {
    cardContainer.innerHTML="";
    try {
        const res = await fetch(apiUrl, { 
            headers: { 
            "Authorization": "Bearer "+ token 
            }
            });
        const json = await res.json();
        json.forEach((element) => {
            createPostTemplate(element);
        });
    } catch(error) {
        console.log(error);
    }
}

/* funzione mostra prodotti */
function createPostTemplate(element){
    const card = document.createElement("div");
    card.classList.add("mt-2","col-12","col-sm-6","col-md-4","col-lg-3","col-xl-2");

    const newDiv = document.createElement("div");
    newDiv.classList.add("card");

    /* btn modifica e immagine card */
    const modButton = document.createElement("a");
    modButton.href = `modify.html?product=${element._id}`;
    modButton.classList.add("btn","mod");
    modButton.innerHTML = '<i  class="fa-solid fa-pencil  d-block"></i>';
    const cardImg = document.createElement("img");
    cardImg.src = element.imageUrl;
    cardImg.alt = element.name;
    cardImg.classList.add("card-img-top");

    /* body card */
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText= element.name;
    const cardDesc = document.createElement("p");
    cardDesc.classList.add("card-text");
    cardDesc.innerText = element.description;

    cardBody.append(cardTitle,cardDesc);

    /* lista card */
    const cardList = document.createElement("ul");
    cardList.classList.add("list-group","list-group-flush");
    const liItm1 = document.createElement("il");
    liItm1.classList.add("list-group-item");
    liItm1.innerText = element.brand;
    const liItm2 = document.createElement("il");
    liItm2.classList.add("list-group-item");
    liItm2.innerText = "€ "+ element.price;

    cardList.append(liItm1,liItm2);

    newDiv.append(modButton,cardImg,cardBody,cardList);

    card.appendChild(newDiv);
    cardContainer.appendChild(card);
}

/* funzione aggiungi prodotto */
async function addNewPost() {
    console.log(priceValue);
    if(inputName.value && inputDescription.value && inputBrand.value && inputImage.value && inputPrice.value) {
        const payload = {
            "name": inputName.value,
            "description": inputDescription.value,
            "brand": inputBrand.value,
            "imageUrl": inputImage.value,
            "price": inputPrice.value,
        };
        const createResult = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token,
            },
        });
        AllProduct();
        inputName.value = "";
        inputDescription.value = "";
        inputBrand.value = "";
        inputImage.value = "";
        inputPrice.value = "";
    } else {
        alert("inserisci dati")
    }
}