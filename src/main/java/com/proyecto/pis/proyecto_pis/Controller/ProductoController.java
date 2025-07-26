package com.proyecto.pis.proyecto_pis.Controller;

import com.proyecto.pis.proyecto_pis.model.producto;
import com.proyecto.pis.proyecto_pis.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // Vista formulario para agregar productos
    @GetMapping("/nuevo")
    public String mostrarFormularioProducto(Model model) {
        model.addAttribute("producto", new producto());
        return "productos_menu/formulario_producto";
    }

    // Guardar producto
    @PostMapping("/guardar")
    public String guardarProducto(@ModelAttribute producto producto) {
        productoRepository.save(producto);
        return "redirect:/productos/menu";
    }

    // Mostrar menú (vista de tarjetas)
    @GetMapping("/menu")
    public String mostrarMenu(Model model) {
        model.addAttribute("listaProductosTb", productoRepository.findAll());
        return "html/menu";
    }
}
