package com.proyecto.pis.proyecto_pis.model;

public enum EstadoPedido {
    PENDIENTE("Pendiente", "warning"),
    CONFIRMADO("Confirmado", "info"), 
    EN_PREPARACION("En Preparación", "primary"),
    LISTO("Listo para Entrega", "success"),
    EN_CAMINO("En Camino", "secondary"),
    ENTREGADO("Entregado", "success"),
    CANCELADO("Cancelado", "danger");

    private final String descripcion;
    private final String colorBootstrap;

    EstadoPedido(String descripcion, String colorBootstrap) {
        this.descripcion = descripcion;
        this.colorBootstrap = colorBootstrap;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getColorBootstrap() {
        return colorBootstrap;
    }
}