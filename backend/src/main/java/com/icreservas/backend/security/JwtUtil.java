package com.icreservas.backend.security;

/*
 * 
 El Creador y Validador de Tokens
 Intercepta todas las peticiones que entran a tu backend y revisa el token.

¿Qué hace?
Lee el token JWT del header Authorization.

Extrae el usuario.

Carga sus detalles (con CustomUserDetailsService).

Si todo es válido, le da permiso a la petición para continuar.

Piensa en él como:
El guardia del edificio que escanea tu pase (token) antes de dejarte pasar al piso 5 (endpoints protegidos).
 */
public class JwtUtil {

}
