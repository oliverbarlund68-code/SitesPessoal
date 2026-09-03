package com.professorangoti.condominio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Apartamento {
    private Long id;
    private Proprietario proprietario;
    private int quantidadeDeQuartos;
    private int numeroDoApartamento;
    private String tipoDeOcupacao;
}
