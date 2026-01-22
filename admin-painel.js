/* admin-painel.css - COMPLETO */

.admin-painel {
    max-width: 1200px;
    margin: 100px auto 50px;
    padding: 2rem;
}

.painel-header {
    text-align: center;
    margin-bottom: 3rem;
}

.painel-header h1 {
    color: #e74c3c; /* VERMELHO do logo */
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
}

.painel-header p {
    color: #666;
    font-size: 1.2rem;
}

.admin-info {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.admin-info strong {
    color: #2c3e50;
}

.admin-info small {
    color: #6c757d;
}

.estatisticas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
}

.estatistica-card {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.estatistica-card:hover {
    transform: translateY(-3px);
}

.estatistica-numero {
    font-size: 2rem;
    font-weight: bold;
    color: #e74c3c; /* VERMELHO */
}

.estatistica-label {
    color: #666;
    font-size: 0.9rem;
}

.opcoes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.opcao-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
}

.opcao-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.opcao-icone {
    font-size: 3rem;
    color: #e74c3c; /* VERMELHO */
    margin-bottom: 1rem;
}

.opcao-titulo {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
}

.opcao-descricao {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
}

.btn-sair {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-sair:hover {
    background: #c82333;
}

/* RESPONSIVO */
@media (max-width: 768px) {
    .admin-painel {
        margin: 20px;
        padding: 1.5rem;
    }
    
    .admin-info {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .estatisticas {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .opcoes-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .estatisticas {
        grid-template-columns: 1fr;
    }
    
    .painel-header h1 {
        font-size: 2rem;
    }
}

// Executa automaticamente quando entra no painel (apenas uma vez)
if (!localStorage.getItem('bancoInicializado')) {
    setTimeout(() => {
        if (confirm('Deseja inicializar o banco de dados com dados de exemplo?')) {
            inicializarBancoDados();
            localStorage.setItem('bancoInicializado', 'true');
        }
    }, 2000);
}