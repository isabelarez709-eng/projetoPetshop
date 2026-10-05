document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');
  const btnSalvar = document.getElementById('btnSalvar');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const btnCancelar = document.getElementById('btnCancelar');
  const successModal = document.getElementById('cadastroModal');
  const errorToast = document.getElementById('cadastroToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  // Simulação de e-mails duplicados para testar a RN-01
  const REGISTERED_EMAILS = ["isabela@edu.df.senac.br", "mateus@edu.df.senac.br", "joao@email.com"];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    // Referências dos elementos para validação
    const inputs = {
      nome: { val: document.getElementById('nomeCliente').value.trim(), input: document.getElementById('nomeCliente'), box: document.getElementById('nomeClienteField') },
      email: { val: document.getElementById('emailCliente').value.trim().toLowerCase(), input: document.getElementById('emailCliente'), box: document.getElementById('emailClienteField') },
      cpf: { val: document.getElementById('cpfCliente').value.replace(/\D/g, ''), input: document.getElementById('cpfCliente'), box: document.getElementById('cpfClienteField') },
      tel: { val: document.getElementById('telCliente').value.replace(/\D/g, ''), input: document.getElementById('telCliente'), box: document.getElementById('telClienteField') },
      nasc: { val: document.getElementById('nascCliente').value, input: document.getElementById('nascCliente'), box: document.getElementById('nascClienteField') },
      petNome: { val: document.getElementById('nomePet').value.trim(), input: document.getElementById('nomePet'), box: document.getElementById('nomePetField') },
      petRaca: { val: document.getElementById('racaPet').value.trim(), input: document.getElementById('racaPet'), box: document.getElementById('racaPetField') },
      petIdade: { val: document.getElementById('idadePet').value, input: document.getElementById('idadePet'), box: document.getElementById('idadePetField') },
      petPeso: { val: document.getElementById('pesoPet').value, input: document.getElementById('pesoPet'), box: document.getElementById('pesoPetField') }
    };

    let hasErrors = false;

    // RN-05: Validação do nome do cliente
    if (!inputs.nome.val) {
      invalidateField(inputs.nome, "O nome do cliente não pode estar vazio (RN-05).");
      hasErrors = true;
    }

    // RN-01: Validar se o e-mail é único no sistema
    if (!inputs.email.val || !inputs.email.val.includes('@')) {
      invalidateField(inputs.email, "Insira um formato de e-mail válido.");
      hasErrors = true;
    } else if (REGISTERED_EMAILS.includes(inputs.email.val)) {
      invalidateField(inputs.email, "Este e-mail já está associado a outro cliente (RN-01).");
      showToast("E-mail Duplicado", "A regra de negócio impede e-mails idênticos.");
      hasErrors = true;
    }

    // RN-02: CPF com 11 dígitos
    if (inputs.cpf.val.length !== 11) {
      invalidateField(inputs.cpf, "O CPF deve conter os 11 dígitos cadastrais (RN-02).");
      hasErrors = true;
    }

    // RN-04: Telefone com 11 dígitos
    if (inputs.tel.val.length !== 11) {
      invalidateField(inputs.tel, "O número deve conter 11 algarismos com o DDD (RN-04).");
      hasErrors = true;
    }

    // RN-03: Data de nascimento não pode ser futura
    if (inputs.nasc.val) {
      const selectedDate = new Date(inputs.nasc.val);
      if (selectedDate > new Date()) {
        invalidateField(inputs.nasc, "A data de nascimento é inválida ou futura (RN-03).");
        hasErrors = true;
      }
    } else {
      invalidateField(inputs.nasc, "A data de nascimento é obrigatória.");
      hasErrors = true;
    }

    // Validações da seção do PET
    if (!inputs.petNome.val) { invalidateField(inputs.petNome, "Nome do PET é obrigatório."); hasErrors = true; }
    if (!inputs.petRaca.val) { invalidateField(inputs.petRaca, "A raça do animal é obrigatória."); hasErrors = true; }
    if (!inputs.petIdade.val || inputs.petIdade.val < 0) { invalidateField(inputs.petIdade, "Idade inválida."); hasErrors = true; }
    if (!inputs.petPeso.val || inputs.petPeso.val < 0) { invalidateField(inputs.petPeso, "Peso inválido."); hasErrors = true; }

    if (hasErrors) return;

    // Simulação do Fluxo Alternativo A2 se digitar o email "rede@erro.com"
    if (inputs.email.val === "rede@erro.com") {
      setLoadingState(true);
      setTimeout(() => {
        setLoadingState(false);
        showToast("Falha de Conexão", "A rede falhou. Foram feitas 3 tentativas automáticas sem sucesso (Fluxo A2).");
      }, 1500);
      return;
    }

    // Execução do Fluxo Principal (Resposta rápida < 2s conforme RNF-01)
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);

      // Marca tudo com a validação visual de sucesso (Tela 3 do mockup)
      Object.keys(inputs).forEach(key => {
        inputs[key].box.classList.add('has-success');
        inputs[key].input.classList.add('valid');
      });

      // Abre o modal de sucesso do sistema PataSegura
      successModal.classList.add('show');
      console.log("LOG (RN-06): Novo cliente/PET criado e salvo em PostgreSQL com transações estáveis.");

      setTimeout(() => {
        successModal.classList.remove('show');
        form.reset();
        clearErrors();
      }, 2500);

    }, 1200);
  });

  function invalidateField(fieldObj, msg) {
    fieldObj.box.classList.add('has-error');
    fieldObj.input.classList.add('invalid');
    const errText = fieldObj.box.querySelector('.error');
    if (errText) errText.textContent = msg;
  }

  function clearErrors() {
    document.querySelectorAll('.field').forEach(f => f.classList.remove('has-error', 'has-success'));
    document.querySelectorAll('.field input').forEach(i => i.classList.remove('invalid', 'valid'));
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      btnSalvar.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Salvando dados...';
    } else {
      btnSalvar.disabled = false;
      btnSpinner.style.display = 'none';
      btnText.textContent = 'Salvar Registro';
    }
  }

  function showToast(title, msg) {
    toastTitle.textContent = title;
    toastMessage.textContent = msg;
    errorToast.classList.add('show');
    setTimeout(() => errorToast.classList.remove('show'), 4000);
  }

  btnCancelar.addEventListener('click', () => {
    if (confirm("Deseja redefinir o formulário? Todos os campos digitados serão perdidos.")) {
      form.reset();
      clearErrors();
    }
  });
});
