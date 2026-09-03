package com.professorangoti.condominio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.professorangoti.condominio.model.Proprietario;
import com.professorangoti.condominio.repository.ProprietarioRepository;

@Controller
public class ProprietarioController {

    @Autowired
    private ProprietarioRepository repository;

    @GetMapping("cad_prop")
    public String formCadastroProprietario(Model model) {
        model.addAttribute("proprietario", new Proprietario());
        return "form_prop";
    }

    @PostMapping("cad_prop")
    public String gravaNovoProprietario(Proprietario proprietario) {
        repository.save(proprietario);
        return "redirect:/rel_prop";
    }

    @GetMapping("rel_prop")
    public String relatorio(Model model) {
        model.addAttribute("proprietarios", repository.findAll());
        return "rel_prop";
    }
}
