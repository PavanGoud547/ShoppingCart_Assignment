const ShoppingCart = require('./src/cart');

(async () => {
    const cart = new ShoppingCart();
    
    try {
        await cart.addProduct('cornflakes', 2);
        await cart.addProduct('weetabix', 1);

        console.log(cart.getCartState());
    } catch (error) {
        console.error(error.message);
    }
})();
