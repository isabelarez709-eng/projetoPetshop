document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservaForm');
  const selectTutor = document.getElementById('selectTutor');
  const selectPet = document.getElementById('selectPet');
  const selectAcomodacao = document.getElementById('selectAcomodacao');
  const inputCheckin = document.getElementById('inputCheckin');
  const inputCheckout = document.getElementById('inputCheckout');
  
  const btnReservar = document.getElementById('btnReservar');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const successModal = document.getElementById('reservaModal');
  const errorToast = document.getElementById('reservaToast');
  const toastMessage = document.getElementById('toastMessage');

  const PETS_BY_TUTOR = {
    joao: ["Thor (Golden Retriever)"],
    isabela: ["Luna (Poodle)", "Pipoca (Chihuahua)"],
    mateus: ["Zeus (Bulldog)"]
  };

  selectTutor.addEventListener('change', () => {
    const tutor = selectTutor.value;
    selectPet.innerHTML = "";

    if (!tutor || !PETS_BY_TUTOR[tutor]) {
      selectPet.disabled = true;
      selectPet.innerHTML = '<option value="">Selecione o tutor primeiro...</option>';
      return;
    }

    selectPet.disabled = false;
    selectPet.innerHTML = '<option value="">Selecione o PET...</option>';
    PETS_BY_TUTOR[tutor].forEach(pet => {
      const opt = document.createElement('option');
      opt.value = pet.toLowerCase().replace(/\s/g, '-');
      opt.textContent = pet;
      selectPet.appendChild(opt);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let hasErrors = false;

    if (!selectTutor.value) { setFieldError('tutorField'); hasErrors = true; }
    if (!selectPet.value) { setFieldError('petField'); hasErrors = true; }
    if (!selectAcomodacao.value) { setFieldError('acomodacaoField'); hasErrors = true; }
    if (!inputCheckin.value) { setFieldError('checkinField'); hasErrors = true; }
    if (!inputCheckout.value) { setFieldError('checkoutField'); hasErrors = true; }

    // RN-02: Data de check-out deve ser posterior ao check-in
    if (inputCheckin.value && inputCheckout.value) {
      const checkinDate = new Date(inputCheckin.value);
      const checkoutDate = new Date(inputCheckout.value);

      if (checkoutDate <= checkinDate) {
        setFieldError('checkoutField');
        showToast("Consistência de Datas: A data de saída (Check-out) deve ser posterior ao dia de entrada.");
        hasErrors = true;
      }
    }

    if (hasErrors) return;

    // Simulação da RN-03: Indisponibilidade de vagas na suíte "vip"
    if (selectAcomodacao.value === "vip") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        showToast("Lotação Máxima: Não há vagas remanescentes para a Suíte VIP no intervalo selecionado (RN-03).");
      }, 700);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      successModal.classList.add('show');
      console.log("LOG (RN-03): Reserva salva com sucesso na base PostgreSQL.");

      setTimeout(() => {
        successModal.classList.remove('show');
        form.reset();
        selectPet.disabled = true;
        selectPet.innerHTML = '<option value="">Selecione o tutor primeiro...</option>';
      }, 2500);
    }, 1200);
  });

  function setFieldError(fieldId) {
    document.getElementById(fieldId).classList.add('has-error');
  }

  function clearErrors() {
    document.querySelectorAll('.field').forEach(f => f.classList.remove('has-error'));
  }

  function setLoading(isLoading) {
    if (isLoading) {
      btnReservar.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Alocando vaga...';
    } else {
      btnReservar.disabled = false;
      btnSpinner.style.display = 'none';
      btnText.textContent = 'Confirmar Reserva';
    }
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    errorToast.classList.add('show');
    setTimeout(() => errorToast.classList.remove('show'), 4000);
  }
});
