const { fetchProductPrice } = require('./priceService');

class ShoppingCart {
    constructor() {
        this.cart = {};
        this.taxRate = 0.125; // 12.5% tax
    }

    async addProduct(productName, quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be at least 1');
        }

        try {
            const price = await fetchProductPrice(productName);

            if (this.cart[productName]) {
                this.cart[productName].quantity += quantity;
            } else {
                this.cart[productName] = { quantity, price };
            }
        } catch (error) {
            throw new Error(`Error fetching price for ${productName}`);
        }
    }
    getCartState() {
        let subtotal = 0;

        for (const product in this.cart) {
            subtotal += this.cart[product].quantity * this.cart[product].price;
        }

        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;

        return {
            items: this.cart,
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };
    }
}

module.exports = ShoppingCart;
