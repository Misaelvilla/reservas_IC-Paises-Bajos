package com.icreservas.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.icreservas.backend.model.Sala;
import com.icreservas.backend.repository.SalaRepository;

@RestController
@RequestMapping("/api/salas")
@CrossOrigin(origins = "*")
public class SalaController {

    @Autowired
    private SalaRepository salaRepository;

    @GetMapping
    public List<Sala> obtenerSalas() {
        return salaRepository.findAll();
    }

}
