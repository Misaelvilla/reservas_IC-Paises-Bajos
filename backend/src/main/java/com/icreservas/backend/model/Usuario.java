package com.icreservas.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * 
 El Molde del Usuario
 Es tu modelo de datos, mapeado con JPA a la tabla usuario en la base de datos.

¿Qué hace?
Define los campos del usuario (id, email, contraseña, rol...).

Se conecta con la base de datos gracias a la anotación @Entity.

Piensa en él como:
El molde de galletas. Cada galleta (usuario) se crea según esta plantilla.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String password;
    private String rol;

}
