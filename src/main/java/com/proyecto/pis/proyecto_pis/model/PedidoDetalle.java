package com.proyecto.pis.proyecto_pis.model;

import jakarta.persistence.*;

@Entity
public class PedidoDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private producto producto;

    private int cantidad;
    private double precioUnitario;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public pedido getPedido() {
        return pedido;
    }

    public void setPedido(pedido pedido) {
        this.pedido = pedido;
    }

    public producto getProducto() {
        return producto;
    }

    public void setProducto(producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public double getSubtotal() {
        return precioUnitario * cantidad;
    }
}