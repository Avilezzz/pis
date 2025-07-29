// Dashboard Navigation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    const mainContent = document.getElementById('main-content');
    
    // Add click event listeners to all navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the action from data attribute
            const action = this.getAttribute('data-action');
            
            // Handle different actions
            switch(action) {
                case 'ver-pedidos':
                    loadPedidos();
                    break;
                case 'lista-productos':
                    loadProductos();
                    break;
                case 'crear-producto':
                    loadCrearProducto();
                    break;
                default:
                    showWelcome();
            }
        });
    });
    
    // Function to load pedidos view
    function loadPedidos() {
        showLoading();
        fetch('/admin/pedidos/admin')
            .then(response => response.text())
            .then(html => {
                // Extract only the content from the body, excluding the container wrapper
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.container');
                
                if (content) {
                    mainContent.innerHTML = `
                        <div class="dashboard-content-wrapper">
                            ${content.outerHTML}
                        </div>
                    `;
                } else {
                    mainContent.innerHTML = `
                        <div class="dashboard-content-wrapper">
                            ${html}
                        </div>
                    `;
                }
                
                // Reinitialize Bootstrap components
                initializeBootstrapComponents();
            })
            .catch(error => {
                console.error('Error loading pedidos:', error);
                showError('Error al cargar los pedidos');
            });
    }
    
    // Function to load productos view
    function loadProductos() {
        showLoading();
        fetch('/productos/menu')
            .then(response => response.text())
            .then(html => {
                // Extract only the content from the body, excluding the container wrapper
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.container-fluid') || doc.querySelector('.container');
                
                if (content) {
                    mainContent.innerHTML = `
                        <div class="dashboard-content-wrapper">
                            ${content.outerHTML}
                        </div>
                    `;
                } else {
                    mainContent.innerHTML = `
                        <div class="dashboard-content-wrapper">
                            ${html}
                        </div>
                    `;
                }
                
                // Reinitialize Bootstrap components
                initializeBootstrapComponents();
            })
            .catch(error => {
                console.error('Error loading productos:', error);
                showError('Error al cargar los productos');
            });
    }
    
    // Function to load crear producto view
    function loadCrearProducto() {
        showLoading();
        fetch('/productos/nuevo')
            .then(response => response.text())
            .then(html => {
                // Extract only the content from the body, excluding the container wrapper
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.container');
                
                if (content) {
                    mainContent.innerHTML = `
                        <div class="dashboard-content-wrapper">
                            ${content.outerHTML}
                        </div>
                    `;
                } else {
                    mainContent.innerHTML = `
                        <div class="dashboard-content-wrapper">
                            ${html}
                        </div>
                    `;
                }
                
                // Reinitialize Bootstrap components
                initializeBootstrapComponents();
            })
            .catch(error => {
                console.error('Error loading crear producto:', error);
                showError('Error al cargar el formulario de producto');
            });
    }
    
    // Function to show welcome message
    function showWelcome() {
        mainContent.innerHTML = `
            <div class="content-placeholder">
                <h2>Bienvenido al Dashboard</h2>
                <p>Selecciona una opción del menú para comenzar</p>
            </div>
        `;
    }
    
    // Function to show loading state
    function showLoading() {
        mainContent.innerHTML = `
            <div class="content-placeholder">
                <div class="loading-spinner"></div>
                <p>Cargando...</p>
            </div>
        `;
    }
    
    // Function to show error message
    function showError(message) {
        mainContent.innerHTML = `
            <div class="content-placeholder">
                <h3 style="color: #ff0000;">Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="nav-button">Reintentar</button>
            </div>
        `;
    }
    
    // Show welcome message by default
    showWelcome();
});

// Function to handle iframe content loading (if using iframes)
function loadContentInIframe(url) {
    const iframe = document.getElementById('content-iframe');
    if (iframe) {
        iframe.src = url;
    }
}

// Function to handle dynamic content loading via AJAX
function loadContentAjax(url, targetElement) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetElement).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// Function to reinitialize Bootstrap components after dynamic content loading
function initializeBootstrapComponents() {
    // Reinitialize tooltips
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Reinitialize popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
        
        // Reinitialize modals
        const modalTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="modal"]'));
        modalTriggerList.forEach(function (modalTriggerEl) {
            modalTriggerEl.addEventListener('click', function(e) {
                e.preventDefault();
                const targetModal = document.querySelector(this.getAttribute('data-bs-target'));
                if (targetModal) {
                    const modal = new bootstrap.Modal(targetModal);
                    modal.show();
                }
            });
        });
    }
    
    // Reinitialize any custom event listeners for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Handle form submission if needed
            console.log('Form submitted:', form.action);
        });
    });
}