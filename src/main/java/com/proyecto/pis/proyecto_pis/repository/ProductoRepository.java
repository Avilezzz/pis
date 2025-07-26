package com.proyecto.pis.proyecto_pis.repository;

import com.proyecto.pis.proyecto_pis.model.producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<producto, Long> {
}