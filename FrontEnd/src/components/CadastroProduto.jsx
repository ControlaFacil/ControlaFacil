import React, { useState } from 'react';
import styles from './style/CadastroProduto.module.css'; 

export function CadastroProduto() {
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
        
        // **IMPORTANTE: Removido o alert() conforme diretrizes de usabilidade.**
        
        // Simula o envio de dados e redirecionamento (substitua por lógica de API real)
        console.log("Sucesso! Redirecionando para /produtos...");
        // window.location.href = "/produtos"; 
    };

    return (
        <main className={styles.container}>
            <div className={styles.formSection}>
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
        </main>
    );
}