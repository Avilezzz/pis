
      function editarProducto(
        id,
        nombre,
        descripcion,
        tipo,
        precio,
        imagenUrl
      ) {
        document.getElementById("editId").value = id;
        document.getElementById("editNombre").value = nombre;
        document.getElementById("editDescripcion").value = descripcion || "";
        document.getElementById("editTipo").value = tipo;
        document.getElementById("editPrecio").value = precio;
        document.getElementById("editImagenUrl").value = imagenUrl || "";

        const modal = new bootstrap.Modal(
          document.getElementById("editarProductoModal")
        );
        modal.show();
      }

      function confirmarEliminar(id, nombre) {
        document.getElementById("idProductoEliminar").value = id;
        document.getElementById("nombreProductoEliminar").textContent = nombre;

        const modal = new bootstrap.Modal(
          document.getElementById("eliminarProductoModal")
        );
        modal.show();
      }

      document.querySelectorAll(".btn-editar").forEach(function (button) {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          const nombre = this.getAttribute("data-nombre");
          const descripcion = this.getAttribute("data-descripcion");
          const tipo = this.getAttribute("data-tipo");
          const precio = this.getAttribute("data-precio");
          const imagen = this.getAttribute("data-imagen");

          editarProducto(id, nombre, descripcion, tipo, precio, imagen);
        });
      });

      // Botones de eliminar
      document.querySelectorAll(".btn-eliminar").forEach(function (button) {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          const nombre = this.getAttribute("data-nombre");

          confirmarEliminar(id, nombre);
        });
      });
