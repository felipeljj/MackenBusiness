import { useState, useEffect } from 'react';
import './PizzaNY.css';

const Icons = {
    Search: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    ),
    Cart: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
    ),
    Plus: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    ),
    Minus: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    ),
    Star: () => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    ),
    Chevrondown: () => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    )
};

const PizzaNY = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Pizzas');
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState(null);

    const categories = ['Pizzas', 'Combos', 'Drinks', 'Desserts'];

    const menuItems = [
        { id: 1, name: "Classic Pepperoni", desc: "Crispy cups of pepperoni, mozzarella, rich tomato sauce on a folded NY crust.", price: 24.99, img: "/images/pepperoni.png", category: "Pizzas", popular: true },
        { id: 2, name: "Margherita Originale", desc: "Fresh basil, fresh mozzarella, San Marzano tomatoes, extra virgin olive oil.", price: 21.99, img: "/images/margherita.png", category: "Pizzas", popular: true },
        { id: 3, name: "Supreme Times Square", desc: "Pepperoni, sausage, mushrooms, bell peppers, onions, and black olives.", price: 28.99, img: "/images/pepperoni.png", category: "Pizzas", popular: false },
        { id: 4, name: "Brooklyn Meat Lovers", desc: "Bacon, pepperoni, Italian sausage, ham, and ground beef.", price: 29.99, img: "/images/pepperoni.png", category: "Pizzas", popular: false },
        { id: 5, name: "White Cheese Pie", desc: "Ricotta, mozzarella, provolone, garlic flakes and oregano (No tomato sauce).", price: 22.99, img: "/images/margherita.png", category: "Pizzas", popular: false },
        { id: 6, name: "Garlic Knots (6 pcs)", desc: "Freshly baked dough tied in a knot, tossed in garlic, butter and herbs.", price: 6.99, img: "/images/margherita.png", category: "Combos", popular: true },
    ];

    const filteredItems = menuItems.filter(item =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
        showToast(`Added ${item.name} to cart!`);
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(i => {
            if (i.id === id) {
                const newQty = i.qty + delta;
                return newQty > 0 ? { ...i, qty: newQty } : null;
            }
            return i;
        }).filter(Boolean));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className="pizza-app">
            {toast && <div className="pizza-toast">{toast}</div>}

            {/* Header section identical to typical delivery apps */}
            <header className="pizza-header">
                <div className="pizza-header-content">
                    <div className="pizza-brand">
                        <h1>Luigi's NY Slices</h1>
                        <span className="pizza-rating"><Icons.Star /> 4.9 (2k+ ratings)</span>
                    </div>

                    <div className="pizza-search-bar">
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder="Search in Luigi's..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="pizza-header-actions">
                        <div className="pizza-delivery-info">
                            <span className="info-label">Deliver to</span>
                            <span className="info-value">Central Park West, NY <Icons.Chevrondown /></span>
                        </div>
                        <button className="pizza-cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
                            <div className="cart-icon-wrapper">
                                <Icons.Cart />
                                {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
                            </div>
                            <span className="cart-total">${cartTotal.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="pizza-main">
                {/* Hero Banner Banner */}
                <div className="pizza-hero">
                    <div className="pizza-hero-overlay">
                        <div className="pizza-hero-text">
                            <h2>Authentic Foldable Slices</h2>
                            <p>Hand-tossed dough, baked fresh daily in entirely charcoal brick ovens.</p>
                            <span className="pizza-delivery-time">15 - 25 min delivery</span>
                        </div>
                    </div>
                </div>

                {/* Categories Navigation */}
                <div className="pizza-categories">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`pizza-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <div className="pizza-menu">
                    <h3 className="category-title">{activeCategory}</h3>

                    {filteredItems.length === 0 ? (
                        <p className="no-items">No items found for this category.</p>
                    ) : (
                        <div className="pizza-grid">
                            {filteredItems.map(item => (
                                <div className="pizza-card" key={item.id}>
                                    <div className="pizza-card-img-wrapper">
                                        <img src={item.img} alt={item.name} className="pizza-card-img" />
                                        {item.popular && <span className="pizza-tag">Popular</span>}
                                    </div>
                                    <div className="pizza-card-content">
                                        <h4>{item.name}</h4>
                                        <p className="pizza-desc">{item.desc}</p>
                                        <div className="pizza-card-footer">
                                            <span className="pizza-price">${item.price.toFixed(2)}</span>
                                            <button className="pizza-add-btn" onClick={() => addToCart(item)}>
                                                <Icons.Plus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Shopping Cart Sidebar */}
            <div className={`pizza-cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h2>Your Order</h2>
                    <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>×</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <Icons.Cart />
                            <p>Your cart is empty.</p>
                            <span>Add some delicious pieces to get started!</span>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <span>${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                                <div className="cart-qty-controls">
                                    <button onClick={() => updateQty(item.id, -1)}><Icons.Minus /></button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)}><Icons.Plus /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>Delivery Fee</span>
                            <span>$2.99</span>
                        </div>
                        <div className="cart-summary-total">
                            <span>Total</span>
                            <span>${(cartTotal + 2.99).toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={() => showToast('Redirecting to checkout...')}>
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            {/* Click-away overlay for cart */}
            {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
        </div>
    );
};

export default PizzaNY;
