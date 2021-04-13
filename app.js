//Global variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDom = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDom = document.querySelector('.products-center');


let cart = []; //cart is where all our items are saved
let buttonsDOM = [];

//Getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            //let's desctructure the json object
            products = products.map( item =>{
                const {title, price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title, price, id, image};
            });
            return products;
        } catch(error){
            console.log(error);
        }
        
    }

}

//UI -display products
class UI{
    displayProducts(products){
        let result = '';
        //Generate all products from json object
        products.forEach(product => {
            result +=  `
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product" class="product-img"/>
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        Add to bag
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
            `;

            productsDom.innerHTML = result;
        });
    }

    getBagButtons(){
        const buttons = [...document.querySelectorAll('.bag-btn')]; //Grab all product Add to bag buttons
        buttonsDOM = buttons;
        console.log(buttons);
        buttons.forEach( button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item=> { item.id === id});
            if(inCart){
                button.innerText = 'In Cart';
                button.disabled = true;
            } 

            button.addEventListener('click', (event)=>{
                    console.log(event.target);
                    event.target.innerText = 'In Cart';
                    event.target.disabled = true;

                    //Later get product from products based on the id of the button
                    let cartItem = {...Storage.getProduct(id),
                    amount: 1};
                    //add product to cart
                    cart = [...cart, cartItem];
                    //save cart to local storage
                    Storage.saveCart(cart);
                    //set cart values
                    this.setCartValues(cart);
                    //display cart item
                    //show the cart
                });
        });
    }

    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0; 
        cart.map(item=>{
            tempTotal +=item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = tempTotal;
        cartItems.innerText = itemsTotal;

        console.log(cartTotal, cartItems);

        //Bug that needs fixing
    }
}

//local storage class
class Storage{
    /*
        Static methods are called directly on the class 
        without creating an instance/object of the class. 
    */
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products)); //Create products object on local storage
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product=> {product.id === id})
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

/*--------------Event Listeners----------*/
document.addEventListener('DOMContentLoaded', ()=>{
    const ui = new UI();
    const products = new Products();

    //Get all products
    products.getProducts()
     .then( (products) =>{
         ui.displayProducts(products);
         Storage.saveProducts(products);
    })
     .then( ()=>{
         ui.getBagButtons();
     });
});