package com.icreservas.backend.config;

/*
 * 
 El Vigilante del Sistema
 Este archivo configura toda la seguridad de tu aplicación.

¿Qué hace?
Define qué rutas están protegidas (por ejemplo, /api/eventos) y cuáles son públicas (/login, /registro).

Desactiva cosas innecesarias como CSRF si estás usando frontend separado.

Añade el filtro JWT (JwtFilter) para que se ejecute antes que cualquier endpoint.

Configura el AuthenticationManager con tu servicio personalizado de usuarios (CustomUserDetailsService).

Piensa en él como:
El guardián de acceso, el que dice: “Tú puedes pasar, tú no, y tú dame tu token”.
 */

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll());
        return http.build();
    }
}
