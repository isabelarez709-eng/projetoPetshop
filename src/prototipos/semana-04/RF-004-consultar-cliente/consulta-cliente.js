document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchTxt = document.getElementById('searchTxt');
  const tableBody = document.getElementById('tableBody');
  const btnBuscar = document.getElementById('btnBuscar');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const errorToast = document.getElementById('consultaToast');
  const toastMessage = document.getElementById('toastMessage');

  // Base de dados mockada simulando o retorno estável do PostgreSQL (ADR-001)
  const MOCK_CLIENTES = [
    { nome: "João Silva", cpf: "123.456.789-01", email: "joao@email.com", tel: "(11) 99999-9999", pets: "Thor (Golden Retriever)" },
    { nome: "Isabela Rezende", cpf: "987.654.321-02", email: "isabela61850856@edu.df.senac.br", tel: "(61) 98888-8888", pets: "Luna (Poodle)" },
    { nome: "Mateus Alcântara", cpf: "456.789.123-03", email: "mateus62355366@edu.df.senac.br", tel: "(61) 97777-7777", pets: "Zeus (Bulldog)" },
    { nome: "João Paulo Arruda", cpf: "789.123.456-04", email: "joao60732706@edu.df.senac.br", tel: "(61) 96666-6666", pets: "Bidu (Vira-lata)" }
  ];

  // Renderização inicial mostrando todos os clientes da base
  renderTable(MOCK_CLIENTES);

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchTxt.value.trim().toLowerCase();

    // Validação básica: se campo estiver limpo, renderiza todos de volta
    if (query.length === 0) {
      renderTable(MOCK_CLIENTES);
      return;
    }

    // RNF-01: Resposta dinâmica simulada com tempo adequado
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Simulação de erro crítico se buscar por "erro@rest"
      if (query === "erro@rest") {
        showToast("Erro na API REST Backend (Express.js). Não foi possível varrer a tabela.");
        return;
      }

      // Filtro inteligente (RN-01: ignora caracteres especiais do CPF na busca)
      const cleanQuery = query.replace(/[\.\-]/g, '');

      const resultados = MOCK_CLIENTES.filter(c => {
        const cleanCPF = c.cpf.replace(/[\.\-]/g, '');
        return c.nome.toLowerCase().includes(query) || 
               c.email.toLowerCase().includes(query) || 
               cleanCPF.includes(cleanQuery);
      });

      // Fluxo Alternativo A1: Nenhum registro localizado
      if (resultados.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="table-empty">
              ⚠️ Nenhum cliente localizado com o termo informado.
            </td>
          </tr>`;
        return;
      }

      renderTable(resultados);
    }, 800); // 800ms de resposta (Cumpre RNF-01 < 2s)
  });

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(c => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${c.nome}</strong></td>
        <td>${c.cpf}</td>
        <td>${c.email}</td>
        <td>${c.tel}</td>
        <td><span class="pet-tag">🐕 ${c.pets}</span></td>
      `;
      tableBody.appendChild(row);
    });
  }

  function setLoading(isLoading) {
    if (isLoading) {
      btnBuscar.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Buscando...';
    } else {
      btnBuscar.disabled = false;
      btnSpinner.style.display = 'none';
      btnText.textContent = 'Buscar';
    }
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    errorToast.classList.add('show');
    setTimeout(() => errorToast.classList.remove('show'), 4000);
  }
});
