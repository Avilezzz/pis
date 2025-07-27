package com.proyecto.pis.proyecto_pis.Controller;

import com.proyecto.pis.proyecto_pis.model.pedido;
import com.proyecto.pis.proyecto_pis.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarPedido(@RequestBody pedido pedido) {
        // Podríamos agregar validaciones de negocio aquí
        pedidoRepository.save(pedido);
        return ResponseEntity.ok().build();
    }
}