//array, conterrà i prodotti in preordine; ogni prodotto è un oggetto
let TOTAL_SHOPPING = [
    // { struttura oggetto
    //     productName: "VHoney",
    //     price: 7,
    //     quantity: 0,
    //     itemNumber: 0,
    // }
];
let NUMBER_OF_ITEMS = 0; //ELEMENTI SINGOLI, POI POSSONO ESSERE IN QUANTITA'
function showNavImg(e) {
    e.querySelector('img').style.display = "block";
}
function hideNavImg(e) {
    e.querySelector('img').style.display = "none";
}

// vale sia per sidebar che per riepilogo ordine
function assegnaClasse(qualeSide) {
    setBuyBtn();

    console.log("start:" + qualeSide);
    let e = document.getElementById(qualeSide).classList;

    //assegno onclick all'overlay in base a quale sidebar lo attiva
    const overlay = document.getElementById('sfondo');
    overlay.setAttribute('onclick', 'assegnaClasse("' + qualeSide + '")');

    console.log(overlay.outerHTML);

    if (e.contains("displaySee")) { //sidebar presente
        e.remove("displaySee"); //tolgo sidebar
        e.add("displayHide"); //smooth out
        document.getElementById("sfondo").style.display = "none"; //tolgo overlay
    }
    else { //sidebar da far uscire overlay da mettere
        e.remove("displayHide");
        e.add("displaySee");
        document.getElementById("sfondo").style.display = "flex";
    }
}

function addToCart() {
    setBuyBtn();
   
    const product = TOTAL_SHOPPING.find(p => p.productName === 'VHoney');
    console.log("[addToCart]: " + typeof product);
    if (typeof product === 'undefined') {//nessun ordine per quell'articolo
        addBigItem(); //creo elemento della lista
        let toAppend = {
            productName: "VHoney",
            price: 7,
            quantity: 1,
            itemNumber: TOTAL_SHOPPING.length, //(!!!!!!!!!!!!!!!)
        };
        TOTAL_SHOPPING.push(toAppend);
        for (let i = 0; i < TOTAL_SHOPPING.length; i++)
        console.log(TOTAL_SHOPPING[i]);        
    }else { //devo ~solo incrementare il contatore
        product.quantity++; //incremento nell'array
        console.log("[addToCart]: quantità nuova: " + product.quantity);
        let item = document.getElementById("prod_"+product.itemNumber)
    
        item.querySelector('.qty').innerText = product.quantity;
    }

    updateTotal();  
}

//crea elemento lista 
function addBigItem() {
    let shoppingList = document.getElementById("orderList");
    const listItem = document.createElement('li');
    listItem.classList.add('orderItem');
    listItem.setAttribute('id', 'prod_' + TOTAL_SHOPPING.length);
    //creo span con classe prodName e lo appendo a listItem
    const productName = document.createElement('span');
    productName.classList.add('prodName');
    productName.innerHTML = "VHoney,<br> €<span class='itemPrice'> 7</span>";
    listItem.appendChild(productName);
    
    //creo il secondo child di listItem
    const counterCont = document.createElement('span');
    counterCont.classList.add('counterContainer');
        //creo il contenuto di counterContainer e glielo appendo
        //-
        const rBtn = document.createElement('button');
        rBtn.classList.add("counterBtn");
        rBtn.setAttribute('onclick', 'removeItem(this)');
        rBtn.innerText = "-"
        counterCont.appendChild(rBtn); 
        //val
        const qty = document.createElement('span');
        qty.classList.add('qty');
        qty.innerText = 1; //(!!!!!!)
        counterCont.appendChild(qty); 
        //+
        const aBtn = document.createElement('button');
        aBtn.classList.add('counterBtn'); 
        aBtn.setAttribute('onclick', 'addItem(this)');
        aBtn.innerText = "+";
        counterCont.appendChild(aBtn); 
    //aggiungo counterCont a listItem
    listItem.appendChild(counterCont);
    shoppingList.appendChild(listItem);
    NUMBER_OF_ITEMS++;
    console.log("[addBigItem]: numberofItems: " + NUMBER_OF_ITEMS);
}

function updateTotal() {
    const product = TOTAL_SHOPPING.find(p => p.productName === 'VHoney');

    console.log("updating total");
    let partial = 0;
    let itemPrices = document.querySelectorAll('.itemPrice');
    console.log("UL length: " + itemPrices.length);

    for (let i = 0; i < itemPrices.length; i++) {
        console.log(itemPrices[i].textContent);
        //parsefloat altrimenti prende textcontent come stringa
        partial += parseFloat(itemPrices[i].textContent) * product.quantity;
    }
    console.log("new total: " + partial);
    document.getElementById("totalCost").textContent = partial;

}

function setBuyBtn() {
    console.log("[setBuyBtn]: number of items:" + NUMBER_OF_ITEMS);
    let btn = document.getElementById("buy");
    if (NUMBER_OF_ITEMS > 0) {
        btn.removeAttribute("disabled");
        btn.classList.remove("disabledBtn");
    } else {
        btn.setAttribute("disabled", "true");
        btn.classList.add("disabledBtn");
    }
}

function removeItem(item) {
    let product = TOTAL_SHOPPING.find(p => p.productName === 'VHoney');
    console.log(product);
    //decremento prima
    product.quantity -= 1;
    console.log("[remove]: product quantity just mod: " + product.quantity);

    if (product.quantity <= 0) { //btn disabilitato
        item.classList.add("disabledBtn");
        product.quantity = 0;
        item.nextElementSibling.textContent = product.quantity;
        NUMBER_OF_ITEMS--;
        setBuyBtn();
        return;
    }
    console.log("[remove]: product quantity: " + product.quantity);
    item.nextElementSibling = product.quantity;
    item.classList.remove("disabledBtn");
    item.nextElementSibling.textContent = parseInt(item.nextElementSibling.textContent) - 1;
    
    updateTotal();
}


function addItem(item) {
    
    //cerco l'elemento nell'array
    let product = TOTAL_SHOPPING.find(p => p.productName === 'VHoney');
    
    if(NUMBER_OF_ITEMS==0) {
        NUMBER_OF_ITEMS++;
        setBuyBtn();
    }
    //incremento nell'array
    product.quantity += 1;

    if (product.quantity > 0) {
        item.previousElementSibling.previousElementSibling.classList.remove("disabledBtn");
    }
    //cambio il valore a schermo

    item.previousElementSibling.textContent = product.quantity;
    updateTotal();
    
}

