create table Endereco (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	rua VARCHAR (255) NOT NULL,
	numero INT NULL,
	bairro VARCHAR (255) NULL,
	cidade VARCHAR (255) NOT NULL,
	estado CHAR (2) NOT NULL,
	cep VARCHAR (8) NOT NULL,
	complemento VARCHAR (150) NULL
) 

create table Usuario (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	endereco INT FOREIGN KEY REFERENCES Endereco(id),
	apelidoEmpresa VARCHAR(255) NOT NULL,
	cnpj CHAR(14) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE,
	telefone VARCHAR(15),
	senhaHash VARCHAR (255) NOT NULL
)

create table Parceiro (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	endereco INT FOREIGN KEY REFERENCES Endereco(id),
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	razaoSocial VARCHAR (255) NOT NULL,
	cnpj CHAR(14) UNIQUE NOT NULL,
	nomeFantasia VARCHAR (255) NULL,
	TipoParceiro VARCHAR(20) NOT NULL CHECK (TipoParceiro IN ('fornecedor', 'transportadora')),
	email VARCHAR(100) UNIQUE,
	telefone VARCHAR(15),
	criadoEm DATETIME DEFAULT GETDATE()
) 

create table Relatorio (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	nomeRelatorio VARCHAR(30) NOT NULL,
	descricao TEXT NULL,
	tipoRelatorio VARCHAR(20) NOT NULL CHECK (
		tipoRelatorio IN (
			'personalizado',
			'estoque',
			'produto',
			'pedido',
			'devolucao',
			'parceiros'
		)
	),
	retornoJson TEXT,
	criadoEm DATETIME DEFAULT GETDATE(),
	dataModificacao DATETIME DEFAULT GETDATE()
) -- TRIGGER PARA MODIFICAR A dataModificacao quando atualizar os dados, ver depois
--CREATE TRIGGER TRG_AtualizaDataModificacao
--ON Relatorio
--AFTER UPDATE
--AS
--BEGIN
--SET NOCOUNT ON;
--UPDATE Relatorio
--SET dataModificacao = GETDATE()
--FROM Relatorio R
--INNER JOIN inserted i ON R.id = i.id;
--END;

create table CategoriaProduto (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	nome VARCHAR(255) NOT NULL
) 

create table TipoProduto (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	idCategoriaProduto INT FOREIGN KEY REFERENCES CategoriaProduto(id),
	nome VARCHAR(255) NOT NULL
) 

create table ModeloProduto (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	idCategoriaProduto INT FOREIGN KEY REFERENCES CategoriaProduto(id),
	idTipoProduto INT FOREIGN KEY REFERENCES TipoProduto(id),
) 

create table Produto (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	idParceiro INT FOREIGN KEY REFERENCES Parceiro(id),
	idCategoriaProduto INT FOREIGN KEY REFERENCES CategoriaProduto(id),
	idTipoProduto INT FOREIGN KEY REFERENCES TipoProduto(id),
	idModeloProduto INT FOREIGN KEY REFERENCES ModeloProduto(id),
	nome VARCHAR(255) NOT NULL,
	descricao TEXT NULL,
	preco DECIMAL (10, 2)
) 

create table Estoque (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	idProduto INT FOREIGN KEY REFERENCES Produto(id),
	qtdDisponivel INT NULL,
	estoqueMinimo INT NULL,
	dataAtualizacao DATETIME DEFAULT GETDATE()
) -- TRIGGER PARA MODIFICAR A dataAtualizacao quando atualizar os dados, ver depois
--CREATE TRIGGER TRG_AtualizaDataModificacao
--ON Relatorio
--AFTER UPDATE
--AS
--BEGIN
--SET NOCOUNT ON;
--UPDATE Relatorio
--SET dataModificacao = GETDATE()
--FROM Relatorio R
--INNER JOIN inserted i ON R.id = i.id;
--END;


create table Pedidos (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	idParceiro INT FOREIGN KEY REFERENCES Parceiro(id),
	idEcommerce BIGINT,
	idEnvio BIGINT,
	idComprador BIGINT,
	idPagamento BIGINT,
	nomeComprador VARCHAR (150),
	dataPedido DATE,
	dataEntrega DATE,
	statusPedido VARCHAR (255),
	tags TEXT,
	statusPagamento VARCHAR(50),
	metodoPagamento VARCHAR(50),
	valorTotal DECIMAL (10, 2),
	origem VARCHAR(50) DEFAULT 'Mercado Livre'
) 

create table ItensPedido (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idProduto INT FOREIGN KEY REFERENCES Produto(id),
	idPedido INT FOREIGN KEY REFERENCES Pedidos(id),
	quantidade INT,
	precoUnitario DECIMAL (10, 2)
) 

create table Devolucao (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idPedido INT FOREIGN KEY REFERENCES Pedidos(id),
	idEcommerce BIGINT,
	idDevolucaoEcommerce BIGINT,
	idComprador BIGINT,
	motivo TEXT,
	statusDevolucao VARCHAR (255),
	dataSolicitacao DATE,
	dataAtualizacao DATE,
	origem VARCHAR(50) DEFAULT 'Mercado Livre'
) 

create table ItensDevolucao (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idDevolucao INT FOREIGN KEY REFERENCES Devolucao(id),
	idProduto INT FOREIGN KEY REFERENCES Produto(id),
	quantidade INT
)

create table Vinculo_Parceiro_Endereco (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idParceiro INT FOREIGN KEY REFERENCES Parceiro(id),
	idEndereco INT FOREIGN KEY REFERENCES Endereco(id),
)

create table Vinculo_Usuario_Endereco (
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	idUsuario INT FOREIGN KEY REFERENCES Usuario(id),
	idEndereco INT FOREIGN KEY REFERENCES Endereco(id),
)