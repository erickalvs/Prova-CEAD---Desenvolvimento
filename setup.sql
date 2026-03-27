-- Script de configuração inicial do banco de dados
CREATE DATABASE IF NOT EXISTS cead_eventos;

-- Criação do usuário estagiário com permissões totais apenas no banco do projeto
CREATE USER IF NOT EXISTS 'cead_estagiario'@'localhost' IDENTIFIED BY 'cead2026';
GRANT ALL PRIVILEGES ON cead_eventos.* TO 'cead_estagiario'@'localhost';
FLUSH PRIVILEGES;
