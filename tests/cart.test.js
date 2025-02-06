const ShoppingCart = require('../src/cart');
const { fetchProductPrice } = require('../src/priceService');

jest.mock('../src/priceService');

describe('ShoppingCart', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
        fetchProductPrice.mockClear();
    });

    test('should fetch product price and add product to cart', async () => {
        fetchProductPrice.mockResolvedValue(2.52);

        await cart.addProduct('cornflakes', 2);

        expect(cart.cart.cornflakes.quantity).toBe(2);
        expect(cart.cart.cornflakes.price).toBe(2.52);
    });

    test('should calculate subtotal, tax, and total correctly', async () => {
        fetchProductPrice.mockResolvedValueOnce(2.52);
        fetchProductPrice.mockResolvedValueOnce(9.98);

        await cart.addProduct('cornflakes', 2);
        await cart.addProduct('weetabix', 1);

        const cartState = cart.getCartState();
        expect(cartState.subtotal).toBe(15.02);
        expect(cartState.tax).toBe(1.88);
        expect(cartState.total).toBe(16.90);
    });

    test('should throw an error when fetching price fails', async () => {
        fetchProductPrice.mockRejectedValue(new Error('Price API error'));

        
        await expect(cart.addProduct('invalidProduct', 1)).rejects.toThrow('Error fetching price for invalidProduct');

    });

    test('should throw an error if quantity is zero or negative', async () => {
        await expect(cart.addProduct('cornflakes', 0)).rejects.toThrow('Quantity must be at least 1');
    });
});
