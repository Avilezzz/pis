// Dashboard Navigation Handler - Versión Mejorada
document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation buttons
  const navButtons = document.querySelectorAll(".nav-button");
  const mainContent = document.getElementById("main-content");

  // Add click event listeners to all navigation buttons
  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Add loading state to button
      const originalText = this.textContent;
      this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Cargando...';
      this.disabled = true;

      // Remove active class from all buttons
      navButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.disabled = false;
        btn.textContent = btn.getAttribute("data-original-text") || btn.textContent;
      });

      // Store original text for future reference
      this.setAttribute("data-original-text", originalText);

      // Add active class to clicked button
      this.classList.add("active");

      // Get the action from data attribute
      const action = this.getAttribute("data-action");

      // Handle different actions with better error handling
      switch (action) {
        case "ver-pedidos":
          loadPedidos();
          break;
        case "lista-productos":
          loadProductos();
          break;
        case "crear-producto":
          loadCrearProducto();
          break;
        default:
          showWelcome();
      }
    });
  });

  // Function to load pedidos view with improved UX
  function loadPedidos() {
    showLoading("Cargando pedidos...");
    fetch("/admin/pedido")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        // Extract only the content from the body, excluding the container wrapper
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const content = doc.querySelector(".container");

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
        
        // Add success animation
        addSuccessAnimation();
      })
      .catch((error) => {
        console.error("Error loading pedidos:", error);
        showError("Error al cargar los pedidos", error.message);
      });
  }

  // Function to load productos view with improved UX
  function loadProductos() {
    showLoading("Cargando productos...");
    fetch("/productos/listarproductos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        // Extract only the content from the body, excluding the container wrapper
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const content =
          doc.querySelector(".container-fluid") ||
          doc.querySelector(".container");

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
        
        // Add success animation
        addSuccessAnimation();
      })
      .catch((error) => {
        console.error("Error loading productos:", error);
        showError("Error al cargar los productos", error.message);
      });
  }

  // Function to load crear producto view with improved UX
  function loadCrearProducto() {
    showLoading("Cargando formulario...");
    fetch("/productos/nuevo")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        // Extract only the content from the body, excluding the container wrapper
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const content = doc.querySelector(".container");

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
        
        // Add success animation
        addSuccessAnimation();
      })
      .catch((error) => {
        console.error("Error loading crear producto:", error);
        showError("Error al cargar el formulario de producto", error.message);
      });
  }

  // Function to show welcome message with improved design
  function showWelcome() {
    mainContent.innerHTML = `
      <div class="content-placeholder">
        <div class="welcome-animation">
          <i class="bi bi-house-heart-fill text-primary" style="font-size: 4rem; margin-bottom: 1rem;"></i>
          <h2 class="mb-3">¡Bienvenido al Dashboard!</h2>
          <p class="text-muted mb-4">Selecciona una opción del menú para comenzar a gestionar tu negocio</p>
          <div class="row g-3">
            <div class="col-md-4">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-body text-center">
                  <i class="bi bi-list-check text-primary mb-3" style="font-size: 2rem;"></i>
                  <h5>Ver Pedidos</h5>
                  <p class="small text-muted">Gestiona los pedidos de tus clientes</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-body text-center">
                  <i class="bi bi-box-seam text-success mb-3" style="font-size: 2rem;"></i>
                  <h5>Productos</h5>
                  <p class="small text-muted">Administra tu inventario</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-body text-center">
                  <i class="bi bi-plus-circle text-warning mb-3" style="font-size: 2rem;"></i>
                  <h5>Crear Producto</h5>
                  <p class="small text-muted">Añade nuevos productos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Function to show loading state with better UX
  function showLoading(message = "Cargando...") {
    mainContent.innerHTML = `
      <div class="content-placeholder">
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="mt-3">${message}</p>
          <div class="progress mt-3" style="width: 200px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated" 
                 role="progressbar" 
                 style="width: 100%"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Function to show error message with better design
  function showError(title, message) {
    mainContent.innerHTML = `
      <div class="content-placeholder">
        <div class="error-container">
          <i class="bi bi-exclamation-triangle text-danger mb-3" style="font-size: 3rem;"></i>
          <h3 class="text-danger mb-3">${title}</h3>
          <p class="text-muted mb-4">${message}</p>
          <div class="d-flex gap-2">
            <button onclick="location.reload()" class="btn btn-primary">
              <i class="bi bi-arrow-clockwise me-2"></i>
              Reintentar
            </button>
            <button onclick="showWelcome()" class="btn btn-outline-secondary">
              <i class="bi bi-house me-2"></i>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Function to add success animation
  function addSuccessAnimation() {
    const wrapper = document.querySelector('.dashboard-content-wrapper');
    if (wrapper) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        wrapper.style.transition = 'all 0.6s ease-out';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  // Show welcome message by default
  showWelcome();
});

// Function to handle iframe content loading (if using iframes)
function loadContentInIframe(url) {
  const iframe = document.getElementById("content-iframe");
  if (iframe) {
    iframe.src = url;
  }
}

// Function to handle dynamic content loading via AJAX
function loadContentAjax(url, targetElement) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(targetElement).innerHTML = html;
      initializeBootstrapComponents();
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      document.getElementById(targetElement).innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="bi bi-exclamation-triangle me-2"></i>
          Error al cargar el contenido: ${error.message}
        </div>
      `;
    });
}

// Function to reinitialize Bootstrap components after dynamic content loading
function initializeBootstrapComponents() {
  // Reinitialize tooltips
  if (typeof bootstrap !== "undefined") {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Reinitialize popovers
    const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });

    // Reinitialize modals with better error handling
    const modalTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="modal"]')
    );
    modalTriggerList.forEach(function (modalTriggerEl) {
      modalTriggerEl.addEventListener("click", function (e) {
        e.preventDefault();
        const targetModal = document.querySelector(
          this.getAttribute("data-bs-target")
        );
        if (targetModal) {
          try {
            const modal = new bootstrap.Modal(targetModal);
            modal.show();
          } catch (error) {
            console.error("Error showing modal:", error);
          }
        }
      });
    });

    // Reinitialize dropdowns
    const dropdownTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="dropdown"]')
    );
    dropdownTriggerList.map(function (dropdownTriggerEl) {
      return new bootstrap.Dropdown(dropdownTriggerEl);
    });
  }

  // Reinitialize any custom event listeners for forms
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      // Add loading state to submit button
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';
        submitBtn.disabled = true;
        
        // Re-enable button after a delay (in case of validation errors)
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 5000);
      }
      
      console.log("Form submitted:", form.action);
    });
  });

  // Add hover effects to table rows
  const tableRows = document.querySelectorAll('.table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.01)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .welcome-animation {
    animation: fadeInUp 0.8s ease-out;
  }
`;
document.head.appendChild(style);
