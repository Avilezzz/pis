package com.proyecto.pis.proyecto_pis.repository;

import com.proyecto.pis.proyecto_pis.model.pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<pedido, Long> {
}