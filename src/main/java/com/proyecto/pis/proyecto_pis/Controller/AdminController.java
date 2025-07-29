package com.proyecto.pis.proyecto_pis.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/admin")
public class AdminController {
    
    @GetMapping("/dashboard")
    public String dashboard(HttpServletRequest request, Model model) {
        model.addAttribute("currentUrl", request.getRequestURI());
        return "html/admin/dashboard";
    }
    
    // Endpoint para la página inicial del dashboard
    @GetMapping("/dashboard/home")
    public String dashboardHome() {
        return "html/admin/dashboard-home"; // Vista con estadísticas, gráficos, etc.
    }
    
    // Si usas la opción AJAX, estos endpoints deberían devolver fragmentos HTML
    @GetMapping("/productos/nuevo")
    public String nuevoProducto() {
        return "html/admin/nuevo-producto";
    }
    
    @GetMapping("/productos/listarproductos")
    public String menuProductos() {
        return "redirect:/productos/lista";
    }
    
    @GetMapping("/pedidos/admin")
    public String pedidosAdmin() {
        return "html/admin/pedidos-admin";
    }
}