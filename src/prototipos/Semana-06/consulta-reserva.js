document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchTxt = document.getElementById('searchTxt');
  const tableBody = document.getElementById('tableBody');
  const btnBuscar = document.getElementById('btnBuscar');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const errorToast = document.getElementById('consultaToast');
  const toastMessage = document.getElementById('toastMessage');

  // Base mockada de reservas integradas ao PostgreSQL (ADR-001)
  const MOCK_RESERVAS = [
    { tutor: "João Silva", pet: "Thor (Golden Retriever)", espaco: "🐩 Canil Espaço Padrão", periodo: "12/10/2026 até 18/10/2026", status: "Futura" },
    { tutor: "Isabela Rezende", pet: "Luna (Poodle)", espaco: "👑 Suíte VIP com Monitoramento", periodo: "05/10/2026 até 10/10/2026", status: "Ativa" },
    { tutor: "Mateus Alcântara", pet: "Zeus (Bulldog)", espaco: "📦 Canil Individual Compacto", periodo: "01/09/2026 até 05/09/2026", status: "Encerrada" }
  ];

  // Carrega a listagem total inicialmente
  renderTable(MOCK_RESERVAS);

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchTxt.value.trim().toLowerCase();

    if (query.length === 0) {
      renderTable(MOCK_RESERVAS);
      return;
    }

    // RNF-01: Simula resposta rápida em tempo adequado
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Simula uma queda se pesquisar por "timeout@db"
      if (query === "timeout@db") {
        showToast("O servidor PostgreSQL demorou muito para responder (Erro 504 Gateway Timeout).");
        return;
      }

      // Filtro flexível da regra de negócio (Busca parcial por tutor ou animal)
      const resultados = MOCK_RESERVAS.filter(r => 
        r.tutor.toLowerCase().includes(query) || 
        r.pet.toLowerCase().includes(query)
      );

      // Fluxo Alternativo A1: Nenhuma reserva localizada
      if (resultados.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="table-empty">
              ⚠️ Nenhuma reserva localizada com o termo informado.
            </td>
          </tr>`;
        return;
      }

      renderTable(resultados);
    }, 750); // 750ms cumprindo RNF-01 < 2s
  });

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(r => {
      let statusClass = "status-futura";
      if (r.status === "Ativa") statusClass = "status-ativa";
      if (r.status === "Encerrada") statusClass = "status-encerrada";

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${r.tutor}</strong></td>
        <td>${r.pet}</td>
        <td>${r.espaco}</td>
        <td>${r.periodo}</td>
        <td><span class="status-badge ${statusClass}">${r.status}</span></td>
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
