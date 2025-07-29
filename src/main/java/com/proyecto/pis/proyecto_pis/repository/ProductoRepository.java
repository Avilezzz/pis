package com.proyecto.pis.proyecto_pis.repository;

import com.proyecto.pis.proyecto_pis.model.producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductoRepository extends JpaRepository<producto, Long> {
    List<producto> findByTipo(String tipo);
}