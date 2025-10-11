
CREATE TABLE Usuario (
    id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(30) NOT NULL UNIQUE,
    celular VARCHAR(20),
    cargo VARCHAR(100),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    excluido TINYINT(1) DEFAULT 0,
    senhaHash TEXT NOT NULL
);

--
-- Tabela: Integracao (Catálogo de integrações disponíveis)
--
CREATE TABLE Integracao (
    id INT UNSIGNED primary KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

--
-- Tabela: IntegracaoAtiva (Configuração de integrações ativas - Implementação 1:1)
--
CREATE TABLE IntegracaoAtiva (
    id INT UNSIGNED primary key NOT NULL AUTO_INCREMENT,
    integracao_id INT UNSIGNED NOT NULL UNIQUE,
    
    -- Definição da Chave Estrangeira (FK)
    FOREIGN KEY (integracao_id) 
        REFERENCES Integracao(id)
        -- ON DELETE RESTRICT: Se uma Integracao for deletada, a IntegracaoAtiva não pode existir.
        ON DELETE RESTRICT 
        -- ON UPDATE CASCADE: Se o ID da Integracao mudar (raro), o FK é atualizado.
        ON UPDATE CASCADE
);