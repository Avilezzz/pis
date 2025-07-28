package com.proyecto.pis.proyecto_pis.Controller;

import com.proyecto.pis.proyecto_pis.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
}