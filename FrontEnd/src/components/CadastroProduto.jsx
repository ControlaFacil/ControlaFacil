import React, { useState } from 'react';
import styles from './style/CadastroProduto.module.css';

const OptionCard = ({ title, icon, onClick }) => (
    <div className={styles.card} onClick={onClick}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
    </div>
);

const CadastroFormulario = ({ form, handleChange, handleSubmit, setMode }) => (
    <div className={styles.formSection}>
        <button className={styles.backButton} onClick={() => setMode('selector')}>
            &larr; Voltar para Opções
        </button>
        <h1 className={styles.pageTitle}>Cadastro de Novo Produto</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="codigoProduto">Código do Produto*</label>
                <input
                    type="text"
                    id="codigoProduto"
                    name="codigoProduto"
                    value={form.codigoProduto}
                    onChange={handleChange}
                    required
                    placeholder="Ex: SKU001"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="nomeProduto">Nome do Produto*</label>
                <input
                    type="text"
                    id="nomeProduto"
                    name="nomeProduto"
                    value={form.nomeProduto}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Caneta Azul Esferográfica"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="quantidadeProduto">Quantidade em Estoque*</label>
                <input
                    type="number"
                    id="quantidadeProduto"
                    name="quantidadeProduto"
                    value={form.quantidadeProduto}
                    onChange={handleChange}
                    min="0"
                    required
                    placeholder="Ex: 100"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="precoProduto">Preço Unitário (R$)*</label>
                <input
                    type="number"
                    id="precoProduto"
                    name="precoProduto"
                    value={form.precoProduto}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                    placeholder="Ex: 2.50"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="descricao">Descrição*</label>
                <textarea
                    id="descricao"
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Categoria, tipo e modelo"
                    rows="4"
                />
            </div>

            <button type="submit" className={styles.actionBtn}>
                Cadastrar Produto
            </button>
        </form>
    </div>
);

const CadastroSelector = ({ setMode }) => (
    <div className={styles.selectorSection}>
        <h1 className={styles.selectorTitle}>O que deseja cadastrar?</h1>
        <p className={styles.selectorSubtitle}>Escolha uma das opções abaixo para iniciar o processo de cadastro.</p>
        <div className={styles.cardGrid}>
            <OptionCard 
                title="Cadastrar Produto" 
                icon="📦" 
                onClick={() => setMode('produto')} 
            />
            <OptionCard 
                title="Cadastrar Categoria" 
                icon="🏷️" 
                onClick={() => setMode('categoria')} 
            />
            <OptionCard 
                title="Cadastrar Tipo" 
                icon="🔖" 
                onClick={() => setMode('tipo')} 
            />
            <OptionCard 
                title="Cadastrar Modelo" 
                icon="📐" 
                onClick={() => setMode('modelo')} 
            />
        </div>
    </div>
);


export function CadastroProduto() {
    const [mode, setMode] = useState('selector'); 
    
    const [form, setForm] = useState({
        codigoProduto: '',
        nomeProduto: '',
        quantidadeProduto: '',
        precoProduto: '',
        descricao: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Produto cadastrado:", form);
        
        setForm({ 
            codigoProduto: '',
            nomeProduto: '',
            quantidadeProduto: '',
            precoProduto: '',
            descricao: ''
        });
        
        console.log("Sucesso! Redirecionando para /produtos...");
    };

    const renderContent = () => {
        switch (mode) {
            case 'produto':
                return (
                    <div className={styles.formWrapper}> 
                        <CadastroFormulario 
                            form={form} 
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit}
                            setMode={setMode} 
                        />
                    </div>
                );
            case 'categoria':
                return <h2 className={styles.comingSoon}>Cadastro de Categoria - Em breve...</h2>;
            case 'tipo':
                return <h2 className={styles.comingSoon}>Cadastro de Tipo - Em breve...</h2>;
            case 'modelo':
                return <h2 className={styles.comingSoon}>Cadastro de Modelo - Em breve...</h2>;
            case 'selector':
            default:
                return <CadastroSelector setMode={setMode} />;
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.containerSection}>
                {renderContent()}
            </div>
        </main>
    );
}