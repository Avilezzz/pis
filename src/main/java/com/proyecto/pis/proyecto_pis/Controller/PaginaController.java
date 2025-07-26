package com.proyecto.pis.proyecto_pis.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginaController {

    @GetMapping("/")
    public String mostrarInicio() {
        return "html/index"; // Vista: templates/html/index.html
    }

  

    @GetMapping("/contacto")
    public String mostrarContacto() {
        return "html/contacto"; // Vista: templates/html/contacto.html
    }
}
