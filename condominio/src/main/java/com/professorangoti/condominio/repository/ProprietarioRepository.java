package com.professorangoti.condominio.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.professorangoti.condominio.model.Proprietario;

@Repository
public class ProprietarioRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public void save(Proprietario proprietario) {
        String sql = "INSERT INTO proprietario(nome, telefone) VALUES (?, ?);";
        jdbc.update(sql, proprietario.getNome(), proprietario.getTelefone());
    }

    public List<Proprietario> findAll() {
        String sql = "SELECT * FROM proprietario;";
        return jdbc.query(sql, (registro, contador) -> new Proprietario(
                registro.getLong("id_proprietario"),
                registro.getString("nome"),
                registro.getString("telefone")
        ));
    }

    public String buscarTelefonePorNome(String nome) {
        String sql = "SELECT telefone FROM proprietario WHERE nome = ?;";
        return jdbc.queryForObject(sql, String.class, nome);
    }

    public Integer contarProprietarios() {
        String sql = "SELECT COUNT(*) FROM proprietario;";
        return jdbc.queryForObject(sql, Integer.class);
    }
}
