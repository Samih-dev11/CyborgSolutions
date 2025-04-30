const products = [
    { id: 1, name: 'NeuroLink+ Neural Interface', code: 'NL-9980-QX', price: 149999, description: 'Advanced brain-computer interface with quantum processing.', imageClass: 'product-image-neurolink', stock: 10, style: { border: 'cyan', badge: 'bg-gradient-to-r from-cyan-500 to-blue-500', hover: 'hover:shadow-cyan-500/50 hover:-translate-y-2' } },
    { id: 2, name: 'OcuTech Prosthetic Visual System', code: 'OT-ULTRA', price: 89999, description: 'Full-spectrum visual system with augmented reality.', imageClass: 'product-image-ocutech', stock: 15, style: { border: 'purple', badge: 'bg-gradient-to-r from-purple-500 to-indigo-500', hover: 'hover:shadow-purple-500/50 hover:-translate-y-2' } },
    { id: 3, name: 'ExoFlex Bionic Arm', code: 'EF-5000-X', price: 12599, description: 'Military-grade prosthetic with enhanced strength.', imageClass: 'product-image-exoflex', stock: 25, style: { border: 'gold', badge: 'bg-gradient-to-r from-yellow-400 to-amber-500', hover: 'hover:shadow-yellow-500/50 hover:-translate-y-2' } },
    { id: 4, name: 'BrainSync Interface', code: 'NS-200', price: 42999, description: 'Entry-level neural connection system.', imageClass: 'product-image-brainsync', stock: 20, style: { border: 'red', badge: 'bg-gradient-to-r from-red-500 to-pink-500', hover: 'hover:shadow-red-500/50 hover:-translate-y-2' } },
    { id: 5, name: 'NeuraTech Implant', code: 'NT-600', price: 65499, description: 'Precision neural pathway enhancer.', imageClass: 'product-image-neuratech', stock: 12, style: { border: 'green', badge: 'bg-gradient-to-r from-green-500 to-teal-500', hover: 'hover:shadow-green-500/50 hover:-translate-y-2' } },
    { id: 6, name: 'Quantum Reflex Module', code: 'QR-7000', price: 78999, description: 'Enhances reaction speed with quantum algorithms.', imageClass: 'product-image-quantumreflex', stock: 8, style: { border: 'blue', badge: 'bg-gradient-to-r from-blue-500 to-indigo-600', hover: 'hover:shadow-blue-500/50 hover:-translate-y-2' } },
    { id: 7, name: 'BioCore Energy Unit', code: 'BC-300', price: 56999, description: 'Self-sustaining energy source for cybernetics.', imageClass: 'product-image-biocore', stock: 18, style: { border: 'pink', badge: 'bg-gradient-to-r from-pink-500 to-rose-500', hover: 'hover:shadow-pink-500/50 hover:-translate-y-2' } },
    { id: 8, name: 'Synapse Overclock Chip', code: 'SO-900', price: 109999, description: 'Boosts cognitive processing beyond human limits.', imageClass: 'product-image-synapse', stock: 5, style: { border: 'amber', badge: 'bg-gradient-to-r from-amber-500 to-orange-500', hover: 'hover:shadow-amber-500/50 hover:-translate-y-2' } },
    { id: 9, name: 'HoloSkin Camouflage', code: 'HS-4000', price: 69999, description: 'Adaptive skin for stealth and aesthetics.', imageClass: 'product-image-holoskin', stock: 10, style: { border: 'teal', badge: 'bg-gradient-to-r from-teal-500 to-cyan-500', hover: 'hover:shadow-teal-500/50 hover:-translate-y-2' } },
];

let cart = [];
let cartTimeout;

function init() {
    renderFeaturedProducts();
    renderAllProducts();
    updateCartCount();
    startCountdown();
    setupQuantumBackground();
    setupCustomCursor();
}

function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('open');
}

function showPage(pageId) {
    document.querySelectorAll('#home, #products, #about, #contact, #profile, #user-profile, #cart').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    document.querySelector('.nav-menu').classList.remove('open');
    if (pageId === 'cart') {
        renderCart();
    }
    if (pageId === 'user-profile' && document.getElementById('user-profile-name').textContent) {
        document.getElementById('vip-badge').classList.remove('hidden');
    }
}

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const featured = products.slice(0, 3);
    container.innerHTML = featured.map(product => `
        <div class="product-card bg-gray-800 p-4 rounded-lg border-2 border-${product.style.border}-500 relative overflow-hidden transition-all duration-300 ${product.style.hover}">
            <span class="absolute top-2 left-2 ${product.style.badge} text-xs px-2 py-1 rounded-full text-black">Elite</span>
            <div class="product-image ${product.imageClass} mb-4"></div>
            <h3 class="text-base sm:text-lg font-bold">${product.name}</h3>
            <p class="text-xs sm:text-sm text-gray-400">${product.code}</p>
            <p class="text-xs sm:text-sm text-gray-400 mb-4">${product.description}</p>
            <p class="text-sm sm:text-base font-bold text-gold-accent mb-4">$${product.price.toLocaleString()}</p>
            <p class="text-xs sm:text-sm text-gray-400 mb-4">Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})" class="exclusive-btn bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-full text-xs sm:text-sm">Add to Vault</button>
        </div>
    `).join('');
}

function renderAllProducts() {
    const container = document.getElementById('all-products');
    container.innerHTML = products.map(product => `
        <div class="product-card bg-gray-800 p-4 rounded-lg border-2 border-${product.style.border}-500 relative overflow-hidden transition-all duration-300 ${product.style.hover}">
            <span class="absolute top-2 left-2 ${product.style.badge} text-xs px-2 py-1 rounded-full text-black">Elite</span>
            <div class="product-image ${product.imageClass} mb-4"></div>
            <h3 class="text-base sm:text-lg font-bold">${product.name}</h3>
            <p class="text-xs sm:text-sm text-gray-400">${product.code}</p>
            <p class="text-xs sm:text-sm text-gray-400 mb-4">${product.description}</p>
            <p class="text-sm sm:text-base font-bold text-gold-accent mb-4">$${product.price.toLocaleString()}</p>
            <p class="text-xs sm:text-sm text-gray-400 mb-4">Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})" class="exclusive-btn bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-full text-xs sm:text-sm">Add to Vault</button>
        </div>
    `).join('');
}

function filterProducts() {
    const searchInput = document.getElementById('search')?.value.toLowerCase() || document.getElementById('mobile-search')?.value.toLowerCase() || '';
    const desktopResults = document.getElementById('search-results');
    const mobileResults = document.getElementById('mobile-search-results');
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput) || 
        product.code.toLowerCase().includes(searchInput) ||
        product.description.toLowerCase().includes(searchInput)
    );

    const renderResults = (container) => {
        container.innerHTML = filteredProducts.length > 0 ? filteredProducts.map(product => `
            <div class="search-result-item">
                <div class="search-result-image ${product.imageClass}"></div>
                <div>
                    <p class="text-sm font-bold text-cyan-400">${product.name}</p>
                    <p class="text-xs text-gray-400">${product.code}</p>
                </div>
            </div>
        `).join('') : '<p class="text-sm text-gray-400 p-2">No products found</p>';
        container.classList.toggle('show', searchInput.length > 0);
    };

    if (desktopResults) renderResults(desktopResults);
    if (mobileResults) renderResults(mobileResults);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        product.stock--;
        updateCartCount();
        renderCart();
        showCartPopup(product);
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('pay-button').classList.toggle('hidden', count === 0);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    container.innerHTML = cart.length > 0 ? cart.map(item => `
        <div class="flex justify-between items-center p-2 bg-gray-800 rounded mb-2">
            <div>
                <p class="text-sm font-bold text-cyan-400">${item.name}</p>
                <p class="text-xs text-gray-400">$${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="exclusive-btn bg-red-600 px-2 py-1 rounded hover:bg-red-700 text-xs">Remove</button>
        </div>
    `).join('') : '<p class="text-sm text-gray-400 text-center">Your vault is empty</p>';
    document.getElementById('cart-item-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-total').textContent = total.toLocaleString();
}

function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity--;
        const product = products.find(p => p.id === productId);
        if (product) product.stock++;
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartCount();
        renderCart();
    }
}

function showCartPopup(product) {
    document.getElementById('popup-product-image').className = `w-full h-24 bg-cover bg-center rounded mb-4 ${product.imageClass}`;
    document.getElementById('popup-product-name').textContent = product.name;
    document.getElementById('popup-product-price').textContent = `$${product.price.toLocaleString()}`;
    document.getElementById('cart-popup').classList.remove('hidden');
    clearTimeout(cartTimeout);
    cartTimeout = setTimeout(() => closeCartPopup(), 3000);
}

function closeCartPopup() {
    document.getElementById('cart-popup').classList.add('hidden');
}

function checkout() {
    alert('Proceeding to secure payment...');
    cart = [];
    products.forEach(product => {
        product.stock = Math.max(0, product.stock);
    });
    updateCartCount();
    renderCart();
    showPage('home');
}

function startCountdown() {
    let time = 24 * 60 * 60;
    setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        document.getElementById('countdown').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time--;
        if (time < 0) time = 24 * 60 * 60;
    }, 1000);
}

function setupQuantumBackground() {
    const bg = document.getElementById('quantum-bg');
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'quantum-bubble';
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.top = `${Math.random() * 100}vh`;
        bubble.style.animationDelay = `${Math.random() * 7}s`;
        bg.appendChild(bubble);
    }
    for (let i = 0; i < 50; i++) {
        const drift = document.createElement('div');
        drift.className = 'micro-drift';
        drift.style.left = `${Math.random() * 100}vw`;
        drift.style.top = `${Math.random() * 100}vh`;
        drift.style.animationDelay = `${Math.random() * 20}s`;
        bg.appendChild(drift);
    }
}

function setupCustomCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = document.getElementById('custom-cursor');
    const particles = [
        document.getElementById('cursor-particle-1'),
        document.getElementById('cursor-particle-2'),
        document.getElementById('cursor-particle-3')
    ];
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        particles.forEach((p, i) => {
            p.style.left = `${e.clientX}px`;
            p.style.top = `${e.clientY}px`;
            p.style.transform = `translate(${(i - 1) * 5}px, ${(i - 1) * 5}px)`;
            p.style.opacity = 1;
            setTimeout(() => p.style.opacity = 0, 300);
        });
    });
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, input, textarea')) {
            cursor.classList.add('hovered');
        } else {
            cursor.classList.remove('hovered');
        }
    });
}

function toggleChat() {
    document.querySelector('.chat-widget').classList.toggle('open');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    if (input.value.trim()) {
        const messages = document.getElementById('chat-messages');
        messages.innerHTML += `
            <div class="chat-message bg-purple-600 p-2 rounded text-white text-sm mb-2 ml-auto">${input.value}</div>
        `;
        messages.scrollTop = messages.scrollHeight;
        setTimeout(() => {
            messages.innerHTML += `
                <div class="chat-message bg-gray-700 p-2 rounded text-white text-sm mb-2 mr-auto">Thank you for your message! Our elite support team will respond shortly.</div>
            `;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        input.value = '';
    }
}

function submitContact() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    if (name && email && subject && message) {
        alert('Inquiry submitted successfully!');
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-subject').value = '';
        document.getElementById('contact-message').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;
    const address = document.getElementById('profile-address').value;
    if (name && email && phone && address) {
        document.getElementById('user-profile-name').textContent = name;
        document.getElementById('user-profile-email').textContent = email;
        document.getElementById('user-profile-phone').textContent = phone;
        document.getElementById('user-profile-address').textContent = address;
        document.getElementById('user-profile-link').classList.remove('hidden');
        alert('Profile saved successfully!');
        showPage('user-profile');
    } else {
        alert('Please fill out all fields.');
    }
}

window.onload = init;