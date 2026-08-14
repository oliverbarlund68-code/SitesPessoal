package br.edu.iftm.mvc_thymeleaf_demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ThreadLocalRandom;

@Controller
public class SorteioController {

    // Lista na memória mantida enquanto a aplicação estiver rodando
    private final List<Set<Integer>> historico = new ArrayList<>();

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("historico", historico);
        return "index";
    }

    @GetMapping("/sortear")
    public String sortear(Model model) {
        Set<Integer> numeros = new TreeSet<>();
        while (numeros.size() < 6) {
            numeros.add(ThreadLocalRandom.current().nextInt(1, 61));
        }

        // Adiciona no início da lista (índice 0) para o mais recente ficar em primeiro
        historico.add(0, numeros);

        model.addAttribute("numerosAtuais", numeros);
        model.addAttribute("historico", historico);
        return "index";
    }

    @GetMapping("/limpar")
    public String limpar() {
        historico.clear(); // Limpa a lista na memória
        return "redirect:/"; // Redireciona para a página inicial
    }
}