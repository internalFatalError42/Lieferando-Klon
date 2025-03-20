const menus = [
    {
        id: 1,
        name: 'Pizza Margherita',
        price: 10.5,
        description: [
            'Tomatensauce',
            'Mozzarella',
            'Basilikum'
        ],
        img: 'assets/img/menus/pizza-margherita.jpg',
        favourite: true
    },
    {
        id: 2,
        name: 'Pizza Salami',
        price: 12.5,
        description: [
            'Tomatensauce',
            'Mozzarella',
            'Salami'
        ],
        img: 'assets/img/menus/pizza-salami.jpg',
        favourite: true
    },
    {
        id: 3,
        name: 'Spaghetti Carbonara',
        price: 9.5,
        description: [
            'Spaghetti',
            'Ei',
            'Speck',
            'Parmesan'
        ],
        img: 'assets/img/menus/spaghetti-carbonara.jpg',
        favourite: true
    },
    {
        id: 4,
        name: 'Chicken Hamburger',
        price: 8.5,
        description: [
            'Hamburgerbrötchen',
            'Hähnchenbrust',
            'Tomate',
            'Salat',
            'Mayonnaise'
        ],
        img: 'assets/img/menus/chicken-hamburger.jpg',
        favourite: false
    },
    {
        id: 5,
        name: 'Schnitzel mit Pommes',
        price: 11.5,
        description: [
            'Schweineschnitzel',
            'Pommes Frites',
            'Zitrone'
        ],
        img: 'assets/img/menus/schnitzel.jpg',
        favourite: false
    },
    {
        id: 6,
        name: 'Griechischer Salat',
        price: 7.5,
        description: [
            'Tomate',
            'Gurke',
            'Feta',
            'Oliven',
            'Peperoni'
        ],
        img: 'assets/img/menus/greek-salad.jpg',
        favourite: false
    }
],
      getCart = () => JSON.parse(localStorage.getItem('cart') || '[]'),
      saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const createMenuItemText = (menu) => {
    return /*html */`
        <div class="menu-item-text">
            <h3>${menu.name}</h3>
            <p>mit ${menu.description.join(', ')}</p>
            <p class="menu-price">
                ${menu.price.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                })}
            </p>
        </div>
    `;
};

const createMenuItemImageSection = (menu) => {
    return /*html */`
        <div class="menu-item-image-section">
            <img class="menu-item-image" src="${menu.img}" alt="${menu.name}">
            <img class="add-to-cart small-logo" id="add-to-cart" src="assets/img/plus.svg" alt="Add to cart">
        </div>
    `;
};

const articleTemplate = (menu) => {
    return /*html */`
        <article class="menu-item" data-index="${menu.id}" onclick="openMenuPopup(${menu.id})">
            ${createMenuItemText(menu)}
            ${createMenuItemImageSection(menu)}
        </article>
    `;
};

const openMenuPopup = (id) => {
    let menuPopup = document.getElementById('menu-popup'),
        menuPopupDescriptionText = document.getElementById('menu-popup-description');
    if (!menuPopup) {
        throw new Error('Element not found');
    }
    menuPopupDescriptionText.innerHTML = /*html */`
        <div class="menu-popup-header">
            <img class="menu-popup-close" id="menu-popup-close" src="assets/img/xmark.svg" alt="Close" onclick="closePopup()">
            <img class="menu-popup-image" src="${menus[id - 1].img}" alt="Pizza Margherita">
        </div>
        <div class="menu-popup-description-text" id="menu-popup-description-text">
            <h3>${menus[id - 1].name}</h3>
            <p class="menu-price">
                ${menus[id - 1].price.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                })}
            </p>
            <p>mit ${menus[id - 1].description.join(', ')}</p>
        </div>
        <footer class="menu-popup-footer">
            <div class="menu-popup-quantity">
                <img class="decrease-quantity small-logo" src="assets/img/minus.svg" alt="decrease the quantity" onclick="decreaseMenuQuantity(${id - 1})">
                <p class="quantity" id="quantity">1</p>
                <img class="increase-quantity small-logo" src="assets/img/plus.svg" alt="increase the quantity" onclick="increaseMenuQuantity(${id - 1})">
            </div>
            <div class="total-price" id="total-price" onclick="addToCart(${id})">${menus[id - 1].price.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                })}
            </div>
        </footer>
    `;

    menuPopup.style.display = 'flex';
}

menus.forEach(menu => {
    let menuFavorites = document.getElementById('menu-items-favorites'),
        menuOffers = document.getElementById('menu-items-offers');

    if (!menuFavorites || !menuOffers) {
        throw new Error('Element not found');
    }

    if (menu.favourite) {
        menuFavorites.innerHTML += articleTemplate(menu);
    } else {
        menuOffers.innerHTML += articleTemplate(menu);
    }
});

const decreaseMenuQuantity = (id) => {
    let quantity = document.getElementById('quantity'),
        totalPrice = document.getElementById('total-price'),
        newQuantity = parseInt(quantity.innerText) - 1;

    if (newQuantity < 1) {
        return;
    }

    quantity.innerText = newQuantity;
    totalPrice.innerText = (newQuantity * menus[id].price).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
};

const increaseMenuQuantity = (id) => {
    let quantity = document.getElementById('quantity'),
        totalPrice = document.getElementById('total-price'),
        newQuantity = parseInt(quantity.innerText) + 1;

    quantity.innerText = newQuantity;
    totalPrice.innerText = (newQuantity * menus[id].price).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });;
}

const decreaseCardItemQuantity = (id = null) => {
    let cart = getCart(),
        item = cart.find(item => item.id === id),
        itemAmount = document.getElementById(`cart-item-amount-${id}`);

    if (item) {
        item.amount -= 1;
        if (item.amount === 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }

    cart = cart.filter(item => item.amount !== 0);
    saveCart(cart);
    loadCart();
};

const increaseCardItemQuantity = (id) => {
    let cart = getCart(),
        item = cart.find(item => item.id === id),
        cartItemPrice = document.getElementById('cart-item-price'),
        itemAmount = document.getElementById(`cart-item-amount-${id}`);

    if (item) {
        item.amount += 1;
    } else {
        cart.push({id: id, amount: 1});
    }

    saveCart(cart);
    loadCart();
};

const addToCart = (id) => {
    let cart = getCart(),
    item = cart.find(item => item.id === id),
    quantity = +document.getElementById('quantity')?.innerText,
    itemAmount = document.getElementById(`cart-item-amount-${id}`);

    if (item) {
        item.amount += quantity;
    }
    else {
        cart.push({id: id, amount: parseInt(quantity)});
    }
    saveCart(cart);
    loadCart();
    closePopup();
};
// need this???
// const addToCart = (id) => {
//     increaseCardItemQuantity(id);
// };

// window.addToCart = (id) => {
//     // console.log('Add to cart', id);
//     let cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     cart.push({id: id, amount: 1});
//     localStorage.setItem('cart', JSON.stringify(cart));
//     increaseCardItemQuantity(id);
// };

const cartMenuButton = document.getElementById('cart-menu-button'),
    cartMenuSection = document.getElementById('cart-section');

if (cartMenuButton && cartMenuSection) {
    cartMenuButton.onclick = function () {
        cartMenuSection?.classList.toggle('show-header-menu');
        console.log('cartMenuButton', cartMenuButton);
    };
}

const closeCart = () => {
    document.getElementById('cart-section').style.display = 'none';
};

document.getElementById('cart-header-close')?.addEventListener('click', closeCart);

const loadCart = () => {
    let cart = getCart(),
        cartItems = document.getElementById('cart-items');

    cartItems.innerHTML = '';

    cartItems.innerHTML = cart.map(item => createCartItem(item.id, item.amount)).join('');
};

const createCartItem = (id, amount) => {
    let menu = menus[id - 1];
    return /*html */`
        <article class="cart-item" data-index="${menu.id}">
            <div class="cart-item-menu">
                <p>${menu.name}</p>
                <p class="">mit ${menu.description.join(', ')}</p>
            </div>
            <div class="cart-item-price-quantity">
                <p id="cart-item-price-${menu.id}">
                    ${(menu.price * amount).toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                    })}
                </p>
                <div class="cart-item-quantity">
                    <img class="substract-from-cart-item small-logo" src="assets/img/minus.svg" alt="Substract from cart" onclick="decreaseCardItemQuantity(${menu.id})">
                    <p id="cart-item-amount-${menu.id}">${amount}</p>
                    <img class="add-to-cart-item small-logo" src="assets/img/plus.svg" alt="Add to cart" onclick="increaseCardItemQuantity(${menu.id})">
                </div>
            </div>
        </article>
    `;
}

const closePopup = () => {
    document.getElementById('menu-popup').style.display = 'none';
};
