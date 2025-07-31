package com.proyecto.pis.proyecto_pis.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    
    @GetMapping("/login")
    public String login() {
        return "login"; // debe ser login.html
    }

    @GetMapping("/")
    public String homeRedirect() {
        return "redirect:/admin/pedido";
    }
}