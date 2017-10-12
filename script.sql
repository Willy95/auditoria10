-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema auditoria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema auditoria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `auditoria` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci ;
USE `auditoria` ;

-- -----------------------------------------------------
-- Table `auditoria`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auditoria`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `token` VARCHAR(100) NOT NULL,
  `remember_token` VARCHAR(100) NULL,
  `role` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `auditoria`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `auditoria`;
INSERT INTO `auditoria`.`users` (`id`, `email`, `password`, `status`, `token`, `remember_token`, `role`, `created_at`, `updated_at`) VALUES (1, 'root@admin.com', '$2a$10$X8T4arjdknnCTN9FW78P/eq9wlcQuNsh1HYr5P.11Q9mh.YSo2ySi', DEFAULT, '122131', NULL, 'Administer', NULL, NULL);

COMMIT;

