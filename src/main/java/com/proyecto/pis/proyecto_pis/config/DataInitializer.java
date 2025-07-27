package com.proyecto.pis.proyecto_pis.config;

import com.proyecto.pis.proyecto_pis.model.Usuario;
import com.proyecto.pis.proyecto_pis.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Crear usuario administrador por defecto si no existe
        if (!usuarioRepository.existsByUsername("admin")) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@papasrevelo.com");
            admin.setNombre("Administrador");
            admin.setRol("ADMIN");
            admin.setEnabled(true);
            
            usuarioRepository.save(admin);
            System.out.println("Usuario administrador creado:");
            System.out.println("Usuario: admin");
            System.out.println("Contraseña: admin123");
        }

        // Crear usuario regular de prueba si no existe
        if (!usuarioRepository.existsByUsername("usuario")) {
            Usuario user = new Usuario();
            user.setUsername("usuario");
            user.setPassword(passwordEncoder.encode("usuario123"));
            user.setEmail("usuario@papasrevelo.com");
            user.setNombre("Usuario de Prueba");
            user.setRol("USER");
            user.setEnabled(true);
            
            usuarioRepository.save(user);
            System.out.println("Usuario de prueba creado:");
            System.out.println("Usuario: usuario");
            System.out.println("Contraseña: usuario123");
        }
    }
}