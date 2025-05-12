package com.icreservas.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private int capacidad_maxima;
    private Integer superficie_m2;
    private String tipo;
    private String recursos_disponibles;
    private boolean alquilable;
    private String planta;

    @Column(name = "grid_column")
    private String gridColumn;

    @Column(name = "grid_row")
    private String gridRow;

}
