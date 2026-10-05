document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailField = document.getElementById('emailField');
  const passwordField = document.getElementById('passwordField');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const successModal = document.getElementById('successModal');
  const errorToast = document.getElementById('errorToast');
  const toastMessage = document.getElementById('toastMessage');

  // Controle de estado (RN-04: Bloqueio de conta após 5 tentativas)
  let loginAttempts = 0;
  const MAX_ATTEMPTS = 5;
  let isBlocked = false;

  // Credenciais simuladas para testes (Baseado nas regras e contexto)
  const MOCK_CREDENTIALS = {
    email: "funcionario@patasegura.com",
    password: "senha123"
  };

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Se a conta estiver bloqueada por excesso de tentativas, barra imediatamente
    if (isBlocked) {
      showToast("Sua conta foi bloqueada temporariamente após 5 tentativas consecutivas inválidas (RN-04).");
      return;
    }

    // Reset de estados visuais das validações anteriores
    clearErrors();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    let hasValidationError = false;

    // 1. Validação local do preenchimento básico dos campos
    if (!emailValue) {
      showInputError(emailField, emailInput, "O e-mail é obrigatório para autenticação.");
      hasValidationError = true;
    }
    if (!passwordValue) {
      showInputError(passwordField, passwordInput, "A senha é obrigatória para autenticação.");
      hasValidationError = true;
    }

    if (hasValidationError) return;

    // 2. Estado de Autenticação em Andamento (Tela 2 do Mockup / RNF-01)
    setLoadingState(true);

    // Simulação do tempo de resposta do servidor (Mínimo de 1s para o usuário ver o feedback, máximo inferior a 2s conforme RNF-01)
    setTimeout(() => {
      
      // Simulação do Fluxo Alternativo A3: Erro no Banco de Dados (Exemplo simulado se digitar "db@erro.com")
      if (emailValue === "db@erro.com") {
        setLoadingState(false);
        showToast("Não foi possível conectar ao banco de dados do PataSegura. Tente novamente mais tarde (Fluxo A3).");
        return;
      }

      // Validação das Regras de Negócio
      const isEmailValid = (emailValue === MOCK_CREDENTIALS.email);
      const isPasswordValid = (passwordValue === MOCK_CREDENTIALS.password);

      if (!isEmailValid) {
        // Fluxo Alternativo A2: Usuário Inexistente (RN-01)
        setLoadingState(false);
        showInputError(emailField, emailInput, "O e-mail informado não está cadastrado no sistema (RN-01).");
        registerAttempt();
        return;
      }

      if (!isPasswordValid) {
        // Fluxo Alternativo A1: Credenciais Inválidas (RN-02)
        setLoadingState(false);
        showInputError(passwordField, passwordInput, "A senha informada está incorreta para este usuário (RN-02).");
        registerAttempt();
        return;
      }

      // 3. Pós-Condição: Sucesso (Tela 3 do Mockup / RN-05 Log de Acesso)
      setLoadingState(false);
      showInputSuccess(emailField, emailInput);
      showInputSuccess(passwordField, passwordInput);
      
      // Exibe o modal de sucesso do PataSegura
      successModal.classList.add('show');
      console.log("LOG (RN-05): Autenticação realizada com sucesso para: " + emailValue);

     setTimeout(() => {
         window.location.href = "../Semana-01\RF-001-cadastro-cliente/index.html"; 
}, 2000);



  // Função auxiliar para controlar o estado do botão (Loading)
  function setLoadingState(isLoading) {
    if (isLoading) {
      btnSubmit.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Validando credenciais...';
    } else {
      btnSubmit.disabled = false;
      btnSpinner.style.display = 'none';
      btnText.textContent = 'Entrar';
    }
  }

  // Exibe o erro visual na estrutura herdada do seu HTML/CSS antigo
  function showInputError(fieldElement, inputElement, message) {
    fieldElement.classList.add('has-error');
    inputElement.classList.add('invalid');
    inputElement.classList.remove('valid');
    
    // Altera o texto do elemento small de erro daquele campo
    const errorMsgElement = fieldElement.querySelector('.error');
    if (errorMsgElement) {
      errorMsgElement.textContent = message;
    }
  }

  // Exibe a borda verde e o checkmark de sucesso
  function showInputSuccess(fieldElement, inputElement) {
    fieldElement.classList.remove('has-error');
    fieldElement.classList.add('has-success');
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
  }

  // Limpa as mensagens e classes de validação dos campos
  function clearErrors() {
    [emailField, passwordField].forEach(field => {
      field.classList.remove('has-error', 'has-success');
    });
    [emailInput, passwordInput].forEach(input => {
      input.classList.remove('invalid', 'valid');
    });
  }

  // Controle de tentativas inválidas e bloqueio (RN-04)
  function registerAttempt() {
    loginAttempts++;
    console.warn(`LOG (RN-05): Tentativa de login inválida registrada. Total: ${loginAttempts}/${MAX_ATTEMPTS}`);
    
    if (loginAttempts >= MAX_ATTEMPTS) {
      isBlocked = true;
      showToast("Conta bloqueada temporariamente devido a 5 tentativas incorretas (RN-04).");
    }
  }

  // Exibe o balão Toast de erro geral na tela por 4 segundos
  function showToast(message) {
    toastMessage.textContent = message;
    errorToast.classList.add('show');
    
    setTimeout(() => {
      errorToast.classList.remove('show');
    }, 4000);
  }
});
