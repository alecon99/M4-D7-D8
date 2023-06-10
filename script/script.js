/* api e token per chiamata ajax */
const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjA0MmI5YzBmNzAwMTQ0ODRmOTMiLCJpYXQiOjE2ODYwNjkzMTUsImV4cCI6MTY4NzI3ODkxNX0.hwiNNYbHLmCRZWW5ChRTyOERSFCe6N1kx-w6XiB3OGw";

/* elementi dom */
const cardContainer = document.getElementById("card-container");
const singInBtn = document.getElementById("sing-in-button");
const inputEmail = document.getElementById("Input-Email");
const inputPass = document.getElementById("Input-Password");
const singInAlert = document.getElementById("alert-sing-in");

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
    card.classList.add("mt-3","col-12","col-sm-6","col-md-4","col-lg-3","col-xl-2");

    const newDiv = document.createElement("div");
    newDiv.classList.add("card");

    /* btn modifica e immagine card */
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
    liItm2.innerText = "€ " + element.price;

    cardList.append(liItm1,liItm2);

    /* btn info card */
    const infButton = document.createElement("a");
    infButton.classList.add("d-block","inf","text-center");
    infButton.href = `detail.html?product=${element._id}`;
    infButton.innerHTML = '<i class="fa-solid fa-circle-info"></i>';

    newDiv.append(cardImg,cardBody,cardList,infButton);

    card.appendChild(newDiv);
    cardContainer.appendChild(card);
}

/* codice per accesso area modifiche */
singInBtn.addEventListener("click", ()=>{
    if ((inputEmail.value === "epicode")&&(inputPass.value === "1234")){
        console.log("si");
        openAddCard()
        inputEmail.value = "";
        inputPass.value = "";
    } else {
        singInAlert.classList.remove("d-none");
        setTimeout(()=>{
            singInAlert.classList.add("d-none");
        }, 4000);
    }
})

function openAddCard(){
    window.open("/index/addCard.html","_self")
}

