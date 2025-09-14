    // Variables globales
    let currentCategory = 'todos';
    let cart = [];
    let allProducts = [];

    // Inicializar la aplicación
    document.addEventListener('DOMContentLoaded', function () {
      initializeApp();
    });

    function initializeApp() {
      loadAllProducts();
      renderCategories();
      renderProducts();
      renderCart();
      setupEventListeners();
      applyPreselectionFromURL();   // ⬅️ NUEVO: intenta preseleccionar por ?producto=CODIGO
    }
    // Preselección desde la URL: ?producto=CODIGO


    function loadAllProducts() {
      allProducts = [];
      Object.keys(productDatabase.categorias).forEach(categoryKey => {
        const category = productDatabase.categorias[categoryKey];
        category.productos.forEach(product => {
          allProducts.push({
            ...product,
            categoria: categoryKey,
            categoriaNombre: category.nombre
          });
        });
      });
    }

    function renderCategories() {
      const categoriesList = document.getElementById('categoriesList');

      categoriesList.innerHTML = `
                <div class="category-item ${currentCategory === 'todos' ? 'active' : ''}" 
                     onclick="selectCategory('todos')">
                    <div class="category-icon">
                        <i class="fas fa-th-large" style="color: var(--pms-blue);"></i>
                    </div>
                    <div class="category-info">
                        <h3>Todos los Productos</h3>
                        <p>${allProducts.length} productos</p>
                    </div>
                </div>
            `;

      Object.keys(productDatabase.categorias).forEach(categoryKey => {
        const category = productDatabase.categorias[categoryKey];
        const productCount = category.productos.length;

        categoriesList.innerHTML += `
                    <div class="category-item ${currentCategory === categoryKey ? 'active' : ''}" 
                         onclick="selectCategory('${categoryKey}')">
                        <div class="category-icon">
                            <i class="${category.icon}" style="color: var(--pms-green);"></i>
                        </div>
                        <div class="category-info">
                            <h3>${category.nombre}</h3>
                            <p>${productCount} productos</p>
                        </div>
                    </div>
                `;
      });
    }

    function selectCategory(categoryKey) {
      currentCategory = categoryKey;
      renderCategories();
      renderProducts();

      const categoryTitle = document.getElementById('categoryTitle');
      if (categoryKey === 'todos') {
        categoryTitle.textContent = 'Todos los Productos';
      } else {
        categoryTitle.textContent = productDatabase.categorias[categoryKey].nombre;
      }
    }

    function renderProducts() {
      const productsGrid = document.getElementById('productsGrid');
      let productsToShow = [];

      if (currentCategory === 'todos') {
        productsToShow = allProducts;
      } else {
        productsToShow = productDatabase.categorias[currentCategory].productos.map(product => ({
          ...product,
          categoria: currentCategory,
          categoriaNombre: productDatabase.categorias[currentCategory].nombre
        }));
      }

      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      if (searchTerm) {
        productsToShow = productsToShow.filter(product =>
          product.nombre.toLowerCase().includes(searchTerm) ||
          product.codigo.toLowerCase().includes(searchTerm)
        );
      }

      productsGrid.innerHTML = '';

      if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--pms-gray);">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h3>No se encontraron productos</h3>
                        <p>Intenta con otros términos de búsqueda</p>
                    </div>
                `;
        return;
      }

      productsToShow.forEach(product => {
        const stockInfo = getStockInfo(product);
        const imageUrl = `imagenes/${product.imagen}`;

        productsGrid.innerHTML += `
                    <div class="product-card" id="prod-${product.codigo}" data-code="${product.codigo}">
                        <div class="product-image" onclick="openImagePopup('${imageUrl}', '${product.nombre}')">
                        <div class="image-zoom-overlay">
                            <i class="fas fa-search-plus"></i>
                        </div>
                            <img src="${imageUrl}" alt="${product.nombre}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                 onload="this.nextElementSibling.style.display='none';">
                            <div class="placeholder-icon" style="display: none;">
                                <i class="fas fa-image"></i>
                            </div>
                        </div>
                        <div class="product-code">Código: ${product.codigo}</div>
                        <h3>${product.nombre}</h3>
                        <div class="product-stock ${stockInfo.class}">${stockInfo.text}</div>
                        <div class="product-price">₲ ${formatPrice(product.precio)}</div>
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" value="1" min="1" max="999" 
                                       class="quantity-input" id="qty-${product.id}">
                                <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})" 
                                    ${stockInfo.disabled ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                `;
      });
    }

    function getStockInfo(product) {
      if (product.stock === null) {
        return { text: 'Consultar disponibilidad', class: '', disabled: false };
      }
      if (product.stock === 0) {
        return { text: 'Sin stock', class: 'low', disabled: true };
      }
      if (product.stock < 10) {
        return { text: `Stock bajo: ${product.stock} unidades`, class: 'low', disabled: false };
      }
      return { text: `Stock: ${product.stock} unidades`, class: '', disabled: false };
    }

    function formatPrice(price) {
      return price.toLocaleString('es-PY');
    }

    function changeQuantity(productId, change) {
      const qtyInput = document.getElementById(`qty-${productId}`);
      let currentQty = parseInt(qtyInput.value) || 1;
      let newQty = currentQty + change;

      if (newQty < 1) newQty = 1;
      if (newQty > 999) newQty = 999;

      qtyInput.value = newQty;
    }

    function addToCart(productId) {
      const product = findProductById(productId);
      const qtyInput = document.getElementById(`qty-${productId}`);
      const quantity = parseInt(qtyInput.value) || 1;

      if (!product) return;

      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.cantidad += quantity;
      } else {
        cart.push({
          ...product,
          cantidad: quantity
        });
      }

      qtyInput.value = 1;
      renderCart();
      updateCartCounter();
      showNotification(`${product.nombre} agregado al carrito`);
    }

    function findProductById(productId) {
      return allProducts.find(product => product.id === productId);
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      renderCart();
      updateCartCounter();
    }

    function updateCartQuantity(productId, newQuantity) {
      const item = cart.find(item => item.id === productId);
      if (item) {
        if (newQuantity <= 0) {
          removeFromCart(productId);
        } else {
          item.cantidad = newQuantity;
          renderCart();
          updateCartCounter();
        }
      }
    }

    function renderCart() {
      const cartContent = document.getElementById('cartContent');

      if (cart.length === 0) {
        cartContent.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Tu carrito está vacío</p>
                        <small>Agrega productos para comenzar tu pedido</small>
                    </div>
                `;
        return;
      }

      let cartHTML = '<div class="cart-items">';
      let total = 0;

      cart.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        cartHTML += `
                    <div class="cart-item">
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-times"></i>
                        </button>
                        <h4>${item.nombre}</h4>
                        <div class="cart-item-details">
                            <span class="cart-item-price">₲ ${formatPrice(item.precio)}</span>
                            <span class="cart-item-quantity">x${item.cantidad}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <button onclick="updateCartQuantity(${item.id}, ${item.cantidad - 1})" 
                                        style="background: var(--pms-light); border: none; border-radius: 3px; width: 25px; height: 25px; cursor: pointer;">
                                    <i class="fas fa-minus" style="font-size: 0.7rem;"></i>
                                </button>
                                <span style="min-width: 30px; text-align: center;">${item.cantidad}</span>
                                <button onclick="updateCartQuantity(${item.id}, ${item.cantidad + 1})" 
                                        style="background: var(--pms-light); border: none; border-radius: 3px; width: 25px; height: 25px; cursor: pointer;">
                                    <i class="fas fa-plus" style="font-size: 0.7rem;"></i>
                                </button>
                            </div>
                            <strong style="color: var(--pms-blue);">₲ ${formatPrice(subtotal)}</strong>
                        </div>
                    </div>
                `;
      });

      cartHTML += '</div>';
      cartHTML += `
                <div class="cart-summary">
                    <div class="cart-total">
                        Total: ₲ ${formatPrice(total)}
                    </div>
                    <button class="checkout-btn" onclick="openCustomerForm()">
                        <i class="fab fa-whatsapp"></i> Enviar Pedido por WhatsApp
                    </button>
                </div>
            `;

      cartContent.innerHTML = cartHTML;
    }

    function updateCartCounter() {
      const cartCount = document.getElementById('cartCount');
      const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    function applyPreselectionFromURL() {
      const params = new URLSearchParams(window.location.search);
      const cod = (params.get('producto') || '').trim();
      if (!cod) return;

      // 1) Ubicar el producto en la data
      const p = allProducts.find(x => (x.codigo + '').toLowerCase() === cod.toLowerCase());
      if (!p) return;

      // 2) Cambiar a su categoría y renderizar
      currentCategory = p.categoria;     // <- ajustá el nombre del campo según tu data
      renderCategories();
      renderProducts();

      // 3) Scroll y highlight a la tarjeta, sin tocar el buscador
      requestAnimationFrame(() => {
        // buscar por id o data-code
        const selector = `#prod-${CSS.escape(cod)}`;
        const el = document.querySelector(selector) || document.querySelector(`[data-code="${CSS.escape(cod)}"]`);
        if (!el) return;

        const HEADER_H = 72; // altura de tu header fijo
        const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_H - 12;
        window.scrollTo({ top: y, behavior: 'smooth' });

        el.classList.add('highlight-card');
        setTimeout(() => el.classList.remove('highlight-card'), 2500);
      });
    }

    // FUNCIÓN PRINCIPAL - ABRIR FORMULARIO CLIENTE
    function openCustomerForm() {
      console.log('openCustomerForm ejecutándose...');

      if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de continuar.');
        return;
      }

      showCustomerFormPopup();
    }

    function showCustomerFormPopup() {
      // Crear overlay
      const overlay = document.createElement('div');
      overlay.id = 'formOverlay';
      overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
                padding: 1rem;
            `;

      // Crear formulario popup
      const formPopup = document.createElement('div');
      formPopup.style.cssText = `
                background: white;
                border-radius: 20px;
                padding: 2.5rem;
                width: 100%;
                max-width: 550px;
                max-height: 95vh;
                overflow-y: auto;
                box-shadow: 0 25px 80px rgba(0,0,0,0.4);
                animation: slideInUp 0.4s ease;
                position: relative;
            `;

      formPopup.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 3px solid var(--pms-blue); padding-bottom: 1rem;">
                    <h2 style="color: var(--pms-dark); margin: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.5rem;">
                        <i class="fas fa-user-edit" style="color: var(--pms-blue);"></i>
                        Datos del Cliente
                    </h2>
                    <button onclick="closeCustomerForm()" style="background: var(--pms-red); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem; transition: all 0.3s;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <form id="customerForm" style="display: grid; gap: 2rem;">
                    <!-- Información Personal -->
                    <div style="background: linear-gradient(135deg, var(--pms-light), #ffffff); padding: 2rem; border-radius: 15px; border: 1px solid #e0e0e0;">
                        <h3 style="color: var(--pms-blue); margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
                            <i class="fas fa-user"></i> Información Personal
                        </h3>
                        <div style="display: grid; gap: 1.5rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: var(--pms-dark); font-size: 0.95rem;">
                                    Nombre Completo *
                                </label>
                                <input type="text" id="customerName" required 
                                       style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 1rem; transition: all 0.3s;"
                                       placeholder="Ej: Juan Pérez">
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: var(--pms-dark); font-size: 0.95rem;">
                                        Teléfono *
                                    </label>
                                    <input type="tel" id="customerPhone" required 
                                           style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 1rem; transition: all 0.3s;"
                                           placeholder="0981 123 456">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: var(--pms-dark); font-size: 0.95rem;">
                                        Email
                                    </label>
                                    <input type="email" id="customerEmail" 
                                           style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 1rem; transition: all 0.3s;"
                                           placeholder="juan@email.com">
                                </div>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: var(--pms-dark); font-size: 0.95rem;">
                                    Empresa/Institución
                                </label>
                                <input type="text" id="customerCompany" 
                                       style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 1rem; transition: all 0.3s;"
                                       placeholder="Empresa ABC S.A.">
                            </div>
                        </div>
                    </div>

                    <!-- Entrega -->
                    <div style="background: linear-gradient(135deg, var(--pms-light), #ffffff); padding: 2rem; border-radius: 15px; border: 1px solid #e0e0e0;">
                        <h3 style="color: var(--pms-green); margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
                            <i class="fas fa-shipping-fast"></i> Tipo de Entrega
                        </h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                            <label class="delivery-option" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; transition: all 0.3s; background: white;">
                                <input type="radio" name="deliveryType" value="retiro" id="retiro" style="transform: scale(1.3); accent-color: var(--pms-blue);">
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                                        <i class="fas fa-store" style="color: var(--pms-blue); font-size: 1.2rem;"></i>
                                        <strong style="color: var(--pms-dark);">Retiro en Local</strong>
                                    </div>
                                    <small style="color: var(--pms-gray);">Villa Elisa - Sin costo</small>
                                </div>
                            </label>
                            <label class="delivery-option" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; transition: all 0.3s; background: white;">
                                <input type="radio" name="deliveryType" value="delivery" id="delivery" style="transform: scale(1.3); accent-color: var(--pms-green);">
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                                        <i class="fas fa-truck" style="color: var(--pms-green); font-size: 1.2rem;"></i>
                                        <strong style="color: var(--pms-dark);">Delivery</strong>
                                    </div>
                                    <small style="color: var(--pms-gray);">A domicilio - Consultar costo</small>
                                </div>
                            </label>
                        </div>
                        <div id="addressSection" style="display: none;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: var(--pms-dark); font-size: 0.95rem;">
                                Dirección de Entrega *
                            </label>
                            <textarea id="customerAddress" rows="3" 
                                      style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 1rem; resize: vertical; transition: all 0.3s;"
                                      placeholder="Dirección completa con referencias..."></textarea>
                        </div>
                    </div>

                    <!-- Forma de Pago -->
                    <div style="background: linear-gradient(135deg, var(--pms-light), #ffffff); padding: 2rem; border-radius: 15px; border: 1px solid #e0e0e0;">
                        <h3 style="color: var(--pms-blue); margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
                            <i class="fas fa-credit-card"></i> Forma de Pago
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;">
                            <label class="payment-option" style="display: flex; align-items: center; gap: 0.8rem; padding: 1rem; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; transition: all 0.3s; background: white;">
                                <input type="radio" name="paymentMethod" value="efectivo" style="transform: scale(1.3); accent-color: var(--pms-green);">
                                <i class="fas fa-money-bill-wave" style="color: var(--pms-green); font-size: 1.2rem;"></i>
                                <span style="font-weight: 500;">Efectivo</span>
                            </label>
                            <label class="payment-option" style="display: flex; align-items: center; gap: 0.8rem; padding: 1rem; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; transition: all 0.3s; background: white;">
                                <input type="radio" name="paymentMethod" value="transferencia" style="transform: scale(1.3); accent-color: var(--pms-blue);">
                                <i class="fas fa-university" style="color: var(--pms-blue); font-size: 1.2rem;"></i>
                                <span style="font-weight: 500;">Transferencia</span>
                            </label>
                            <label class="payment-option" style="display: flex; align-items: center; gap: 0.8rem; padding: 1rem; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; transition: all 0.3s; background: white;">
                                <input type="radio" name="paymentMethod" value="tarjeta" style="transform: scale(1.3); accent-color: var(--pms-red);">
                                <i class="fas fa-credit-card" style="color: var(--pms-red); font-size: 1.2rem;"></i>
                                <span style="font-weight: 500;">Tarjeta</span>
                            </label>
                        </div>
                    </div>

                    <!-- Observaciones -->
                    <div style="background: linear-gradient(135deg, var(--pms-light), #ffffff); padding: 2rem; border-radius: 15px; border: 1px solid #e0e0e0;">
                        <h3 style="color: var(--pms-gray); margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
                            <i class="fas fa-sticky-note"></i> Observaciones
                        </h3>
                        <textarea id="customerNotes" rows="3" 
                                  style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 1rem; resize: vertical; transition: all 0.3s;"
                                  placeholder="Comentarios adicionales, urgencia, horarios preferidos, etc."></textarea>
                    </div>

                    <!-- Botones -->
                    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <button type="button" onclick="closeCustomerForm()" 
                                style="flex: 1; background: var(--pms-gray); color: white; border: none; padding: 1rem 1.5rem; border-radius: 12px; font-size: 1rem; cursor: pointer; transition: all 0.3s; font-weight: 500;">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" 
                                style="flex: 2; background: linear-gradient(135deg, var(--pms-green), #00CC99); color: white; border: none; padding: 1rem 1.5rem; border-radius: 12px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0, 170, 136, 0.3);">
                            <i class="fab fa-whatsapp"></i> Generar Pedido WhatsApp
                        </button>
                    </div>
                </form>
            `;

      overlay.appendChild(formPopup);
      document.body.appendChild(overlay);

      // Agregar event listeners para las opciones
      setupFormEventListeners();

      // Focus en el primer campo
      setTimeout(() => {
        document.getElementById('customerName').focus();
      }, 400);
    }

    function setupFormEventListeners() {
      // Manejar envío del formulario
      document.getElementById('customerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        processFormData();
      });

      // Event listeners para delivery options
      document.querySelectorAll('input[name="deliveryType"]').forEach(radio => {
        radio.addEventListener('change', function () {
          updateDeliverySelection();
        });
      });

      // Event listeners para payment options
      document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function () {
          updatePaymentSelection();
        });
      });

      // Event listeners para hover effects en las opciones
      document.querySelectorAll('.delivery-option, .payment-option').forEach(option => {
        option.addEventListener('mouseenter', function () {
          if (!this.querySelector('input').checked) {
            this.style.borderColor = 'var(--pms-blue)';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.15)';
          }
        });

        option.addEventListener('mouseleave', function () {
          if (!this.querySelector('input').checked) {
            this.style.borderColor = '#ddd';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
          }
        });
      });

      // Focus effects para inputs
      document.querySelectorAll('#formOverlay input, #formOverlay textarea').forEach(input => {
        input.addEventListener('focus', function () {
          this.style.borderColor = 'var(--pms-blue)';
          this.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
        });

        input.addEventListener('blur', function () {
          this.style.borderColor = '#ddd';
          this.style.boxShadow = 'none';
        });
      });
    }

    function updateDeliverySelection() {
      const addressSection = document.getElementById('addressSection');
      const selectedDelivery = document.querySelector('input[name="deliveryType"]:checked');

      // Reset all delivery options
      document.querySelectorAll('.delivery-option').forEach(option => {
        option.style.borderColor = '#ddd';
        option.style.background = 'white';
        option.style.transform = 'translateY(0)';
        option.style.boxShadow = 'none';
      });

      if (selectedDelivery) {
        const selectedOption = selectedDelivery.closest('.delivery-option');
        selectedOption.style.borderColor = selectedDelivery.value === 'delivery' ? 'var(--pms-green)' : 'var(--pms-blue)';
        selectedOption.style.background = selectedDelivery.value === 'delivery' ? 'rgba(0, 170, 136, 0.05)' : 'rgba(0, 102, 204, 0.05)';
        selectedOption.style.boxShadow = '0 4px 12px rgba(0, 170, 136, 0.2)';

        // Show/hide address section
        if (selectedDelivery.value === 'delivery') {
          addressSection.style.display = 'block';
          document.getElementById('customerAddress').required = true;
        } else {
          addressSection.style.display = 'none';
          document.getElementById('customerAddress').required = false;
        }
      }
    }

    function updatePaymentSelection() {
      const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');

      // Reset all payment options
      document.querySelectorAll('.payment-option').forEach(option => {
        option.style.borderColor = '#ddd';
        option.style.background = 'white';
        option.style.transform = 'translateY(0)';
        option.style.boxShadow = 'none';
      });

      if (selectedPayment) {
        const selectedOption = selectedPayment.closest('.payment-option');
        const colors = {
          'efectivo': 'var(--pms-green)',
          'transferencia': 'var(--pms-blue)',
          'tarjeta': 'var(--pms-red)'
        };
        const color = colors[selectedPayment.value];
        selectedOption.style.borderColor = color;
        selectedOption.style.background = `${color}15`; // 15 is hex for low opacity
        selectedOption.style.boxShadow = `0 4px 12px ${color}30`; // 30 is hex for medium opacity
      }
    }

    function closeCustomerForm() {
      const overlay = document.getElementById('formOverlay');
      if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 300);
      }
    }

    function processFormData() {
      // Obtener datos del formulario
      const customerData = {
        name: document.getElementById('customerName').value.trim(),
        phone: document.getElementById('customerPhone').value.trim(),
        email: document.getElementById('customerEmail').value.trim(),
        company: document.getElementById('customerCompany').value.trim(),
        deliveryType: document.querySelector('input[name="deliveryType"]:checked')?.value,
        address: document.getElementById('customerAddress').value.trim(),
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value,
        notes: document.getElementById('customerNotes').value.trim()
      };

      // Validaciones
      if (!customerData.name) {
        alert('Por favor, ingresa tu nombre completo.');
        document.getElementById('customerName').focus();
        return;
      }
      if (!customerData.phone) {
        alert('Por favor, ingresa tu teléfono.');
        document.getElementById('customerPhone').focus();
        return;
      }
      if (!customerData.deliveryType) {
        alert('Por favor, selecciona el tipo de entrega.');
        return;
      }
      if (customerData.deliveryType === 'delivery' && !customerData.address) {
        alert('Por favor, ingresa la dirección de entrega.');
        document.getElementById('customerAddress').focus();
        return;
      }

      console.log('Datos del cliente:', customerData);

      // Generar mensaje y cerrar formulario
      generateWhatsAppMessage(customerData);
      closeCustomerForm();
    }
    // Emojis seguros con escapes Unicode
    const E = {
      fabrica: "\uD83C\uDFED",      // 🏭
      calendario: "\uD83D\uDCC5",   // 📅
      reloj: "\uD83D\uDD50",        // 🕐
      persona: "\uD83D\uDC64",      // 👤
      camion: "\uD83D\uDE9A",       // 🚚
      delivery: "\uD83D\uDE9B",     // 🚛
      dinero: "\uD83D\uDCB5",       // 💵
      banco: "\uD83C\uDFE6",        // 🏦
      tarjeta: "\uD83D\uDCB3",      // 💳
      paquete: "\uD83D\uDCE6",      // 📦
      nota: "\uD83D\uDCDD",         // 📝
      grafica: "\uD83D\uDCCA",      // 📊
      monedero: "\uD83D\uDCB0",     // 💰
      telefono: "\uD83D\uDCDE",     // 📞
      check: "\u2705",              // ✅
      cohete: "\uD83D\uDE80"        // 🚀
    };

    function generateWhatsAppMessage(customerData) {
      console.log('Generando mensaje de WhatsApp...');

      const fecha = new Date().toLocaleDateString('es-PY');
      const hora = new Date().toLocaleTimeString('es-PY', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });

      let mensaje = `${E.fabrica} *PEDIDO PMS - PROYECTOS MONTAJES SEGURIDAD*\n`;
      mensaje += `${E.calendario} Fecha: ${fecha}\n`;
      mensaje += `${E.reloj} Hora: ${hora}\n\n`;

      mensaje += `${E.persona} *DATOS DEL CLIENTE:*\n`;
      mensaje += `Nombre: ${customerData.name}\n`;
      mensaje += `Teléfono: ${customerData.phone}\n`;
      if (customerData.email) mensaje += `Email: ${customerData.email}\n`;
      if (customerData.company) mensaje += `Empresa: ${customerData.company}\n`;

      mensaje += `\n${E.camion} *ENTREGA:*\n`;
      if (customerData.deliveryType === 'retiro') {
        mensaje += `📍 Retiro en Local - Villa Elisa\n`;
        mensaje += `Ruta PY 01 acceso sur nro 1082 casi Boquerón\n`;
      } else {
        mensaje += `${E.delivery} Delivery a Domicilio\n`;
        mensaje += `Dirección: ${customerData.address}\n`;
      }

      mensaje += `\n${E.tarjeta} *FORMA DE PAGO:*\n`;
      const paymentLabels = {
        'efectivo': `${E.dinero} Efectivo`,
        'transferencia': `${E.banco} Transferencia Bancaria`,
        'tarjeta': `${E.tarjeta} Tarjeta de Crédito/Débito`
      };
      mensaje += `${paymentLabels[customerData.paymentMethod] || `${E.dinero} Efectivo`}\n`;

      mensaje += `\n${E.paquete} *DETALLE DEL PEDIDO:*\n`;
      mensaje += `════════════════════════════\n`;

      let total = 0;
      cart.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        mensaje += `${index + 1}. *${item.nombre}*\n`;
        mensaje += `Código: ${item.codigo}\n`;
        mensaje += `Cantidad: ${item.cantidad} ${item.unidad || 'unidades'}\n`;
        mensaje += `Precio Unit: ₲ ${formatPrice(item.precio)}\n`;
        mensaje += `Subtotal: ₲ ${formatPrice(subtotal)}\n`;
        mensaje += `────────────────────────────\n`;
      });

      mensaje += `\n${E.monedero} *TOTAL PEDIDO: ₲ ${formatPrice(total)}*\n\n`;

      if (customerData.notes && customerData.notes.trim()) {
        mensaje += `📝 *OBSERVACIONES:*\n`;
        mensaje += `${customerData.notes}\n\n`;
      }

      mensaje += `${E.telefono} *CONTACTO PMS:*\n`;
      mensaje += `Villa Elisa - Paraguay\n`;
      mensaje += `Teléfono: 0985 920 400\n`;
      mensaje += `Email: ventas@pms.com.py\n\n`;

      mensaje += `${E.check} *Gracias por confiar en PMS!*\n`;
      mensaje += `${E.cohete} Responderemos a la brevedad`;

      console.log('Mensaje generado, abriendo WhatsApp...');

      // Codificar y abrir
      const whatsappURL = "https://api.whatsapp.com/send?phone=595985920400&text=" + encodeURIComponent(mensaje);
      window.open(whatsappURL, '_blank');

      // Limpiar carrito
      cart = [];
      renderCart();
      updateCartCounter();

      showNotification('¡Pedido enviado por WhatsApp correctamente!');
    }

    function setupEventListeners() {
      const searchInput = document.getElementById('searchInput');
      searchInput.addEventListener('input', function () {
        renderProducts();
      });

      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          renderProducts();
        }
      });
    }

    function scrollToCart() {
      const cartSidebar = document.querySelector('.cart-sidebar');
      cartSidebar.scrollIntoView({ behavior: 'smooth' });
    }

    function showNotification(message) {
      const notification = document.createElement('div');
      notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--pms-green);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                z-index: 10000;
                font-weight: bold;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                animation: slideInRight 0.3s ease;
            `;
      notification.textContent = message;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
    }

    // Función de testing
    function testForm() {
      console.log('Test function ejecutándose...');
      openCustomerForm();
    }
    // Imagen
    // FunciÃ³n de testing
    function testForm() {
      console.log('Test function ejecutÃ¡ndose...');
      openCustomerForm();
    }

    // POPUP DE IMAGEN AMPLIADA
    function openImagePopup(imageUrl, productName) {
      // Evitar que se propague el evento de click al card del producto
      event.stopPropagation();
      
      // Crear overlay
      const overlay = document.createElement('div');
      overlay.id = 'imagePopupOverlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
        padding: 2rem;
        cursor: pointer;
      `;

      // Crear contenedor de imagen
      const imageContainer = document.createElement('div');
      imageContainer.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: white;
        border-radius: 15px;
        padding: 1rem;
        box-shadow: 0 25px 80px rgba(0,0,0,0.5);
        animation: slideInUp 0.4s ease;
        cursor: auto;
      `;

      // Botón de cerrar
      const closeButton = document.createElement('button');
      closeButton.style.cssText = `
        position: absolute;
        top: -15px;
        right: -15px;
        background: var(--pms-red);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(213, 43, 30, 0.3);
        z-index: 10002;
      `;
      closeButton.innerHTML = '<i class="fas fa-times"></i>';
      closeButton.onclick = closeImagePopup;

      // Título del producto
      const title = document.createElement('h3');
      title.style.cssText = `
        margin: 0 0 1rem 0;
        color: var(--pms-dark);
        text-align: center;
        font-size: 1.1rem;
        padding: 0 40px;
        line-height: 1.3;
      `;
      title.textContent = productName;

      // Imagen ampliada
      const image = document.createElement('img');
      image.style.cssText = `
        width: 100%;
        height: auto;
        max-width: 600px;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 10px;
        display: block;
        margin: 0 auto;
      `;
      image.src = imageUrl;
      image.alt = productName;

      // Manejar error de carga de imagen
      image.onerror = function() {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          width: 300px;
          height: 300px;
          background: var(--pms-light);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pms-gray);
          font-size: 3rem;
          margin: 0 auto;
        `;
        placeholder.innerHTML = '<i class="fas fa-image"></i>';
        image.parentNode.replaceChild(placeholder, image);
      };

      // Ensamblar elementos
      imageContainer.appendChild(closeButton);
      imageContainer.appendChild(title);
      imageContainer.appendChild(image);
      overlay.appendChild(imageContainer);
      document.body.appendChild(overlay);

      // Event listeners
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeImagePopup();
        }
      });

      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';

      // Escape key para cerrar
      document.addEventListener('keydown', handleImagePopupEscape);
    }

    function closeImagePopup() {
      const overlay = document.getElementById('imagePopupOverlay');
      if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
          // Restaurar scroll del body
          document.body.style.overflow = '';
          // Remover event listener del escape
          document.removeEventListener('keydown', handleImagePopupEscape);
        }, 300);
      }
    }

    function handleImagePopupEscape(e) {
      if (e.key === 'Escape') {
        closeImagePopup();
      }
    }