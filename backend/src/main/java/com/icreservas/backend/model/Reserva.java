package com.icreservas.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreSolicitante;
    private String email;
    private String institucion;
    private String telefono;
    private String descripcionUso;

    private LocalDate fecha;
    private String jornada;

    private boolean catering;
    private boolean cafeTea;
    private boolean otrasNecesidades;
    private boolean aceptacionCondiciones;

    private String personaResponsable;
    private String estado;
    private double presupuesto;
    private LocalDate fechaSolicitud;
}
