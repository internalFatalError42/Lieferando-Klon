var _a;
var menus = [
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
];
console.log(menus[0].name);
var createMenuItemText = function (menu) {
    return /*html */ "\n        <div class=\"menu-item-text\">\n            <h3>".concat(menu.name, "</h3>\n            <p>").concat(menu.description.join(', '), "</p>\n            <p class=\"menu-price\">").concat(menu.price, " \u20AC</p>\n        </div>\n    ");
};
var createMenuItemImageSection = function (menu) {
    return /*html */ "\n        <div class=\"menu-item-image-section\">\n            <img class=\"menu-item-image\" src=\"".concat(menu.img, "\" alt=\"").concat(menu.name, "\">\n            <img class=\"add-to-cart small-logo\" id=\"add-to-cart\" src=\"assets/img/plus.svg\" alt=\"Add to cart\" onclick=\"addToCart(").concat(menu.id, ")\">\n        </div>\n    ");
};
var articleTemplate = function (menu) {
    var article = /*html */ "\n        <article class=\"menu-item\" data-index=\"".concat(menu.id, "\">\n            ").concat(createMenuItemText(menu), "\n            ").concat(createMenuItemImageSection(menu), "\n        </article>\n    ");
    return article;
};
window.addToCart = function (id) {
    // console.log('Add to cart', id);
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
};
menus.forEach(function (menu) {
    var menuFavorites = document.getElementById('menu-items-favorites');
    var menuOffers = document.getElementById('menu-items-offers');
    if (!menuFavorites || !menuOffers) {
        throw new Error('Element not found');
    }
    if (menu.favourite) {
        menuFavorites.innerHTML += articleTemplate(menu);
    }
    else {
        menuOffers.innerHTML += articleTemplate(menu);
    }
});
var cartMenuButton = document.getElementById('cart-menu-button');
var cartMenuSection = document.getElementById('cart-section');
if (cartMenuButton && cartMenuSection) {
    cartMenuButton.onclick = function () {
        cartMenuSection === null || cartMenuSection === void 0 ? void 0 : cartMenuSection.classList.toggle('show-header-menu');
        console.log('cartMenuButton', cartMenuButton);
    };
}
var closeCart = function () {
    var _a;
    (_a = document.getElementById('cart-section')) === null || _a === void 0 ? void 0 : _a.classList.remove('show-header-menu');
};
(_a = document.getElementById('cart-header-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeCart);
