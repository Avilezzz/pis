package com.proyecto.pis.proyecto_pis.Controller;

import com.proyecto.pis.proyecto_pis.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class PedidoViewController {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    // Vista de administración de pedidos
    @GetMapping("/pedido")
    public String verPedidos(Model model) {
        model.addAttribute("pedidos", pedidoRepository.findAll());
        return "html/pedidos_admin";
    }
     @GetMapping(value = "/lista", produces = "text/html")
    public String obtenerListaPedidos(Model model) {
        model.addAttribute("pedidos", pedidoRepository.findAll());
        return "html/pedidos_admin :: pedidosLista";
    }
    
    @DeleteMapping("/pedido/eliminar/{id}")
    @ResponseBody
    public ResponseEntity<?> eliminarPedido(@PathVariable Long id) {
        try {
            if (!pedidoRepository.existsById(id)) {
                return ResponseEntity.badRequest().body("{\"status\":\"error\",\"message\":\"Pedido no encontrado\"}");
            }
            
            pedidoRepository.deleteById(id);
            System.out.println("Pedido eliminado exitosamente: ID " + id);
            return ResponseEntity.ok().body("{\"status\":\"success\",\"message\":\"Pedido completado y eliminado exitosamente\"}");
        } catch (Exception e) {
            System.out.println("Error al eliminar pedido: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"status\":\"error\",\"message\":\"Error al eliminar pedido: " + e.getMessage() + "\"}");
        }
    }
}