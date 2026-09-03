create table passageiro (
    id_passageiro bigint primary key,
    cpf varchar(11) not null unique,
    nome varchar(120) not null,
    data_nascimento date not null,
    email varchar(120) not null
);

create table aeroporto (
    id_aeroporto bigint primary key,
    codigo_iata char(3) not null unique,
    nome varchar(120) not null,
    cidade varchar(80) not null,
    pais varchar(80) not null
);

create table aeronave (
    id_aeronave bigint primary key,
    codigo varchar(20) not null unique,
    modelo varchar(80) not null,
    capacidade integer not null
);

create table voo (
    id_voo bigint primary key,
    numero_voo varchar(12) not null,
    data_hora_partida timestamp not null,
    data_hora_chegada timestamp not null,
    preco_base numeric(10,2) not null,
    id_aeroporto_origem bigint not null references aeroporto(id_aeroporto),
    id_aeroporto_destino bigint not null references aeroporto(id_aeroporto),
    id_aeronave bigint not null references aeronave(id_aeronave)
);

create table reserva (
    id_reserva bigint primary key,
    data_reserva timestamp not null,
    status varchar(20) not null,
    id_passageiro bigint not null references passageiro(id_passageiro)
);

create table reserva_voo (
    id_reserva bigint not null references reserva(id_reserva),
    id_voo bigint not null references voo(id_voo),
    assento varchar(5) not null,
    preco_pago numeric(10,2) not null,
    primary key (id_reserva, id_voo)
);