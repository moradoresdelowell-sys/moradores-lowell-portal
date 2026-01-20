<script>
// Verifica se está logado
if (!localStorage.getItem('adminLogado')) {
    window.location.href = 'login-admin.html';
}
</script>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - Moradores de Lowell</title>
    <link rel="stylesheet" href="style-login-admin.css">
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <img src="logo-moradores.png" alt="Logo">
            <h1>Painel Administrativo</h1>
            <p>Moradores de Lowell e Região</p>
        </div>
        
        <div class="login-body">
            <div id="mensagemErro" class="mensagem-erro"></div>
            
            <form id="formLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" required>
                </div>
                
                <button type="submit" class="btn-submit">Entrar</button>
            </form>
        </div>
        
        <div class="login-footer">
            <a href="#">Esqueceu a senha?</a>
        </div>
    </div>
    
    <script src="login-admin.js"></script>
</body>
</html>