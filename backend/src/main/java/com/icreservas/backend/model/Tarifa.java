package com.icreservas.backend.model;

import jakarta.persistence.*;
import lombok.*;

import com.icreservas.backend.model.Sala;
import com.icreservas.backend.model.FranjaHoraria;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarifa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sala_id", nullable = false)
    private Sala sala;

    @ManyToOne
    @JoinColumn(name = "franja_horaria_id", nullable = false)
    private FranjaHoraria franjaHoraria;

    private double precio;
    private String diaSemana;
}
