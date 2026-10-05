# RF-005: Criar Reserva de Hospedagem

**Versão:** 1.0  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown  
**Grupo:** Grupo 1 - Petshop  
**Integrantes:** isabela61850856@edu.df.senac.br [Isabela Rezende]; mateus62355366@edu.df.senac.br [Mateus Alcântara]; joao60732706@edu.df.senac.br [João Paulo Arruda].  

**ID:** RF-005  
**Título:** Criar nova reserva de hospedagem para PETs  
**Tipo:** Requisito Funcional  
**Prioridade:** ALTA (Funcionalidade principal de geração de receita do hotel pet)  
**Complexidade:** MÉDIA (estimado 5 story points)  
**Status:** EM DESENVOLVIMENTO  
**Data de Criação:** <layout>followupButton(query="""Add this creation date to my calendar""", label="""Monday, October 5, 2026""", variant=FOLLOWUP_BUTTON_VARIANT_DATE_DROPDOWN)</layout>  
**Última Atualização:** <layout>followupButton(query="""Add this update date to my calendar""", label="""Monday, October 5, 2026""", variant=FOLLOWUP_BUTTON_VARIANT_DATE_DROPDOWN)</layout>

**Breve Descrição:**  
O sistema deve permitir que as recepcionistas criem novas reservas de hospedagem para os PETs no hotel, selecionando o tutor, o animal correspondente, o tipo de acomodação (canil ou suíte) e o período de estadia (Check-in e Check-out).

---

## Descrição Detalhada

### Por que este requisito existe?
O PataSegura Hotel Pet opera com capacidade limitada de vagas. Este requisito existe para:
- Garantir o controle rígido do inventário de acomodações (evitando overbooking).
- Organizar a escala de entrada e saída de animais na recepção.
- Fornecer insumos para o planejamento de ocupação e faturamento do negócio.

### Contexto do Negócio
Quando um tutor entra em contato para hospedar seu animal, a recepcionista precisa verificar se o cliente/PET já estão cadastrados, escolher o tipo de espaço adequado ao porte do animal e garantir que as datas de entrada e saída sejam consistentes. O sistema deve barrar a transação caso a acomodação escolhida já esteja lotada no período.

---

## Atores do Sistema

### 1. RECEPCIONISTA (Ator Principal)
- **Papel:** Alocar vagas e criar reservas no balcão ou via telefone.
- **Responsabilidade:** Confirmar o tutor/PET e preencher corretamente as datas de estadia.
- **Permissões:** 
  - ✅ CREATE (Instanciar novas reservas no sistema).

### 2. GERENTE (Ator Secundário)
- **Papel:** Auditar e gerenciar a ocupação do hotel.
- **Responsabilidade:** Liberar vagas de contingência ou resolver conflitos de reservas.
- **Permissões:**
  - ✅ CREATE, READ, UPDATE, DELETE (Controle total do mapa de reservas).

### 3. SISTEMA (Ator Automático)
- **Papel:** Validar a consistência temporal das datas e o inventário de vagas em tempo real.
- **Responsabilidade:** Impedir gravações com dados inconsistentes ou sem disponibilidade de espaço.
- **Permissões:**
  - ✅ Validar regras de concorrência.
  - ✅ Persistir transações no banco de dados.

---

## UC-005: Criar Reserva

### Pré-Condições
- ✅ Recepcionista devidamente autenticada no sistema.
- ✅ Cliente e seu respectivo PET previamente cadastrados na base (RF-001).
- ✅ Banco de dados PostgreSQL online com tabelas relacionais integradas.

### Pós-Condições (Sucesso)
- ✅ Registro de reserva salvo com ID único associado.
- ✅ Vaga bloqueada no inventário da acomodação para o período selecionado.
- ✅ Log de transação gerado no servidor.

### Pós-Condições (Falha)
- ✅ Mensagem de erro exibida em tela (validação de datas ou falta de vagas).
- ✅ O inventário permanece inalterado e nenhum dado é persistido.

### Fluxo Principal
1. Operador acessa a tela de "Criar Reserva" através do menu da barra lateral.
2. Sistema exibe o formulário de reserva em estado inicial.
3. Operador seleciona o Tutor/Cliente no campo de seleção.
4. Sistema renderiza dinamicamente apenas os PETs vinculados àquele tutor.
5. Operador seleciona o PET, o tipo de acomodação desejada, a data de Check-in e a data de Check-out.
6. Operador clica em "Confirmar Reserva".
7. Sistema valida as regras de negócio de consistência de datas e inventário.
8. Sistema persiste a reserva no banco de dados PostgreSQL.
9. Sistema exibe o modal de sucesso.

### Fluxo Alternativo A1: Data de Saída Incorreta (Inconsistência Temporal)
7a.1. Sistema identifica que a data de Check-out é igual ou anterior à data de Check-in.  
7a.2. Sistema interrompe o processo de salvamento.  
7a.3. Exibe um Toast na tela alertando sobre a inconsistência e destaca o campo com erro.  
7a.4. Operador corrige as datas e tenta novamente.

### Fluxo Alternativo A2: Falta de Vagas (Acomodação Lotada)
7b.1. Sistema faz a varredura no banco e detecta que o tipo de espaço escolhido atingiu 100% de ocupação nas datas selecionadas.  
7b.2. Sistema bloqueia a gravação dos dados.  
7b.3. Exibe um aviso flutuante informando a lotação máxima da acomodação.  
7b.4. Operador pode negociar outro tipo de espaço com o cliente ou alterar as datas.

---

## Regras de Negócio (RN)

**RN-01:** O vínculo relacional deve ser obrigatório: uma reserva não pode ser gerada sem um Tutor e um PET válidos e previamente cadastrados.

**RN-02:** Integridade Cronológica: A data de término da hospedagem (Check-out) deve ser estritamente posterior à data de início (Check-in).

**RN-03:** Regra de Concorrência e Inventário: O sistema deve consultar as reservas existentes antes de confirmar uma nova. Se a quantidade de PETs alocados na data atingir o limite físico da acomodação selecionada, a operação deve ser rejeitada (Prevenção de Overbooking).

---

## Requisitos Não Funcionais (RNF)

**RNF-01:** O cálculo de validação de vagas e o cruzamento de datas no banco de dados deve responder em tempo inferior a 2 segundos.

**RNF-02:** Os campos de data devem bloquear seleções em dias anteriores à data atual (data de hoje) via interface sempre que possível.

**RNF-03:** A operação de salvamento da reserva deve seguir o padrão de transação isolada (ACID) para garantir que duas recepcionistas não aloquem a mesma vaga simultaneamente.

---

## Mockup das Telas

### Tela 1: Formulário de Reserva (Estado Pronto)
```text
┌────────────────────────────────────────────────────────────────────────┐
│ 🐾 PataSegura                                                          │
├────────────────────────────────────────────────────────────────────────┤
│  Criar Reserva de Hospedagem                                           │
│                                                                        │
│  Tutor: [ Isabela Rezende  ] ▼      PET: [ Luna (Poodle)     ] ▼       │
│                                                                        │
│  Acomodação: [ Suíte VIP com Monitoramento               ] ▼           │
│                                                                        │
│  Check-in: [ 10/10/2026 ]           Check-out: [ 15/10/2026 ]          │
│                                                                        │
│  [ CONFIRMAR RESERVA ]   [ LIMPAR ]                                    │
└────────────────────────────────────────────────────────────────────────┘
```

### Tela 2: Alerta de Falha de Consistência (Data Inválida)
```text
┌────────────────────────────────────────────────────────────────────────┐
│  Check-in: [ 10/10/2026 ]           Check-out: [ 08/10/2026 ] ❌       │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ ⚠️ A data de saída (Check-out) deve ser posterior ao dia de entrada.│  │
│  └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|----------|-----------|---------|---------------|
| Frontend | HTML5 | Atual | Estrutura dos formulários de seleção e inputs de data |
| Estilização | CSS3 | Atual | Painel responsivo e estilização de campos com erro |
| Interatividade | JavaScript | ES6+ | Manipulação dinâmica do select de PETs e validação cronológica |
| Backend | Node.js / Express | 4.18+ | API gerenciando as regras de negócio e rotas `POST /reservas` |
| Banco de Dados | PostgreSQL | 14+ | Controle transacional com bloqueio de concorrência (ACID) |

---

## ADR-007: Validação de Inventário Baseada em Transações Isoladas
**Status:** ACEITO

**Contexto:** Em momentos de alta demanda (como vésperas de feriados), múltiplas recepcionistas podem tentar reservar a última vaga de uma Suíte VIP ao mesmo tempo, gerando inconsistências no hotel pet.

**Decisão:** Utilizar o nível de isolamento de transação `SERIALIZABLE` ou cláusulas de bloqueio (`SELECT ... FOR UPDATE`) no PostgreSQL durante a verificação de vagas do processo de criação de reservas.

**Consequências:**  
✅ Elimina totalmente o risco de overbooking no PataSegura.  
✅ Garante integridade absoluta dos dados de ocupação.  
⚠️ Pode gerar pequenas filas de espera em milissegundos se muitas pessoas salvarem dados no exato mesmo instante, o que é perfeitamente aceitável dado o fluxo da recepção.
