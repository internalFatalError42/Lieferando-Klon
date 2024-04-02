type MenuItem = {
    id: number;
    name: string;
    price: number;
    description: string[];
    img: string;
    favourite: boolean;
};

const menus: MenuItem[] = [
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

const createMenuItemText = (menu: MenuItem): string => {
    return /*html */`
        <div class="menu-item-text">
            <h3>${menu.name}</h3>
            <p>${menu.description.join(', ')}</p>
            <p class="menu-price">${menu.price} €</p>
        </div>
    `;
};

const createMenuItemImageSection = (menu: MenuItem): string => {
    return /*html */`
        <div class="menu-item-image-section">
            <img class="menu-item-image" src="${menu.img}" alt="${menu.name}">
            <img class="add-to-cart small-logo" id="add-to-cart" src="assets/img/plus.svg" alt="Add to cart" onclick="addToCart(${menu.id})">
        </div>
    `;
};

const articleTemplate = function (menu: MenuItem): string {
    let article : string = /*html */`
        <article class="menu-item" data-index="${menu.id}">
            ${createMenuItemText(menu)}
            ${createMenuItemImageSection(menu)}
        </article>
    `;

    return article;
};

(window as any).addToCart = function (id: number) {
    // console.log('Add to cart', id);
    let cart: number[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
};

menus.forEach(menu => {
    let menuFavorites = document.getElementById('menu-items-favorites');
    let menuOffers = document.getElementById('menu-items-offers');
    
    if (!menuFavorites || !menuOffers) {
        throw new Error('Element not found');
    }
    
    if (menu.favourite) {
        menuFavorites.innerHTML += articleTemplate(menu);
    } else {
        menuOffers.innerHTML += articleTemplate(menu);
    }
});

let cartMenuButton = document.getElementById('cart-menu-button');
let cartMenuSection = document.getElementById('cart-section');

if (cartMenuButton && cartMenuSection) {
    cartMenuButton.onclick = function () {
        cartMenuSection?.classList.toggle('show-header-menu');
        console.log('cartMenuButton', cartMenuButton);
    };
}

const closeCart = () => {
    document.getElementById('cart-section')?.classList.remove('show-header-menu');
};

document.getElementById('cart-header-close')?.addEventListener('click', closeCart);