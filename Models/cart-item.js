//this sis model file for our cart Item to show how it should looks

class CartItem {
    constructor(quantity, productPrice, productTitle, sum) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = sum;
    }

}

export default CartItem;