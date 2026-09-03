package com.professorangoti.condominio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.professorangoti.condominio.model.Apartamento;
import com.professorangoti.condominio.repository.ApartamentoRepository;
import com.professorangoti.condominio.repository.ProprietarioRepository;

@Controller
public class ApartamentoController {

    @Autowired
    private ApartamentoRepository repository;

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @GetMapping("cad_apto")
    public String formCadastroApartamento(Model model) {
        model.addAttribute("apartamento", new Apartamento());
        model.addAttribute("proprietarios", proprietarioRepository.findAll());
        return "form_apto";
    }

    @PostMapping("cad_apto")
    public String gravaNovoApartamento(Apartamento apartamento) {
        repository.save(apartamento);
        return "redirect:/rel_apto";
    }

    @GetMapping("rel_apto")
    public String relatorio(Model model) {
        model.addAttribute("apartamentos", repository.findAll());
        return "rel_apto";
    }
}
