CREATE SCHEMA IF NOT EXISTS `condominio` DEFAULT CHARACTER SET utf8mb4 ;
USE `condominio` ;

CREATE TABLE IF NOT EXISTS `condominio`.`proprietario` (
  `id_proprietario` INT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `telefone` VARCHAR(45) NULL,
  PRIMARY KEY (`id_proprietario`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `condominio`.`apartamento` (
  `id_apartamento` INT NULL AUTO_INCREMENT,
  `qtde_quartos` INT NULL,
  `nro_porta` INT NULL,
  `tipo` VARCHAR(45) NULL,
  `proprietario_id_proprietario` INT NOT NULL,
  PRIMARY KEY (`id_apartamento`, `proprietario_id_proprietario`),
  FOREIGN KEY (`proprietario_id_proprietario`)
    REFERENCES `condominio`.`proprietario` (`id_proprietario`))
ENGINE = InnoDB;
