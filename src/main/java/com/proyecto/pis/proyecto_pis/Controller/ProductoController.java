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

    // Mostrar lista de productos
    @GetMapping("/lista")
    public String mostrarListaProductos(Model model, @RequestParam(required = false) String tipo) {
        if (tipo != null && !tipo.isEmpty()) {
            model.addAttribute("productos", productoRepository.findByTipo(tipo));
            model.addAttribute("tipoFiltro", tipo);
        } else {
            model.addAttribute("productos", productoRepository.findAll());
        }
        return "productos_menu/lista_producto";
    }
    // Actualizar producto
    @PostMapping("/actualizar")
    public String actualizarProducto(@ModelAttribute producto producto) {
        try {
            // Validar que el producto existe
            if (producto.getId() == null || !productoRepository.existsById(producto.getId())) {
                return "redirect:/productos/lista?mensaje=Producto no encontrado&tipo=error";
            }
            
            // Validar campos requeridos
            if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
                return "redirect:/productos/lista?mensaje=El nombre del producto es requerido&tipo=error";
            }
            
            if (producto.getPrecio() <= 0) {
                return "redirect:/productos/lista?mensaje=El precio debe ser mayor a 0&tipo=error";
            }
            
            productoRepository.save(producto);
            return "redirect:/productos/lista?mensaje=Producto actualizado exitosamente&tipo=success";
        } catch (Exception e) {
            return "redirect:/productos/lista?mensaje=Error al actualizar el producto: " + e.getMessage() + "&tipo=error";
        }
    }
    // Obtener producto por ID (para futuras funcionalidades)
    @GetMapping("/{id}")
    @ResponseBody
    public producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id).orElse(null);
    }
    // Eliminar producto
    @PostMapping("/eliminar")
    public String eliminarProducto(@RequestParam Long id) {
        try {
            // Validar que el producto existe
            if (!productoRepository.existsById(id)) {
                return "redirect:/productos/lista?mensaje=Producto no encontrado&tipo=error";
            }
            
            productoRepository.deleteById(id);
            return "redirect:/productos/lista?mensaje=Producto eliminado exitosamente&tipo=success";
        } catch (Exception e) {
            return "redirect:/productos/lista?mensaje=Error al eliminar el producto: " + e.getMessage() + "&tipo=error";
        }
    }
    // Guardar producto
    @PostMapping("/guardar")
    public String guardarProducto(@ModelAttribute producto producto) {
        productoRepository.save(producto);
         return "redirect:/admin/dashboard";
    }

    // Mostrar menú (vista de tarjetas)
    @GetMapping("/menu")
    public String mostrarMenu(Model model) {
         // Inicializar productos existentes sin tipo
        inicializarTipoProductos();
        model.addAttribute("listaProductosTb", productoRepository.findAll());
        return "/html/menu";
    }

    // Método para inicializar productos existentes sin tipo
    private void inicializarTipoProductos() {
        Iterable<producto> productos = productoRepository.findAll();
        for (producto prod : productos) {
            if (prod.getTipo() == null || prod.getTipo().isEmpty()) {
                prod.setTipo("comida"); // Asignar "comida" por defecto
                productoRepository.save(prod);
            }
        }
    }
}
