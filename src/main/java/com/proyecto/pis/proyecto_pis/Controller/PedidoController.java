package com.proyecto.pis.proyecto_pis.Controller;

import com.proyecto.pis.proyecto_pis.model.pedido;
import com.proyecto.pis.proyecto_pis.model.PedidoDetalle;
import com.proyecto.pis.proyecto_pis.model.producto;
import com.proyecto.pis.proyecto_pis.model.EstadoPedido;
import com.proyecto.pis.proyecto_pis.dto.PedidoRequest;
import com.proyecto.pis.proyecto_pis.dto.ItemRequest;
import com.proyecto.pis.proyecto_pis.repository.PedidoRepository;
import com.proyecto.pis.proyecto_pis.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarPedido(@RequestBody PedidoRequest request) {
        pedido nuevo = new pedido();
        nuevo.setNombre(request.getNombre());
        nuevo.setApellido(request.getApellido());
        nuevo.setTelefono(request.getTelefono());
        nuevo.setEmail(request.getEmail());
        nuevo.setDireccion(request.getDireccion());
        nuevo.setMetodoPago(request.getMetodoPago());
        nuevo.setEstadoEnum(EstadoPedido.PENDIENTE); // Estado inicial

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

    @PostMapping("/cambiar-estado/{id}")
    public ResponseEntity<?> cambiarEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        try {
            pedido pedidoExistente = pedidoRepository.findById(id).orElse(null);
            if (pedidoExistente == null) {
                return ResponseEntity.notFound().build();
            }
            
            EstadoPedido estado = EstadoPedido.valueOf(nuevoEstado.replace("\"", ""));
            pedidoExistente.setEstadoEnum(estado);
            pedidoRepository.save(pedidoExistente);
            
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
}