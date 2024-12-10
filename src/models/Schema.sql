DROP DATABASE IF EXISTS bookmanager;
CREATE DATABASE bookmanager;
USE bookmanager;

CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    editora VARCHAR(255),
    genero ENUM('ficcao', 'romance', 'tecnico', 'fantasia', 'biografia', 'outro') DEFAULT 'ficcao', 
    formato ENUM('fisico', 'digital') NOT NULL DEFAULT 'fisico',
    outro_genero VARCHAR(50),
    status ENUM('não lido', 'lido', 'lendo', 'abandonado') NOT NULL DEFAULT 'não lido',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO livros (titulo, autor, editora, formato, genero, outro_genero, status, data_criacao)
VALUES 
    ('A Redoma de Vidro', 'Sylvia Plath', 'Biblioteca Azul', 'fisico', 'Ficção', NULL, 'lendo', NOW()), 
    ('Babel', 'R. F. Kuang', 'Intrinseca', 'digital', 'Ficção', NULL, 'não lido', NOW()), 
    ('Percy Jackson e o Ladrão de Raios', 'Rick Riordan', 'Instrinseca', 'fisico', 'Fantasia', NULL, 'lido', NOW()),
    ('A Toca das Raposas', 'Nora Sakavic', 'Galera Record', 'digital', 'ficcao', NULL, 'lido', NOW()),  
    ('Noites Brancas', 'Fyodor Dostoevsky', 'Antofagica', 'fisico', 'romance', NULL, 'lendo', NOW()), 
    ('Tudo é Rio', 'Carla Madeira', 'Galera Record', 'digital', 'outro', 'Drama', 'não lido', NOW()), 
    ('O Iluminado', 'Stephen King', 'Suma', 'fisico', 'outro', 'Terror', 'abandonado', NOW()), 
    ('Amanhã, Amanhã, e Ainda Outro Amanhã', 'Gabrielle Zevin', 'Rocco', 'fisico', 'outro', 'Ficção Científica', 'não lido', NOW()),
    ('Conectadas', 'Clara Alves', 'Seguinte', 'digital', 'romance', NULL, 'lido', NOW()), 
    ('Assassinato no Expresso Oriente', 'Agatha Christie', 'Harper Collins', 'fisico', 'outro', 'Mistério', 'lendo', NOW()), 
    ('Rita Lee: Uma Autobiografia', 'Rita Lee', 'Globo Livros', 'digital', 'biografia', NULL, 'não lido', NOW());

SHOW TABLES;
DESCRIBE livros;

SELECT * FROM livros;