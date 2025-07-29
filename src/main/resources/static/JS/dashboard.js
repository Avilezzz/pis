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
        // You can load content via AJAX or redirect
        window.location.href = '/admin/pedidos/admin';
    }
    
    // Function to load productos view
    function loadProductos() {
        // You can load content via AJAX or redirect
        window.location.href = '/productos/menu';
    }
    
    // Function to load crear producto view
    function loadCrearProducto() {
        // You can load content via AJAX or redirect
        window.location.href = '/productos/nuevo';
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