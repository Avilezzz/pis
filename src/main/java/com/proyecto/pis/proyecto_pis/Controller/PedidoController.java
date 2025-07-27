package com.proyecto.pis.proyecto_pis.Controller;

import com.proyecto.pis.proyecto_pis.model.pedido;
import com.proyecto.pis.proyecto_pis.model.PedidoDetalle;
import com.proyecto.pis.proyecto_pis.model.producto;
import com.proyecto.pis.proyecto_pis.dto.PedidoRequest;
import com.proyecto.pis.proyecto_pis.dto.ItemRequest;
import com.proyecto.pis.proyecto_pis.repository.PedidoRepository;
import com.proyecto.pis.proyecto_pis.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;

@Controller
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping("/guardar")
    @ResponseBody
    public ResponseEntity<?> guardarPedido(@RequestBody PedidoRequest request) {
        pedido nuevo = new pedido();
        nuevo.setNombre(request.getNombre());
        nuevo.setApellido(request.getApellido());
        nuevo.setTelefono(request.getTelefono());
        nuevo.setEmail(request.getEmail());

        // Procesar items
        if (request.getItems() != null) {
            for (ItemRequest ir : request.getItems()) {
                producto prod = productoRepository.findById(ir.getProductId()).orElse(null);
                if (prod == null) continue; // ignorar si no existe

                PedidoDetalle det = new PedidoDetalle();
                det.setPedido(nuevo);
                det.setProducto(prod);
                det.setCantidad(ir.getQuantity());
                det.setPrecioUnitario(prod.getPrecio());

                nuevo.getDetalles().add(det);
            }
        }

        pedidoRepository.save(nuevo);
        return ResponseEntity.ok().build();
    }

    // Vista de administración de pedidos
    @GetMapping("/admin")
    public String verPedidos(Model model) {
        model.addAttribute("pedidos", pedidoRepository.findAll());
        return "html/pedidos_admin";
    }
}