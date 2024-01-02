document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.box .btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.querySelector('.icons .fa-shopping-cart');
    const checkoutFormContainer = document.getElementById('checkout-form');
    const cartButton = document.getElementById('cart-button');
    
    cartButton.addEventListener('click', toggleCart);

    const cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    cartIcon.addEventListener('click', toggleCart);

    function addToCart(event) {
        event.preventDefault();
    
        const button = event.target;
        const box = button.closest('.box');
        const item = {
            name: box.querySelector('h3').textContent,
            price: parseFloat(box.querySelector('span').textContent.replace('$', '')),
        };
    
        cart.push(item);
        updateCart();
    }
    
    function toggleCart() {
        cartContainer.classList.toggle('hidden');
    }
    
    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
    
        cartItemsContainer.innerHTML = '';
    
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', (event) => removeFromCart(event, index));

            cartItemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(cartItemElement);
        });
    
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        cartTotalElement.textContent = total.toFixed(2);
    }

    function removeFromCart(event, index) {
        event.stopPropagation();
        cart.splice(index, 1);
        updateCart();
    }

    checkoutBtn.addEventListener('click', showCheckoutForm);

    function showCheckoutForm() {
        checkoutFormContainer.classList.remove('hidden');
    }

    const submitOrderBtn = document.getElementById('submit-order-btn');
    submitOrderBtn.addEventListener('click', submitOrder);

    function submitOrder() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment').value;

        if (!name || !address || !payment) {
            alert('Please fill out all fields.');
            return;
        }

        alert(`Order placed! Thank you, ${name}! as soon as we receive the payment through swish, we'll confirm the order and send it out`);
        cart.length = 0;
        updateCart();
        toggleCart();
        checkoutFormContainer.classList.add('hidden');
    }
});
