document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recuperarForm');
  const emailInput = document.getElementById('email');
  const emailField = document.getElementById('emailField');
  const emailError = document.getElementById('emailError');
  
  const btnContinuar = document.getElementById('btnContinuar');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const lnkVoltar = document.getElementById('lnkVoltar');
  
  // Elementos dos Modais (Telas de Estado 2 e 3 do Mockup)
  const modalSucesso = document.getElementById('modalSucesso');
  const modalNaoEncontrado = document.getElementById('modalNaoEncontrado');
  const btnSucessoVoltar = document.getElementById('btnSucessoVoltar');
  const btnTentarNovamente = document.getElementById('btnTentarNovamente');

  // Base de dados simulada contendo os integrantes do grupo (RN-02)
  const REGISTERED_USERS = [
    "isabela61850856@edu.df.senac.br",
    "mateus62355366@edu.df.senac.br",
    "joao60732706@edu.df.senac.br",
    "funcionario@patasegura.com"
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidationError();

    const emailValue = emailInput.value.trim();

    // Fluxo Alternativo A1: Campo obrigatório não preenchido
    if (!emailValue) {
      setFieldInvalid("Por favor, informe seu e-mail institucional.");
      return;
    }

    // Fluxo Alternativo A3: E-mail inválido (RN-01)
    if (!validateEmailFormat(emailValue)) {
      setFieldInvalid("Formato de e-mail inválido. Certifique-se de usar '@' e um domínio válido.");
      return;
    }

    // Ativa animação de carregamento (RNF-01 - Controle de Resposta)
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Fluxo Alternativo A2: E-mail não encontrado (RN-02)
      if (!REGISTERED_USERS.includes(emailValue.toLowerCase())) {
        modalNaoEncontrado.classList.add('show');
        return;
      }

      // Fluxo Principal: Sucesso (Tela 2 do Mockup / RN-04)
      emailField.classList.add('has-success');
      emailInput.classList.add('valid');
      modalSucesso.classList.add('show');
      console.log(`LOG (RNF-05): Solicitação processada com sucesso. Token de redefinição vinculado ao usuário associado.`);

    }, 1200); // Resposta simulada em 1.2 segundos (Cumpre RNF-01 < 2s)
  });

  // Ações de navegação e fechamento de Modais
  btnTentarNovamente.addEventListener('click', () => {
    modalNaoEncontrado.classList.remove('show');
    emailInput.focus();
    emailInput.select();
  });

  // Retorno para a tela de login (RN-05)
 // Dentro de recuperar-senha.js, atualize a função para:
  const handleBackToLogin = () => {
  window.location.href = "../Semana-02\RF-002-login-cliente/index.html"; 
};

  lnkVoltar.addEventListener('click', (e) => { e.preventDefault(); handleBackToLogin(); });
  btnSucessoVoltar.addEventListener('click', handleBackToLogin);

  // Funções Auxiliares
  function validateEmailFormat(email) {
    // Regex simples e performática para validar regras de formato de e-mail (RN-01)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
    return re.test(email);
  }

  function setFieldInvalid(message) {
    emailField.classList.add('has-error');
    emailInput.classList.add('invalid');
    emailError.textContent = message;
  }

  function clearValidationError() {
    emailField.classList.remove('has-error', 'has-success');
    emailInput.classList.remove('invalid', 'valid');
  }

  function setLoading(isLoading) {
    if (isLoading) {
      btnContinuar.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Processando...';
    } else {
      btnContinuar.disabled = false;
      btnSpinner.style.display = 'none';
      btnText.textContent = 'Continuar';
    }
  }
});
