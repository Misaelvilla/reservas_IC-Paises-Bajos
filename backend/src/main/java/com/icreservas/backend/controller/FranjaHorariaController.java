package com.icreservas.backend.controller;

import com.icreservas.backend.model.FranjaHoraria;
import com.icreservas.backend.repository.FranjaHorariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/franjas")
@CrossOrigin(origins = "*")
public class FranjaHorariaController {

    @Autowired
    private FranjaHorariaRepository franjaRepo;

    @GetMapping
    private List<FranjaHoraria> obtenerFranjas() {
        return franjaRepo.findAll();
    }
}
