package com.professorangoti.condominio.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.professorangoti.condominio.model.Apartamento;
import com.professorangoti.condominio.model.Proprietario;

@Repository
public class ApartamentoRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public void save(Apartamento apartamento) {
        String sql = "INSERT INTO apartamento(qtde_quartos, nro_porta, tipo, proprietario_id_proprietario) VALUES (?, ?, ?, ?);";
        jdbc.update(sql,
                apartamento.getQuantidadeDeQuartos(),
                apartamento.getNumeroDoApartamento(),
                apartamento.getTipoDeOcupacao(),
                apartamento.getProprietario().getId());
    }

    public List<Apartamento> findAll() {
        String sql = "SELECT * FROM apartamento a INNER JOIN proprietario p ON a.proprietario_id_proprietario = p.id_proprietario;";
        return jdbc.query(sql, (registro, contador) -> {
            Apartamento apto = new Apartamento();
            apto.setId(registro.getLong("id_apartamento"));
            apto.setNumeroDoApartamento(registro.getInt("nro_porta"));
            apto.setQuantidadeDeQuartos(registro.getInt("qtde_quartos"));
            apto.setTipoDeOcupacao(registro.getString("tipo"));

            Proprietario proprietario = new Proprietario();
            proprietario.setId(registro.getLong("id_proprietario"));
            proprietario.setNome(registro.getString("nome"));
            proprietario.setTelefone(registro.getString("telefone"));

            apto.setProprietario(proprietario);
            return apto;
        });
    }

    public Integer contarApartamentos() {
        String sql = "SELECT COUNT(*) FROM apartamento;";
        return jdbc.queryForObject(sql, Integer.class);
    }
}
