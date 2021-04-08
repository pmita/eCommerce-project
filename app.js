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
    '[0'
}

//local storage class
class Storage{

}

/*--------------Event Listeners----------*/
document.addEventListener('DOMContentLoaded', ()=>{
    const ui = new UI();
    const products = new Products();

    //Get all products
    products.getProducts()
     .then( (data) =>{console.log(data);});
});