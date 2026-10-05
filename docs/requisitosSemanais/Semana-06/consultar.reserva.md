# RF-006: Consulta de Reservas

**Versão:** 1.0  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown  
**Grupo:** Grupo 1 - Petshop  
**Integrantes:** isabela61850856@edu.df.senac.br [Isabela Rezende]; mateus62355366@edu.df.senac.br [Mateus Alcântara]; joao60732706@edu.df.senac.br [João Paulo Arruda].  

**ID:** RF-006  
**Título:** Consulta e listagem de reservas de hospedagem  
**Tipo:** Requisito Funcional  
**Prioridade:** ALTA (Permite o controle diário de entradas e saídas do hotel pet)  
**Complexidade:** MÉDIA (estimado 5 story points)  
**Status:** EM DESENVOLVIMENTO  
**Data de Criação:** <layout>followupButton(query="""Add this creation date to my calendar""", label="""Monday, October 5, 2026""", variant=FOLLOWUP_BUTTON_VARIANT_DATE_DROPDOWN)</layout>  
**Última Atualização:** <layout>followupButton(query="""Add this update date to my calendar""", label="""Monday, October 5, 2026""", variant=FOLLOWUP_BUTTON_VARIANT_DATE_DROPDOWN)</layout>

**Breve Descrição:**  
O sistema deve permitir que as recepcionistas e gerentes busquem, listem e filtrem as reservas de hospedagem ativas e futuras realizadas para os PETs, utilizando o nome do tutor ou do animal como filtro de pesquisa.

---

## Descrição Detalhada

### Por que este requisito existe?
A equipe operacional do hotel pet precisa gerenciar o fluxo diário para:
- Identificar quais PETs entram no hotel (Check-in) ou saem (Check-out) na data atual.
- Localizar detalhes sobre a acomodação reservada para preparar os canis ou suítes antes da chegada do animal.
- Fornecer uma visão rápida da ocupação atual do PataSegura para a gerência.

---

## UC-006: Consultar Reserva

### Pré-Condições
- ✅ Operador autenticado e ativo no sistema.
- ✅ Banco de dados PostgreSQL online com registros de reservas salvos (RF-005).

### Pós-Condições (Sucesso)
- ✅ Reservas filtradas exibidas de forma clara em uma tabela com status e período.
- ✅ Log de auditoria gerado no servidor.

### Fluxo Principal
1. Operador acessa a tela de "Consultar Reserva" através do menu da barra lateral.
2. Sistema exibe a tabela com o histórico de reservas do hotel e uma barra de pesquisa de texto.
3. Operador digita o nome do Tutor ou o nome do PET no campo de pesquisa.
4. Operador submete a busca clicando em "Buscar".
5. Sistema filtra a base de dados PostgreSQL.
6. Sistema renderiza as linhas correspondentes contendo Tutor, PET, Acomodação, Período e Status da reserva.

### Fluxo Alternativo A1: Nenhuma reserva localizada
6a.1. Sistema realiza a varredura e não localiza nenhuma reserva.  
6a.2. Limpa as linhas da tabela.  
6a.3. Exibe a mensagem: "⚠️ Nenhuma reserva localizada com o termo informado."

---

## Regras de Negócio (RN)

**RN-01:** O sistema deve calcular e exibir dinamicamente o status da reserva com base nas datas (ex: "Futura", "Ativa" ou "Encerrada").

**RN-02:** A consulta deve permitir buscas por termos parciais, facilitando a localização mesmo que o operador digite apenas o primeiro nome do tutor ou do animal.

---

## Requisitos Não Funcionais (RNF)

**RNF-01:** A listagem e filtragem dos dados na tabela devem apresentar resposta em tempo inferior a 2 segundos (RNF-01).

**RNF-02:** A interface deve adaptar-se de maneira legível a tablets e telas menores (Responsividade).

---

## Mockup das Telas

### Tela 1: Consulta Geral de Reservas
```text
┌────────────────────────────────────────────────────────────────────────┐
│ 🐾 PataSegura                                                          │
├────────────────────────────────────────────────────────────────────────┤
│  Consultar Reservas                                                    │
│                                                                        │
│  Buscar: [ Isabela____________________ ]  [ BUSCAR ]                   │
│                                                                        │
│  Tabela de Reservas:                                                   │
│  ┌──────────────┬────────────────┬─────────────────┬──────────────────┐  │
│  │ Tutor        │ PET            │ Acomodação      │ Período Estadia  │  │
│  ├──────────────┼────────────────┼─────────────────┼──────────────────┤  │
│  │ Isabela R.   │ Luna (Poodle)  │ Suíte VIP       │ 10/10 a 15/10/26 │  │
│  └──────────────┴────────────────┴─────────────────┴──────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|----------|-----------|---------|---------------|
| Frontend | HTML5 | Atual | Estrutura semântica da listagem e formulário |
| Estilização | CSS3 | Atual | Interface limpa, moderna e tabela responsiva |
| Interatividade | JavaScript | ES6+ | Filtros em tempo real e injeção dinâmica de linhas no DOM |
| Banco de Dados | PostgreSQL | 14+ | Relacionamento e armazenamento estruturado indexado |
