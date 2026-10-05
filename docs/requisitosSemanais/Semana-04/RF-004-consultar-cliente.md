# RF-004: Consulta de Clientes

**Versão:** 1.0  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown  
**Grupo:** Grupo 1 - Petshop  
**Integrantes:** isabela61850856@edu.df.senac.br [Isabela Rezende]; mateus62355366@edu.df.senac.br [Mateus Alcântara]; joao60732706@edu.df.senac.br [João Paulo Arruda].  

**ID:** RF-004  
**Título:** Consulta e busca de clientes no sistema  
**Tipo:** Requisito Funcional  
**Prioridade:** ALTA (bloqueia a eficiência de check-in e vinculação de ordens)  
**Complexidade:** MÉDIA (estimado 5 story points)  
**Status:** EM DESENVOLVIMENTO  
**Data de Criação:** <layout>followupButton(query="""Add this creation date to my calendar""", label="""Monday, October 5, 2026""", variant=FOLLOWUP_BUTTON_VARIANT_DATE_DROPDOWN)</layout>  
**Última Atualização:** <layout>followupButton(query="""Add this update date to my calendar""", label="""Monday, October 5, 2026""", variant=FOLLOWUP_BUTTON_VARIANT_DATE_DROPDOWN)</layout>

**Breve Descrição:**  
O sistema deve permitir que recepcionistas e gerentes busquem e listem os clientes cadastrados utilizando filtros rápidos (Nome, CPF ou E-mail), exibindo os dados de contato do cliente e os PETs vinculados em uma tabela limpa e organizada.

---

## Descrição Detalhada

### Por que este requisito existe?
A equipe do Pet Shop precisa localizar rapidamente o cadastro de um cliente para:
- Confirmar dados de contato e faturamento antes da abertura de serviços.
- Identificar quais PETs pertencem ao cliente de maneira visual e direta.
- Agilizar o atendimento na recepção e evitar a duplicação de cadastros na base corporativa.

### Contexto do Negócio
No dia a dia do PataSegura, os tutores chegam à recepção informando apenas termos parciais de seu nome ou o número do CPF. O sistema precisa realizar varreduras rápidas e seguras no banco de dados para puxar o histórico completo em segundos, garantindo a fluidez do atendimento.

---

## Atores do Sistema

### 1. RECEPCIONISTA (Ator Principal)
- **Papel:** Localizar registros na recepção do hotel pet.
- **Responsabilidade:** Inserir os termos de busca corretos e identificar os hóspedes.
- **Permissões:** 
  - ✅ READ (Visualizar a tabela de clientes e resultados de filtros).

### 2. GERENTE (Ator Secundário)
- **Papel:** Supervisionar e auditar os dados operacionais.
- **Responsabilidade:** Monitorar consistências cadastrais e acessar métricas.
- **Permissões:**
  - ✅ READ (Acesso irrestrito à consulta de dados cadastrais).

### 3. SISTEMA (Ator Automático)
- **Papel:** Processar filtros relacionais e devolver informações indexadas.
- **Responsabilidade:** Consultar a tabela, validar tamanho de caracteres e atualizar a interface.
- **Permissões:**
  - ✅ Consultar banco de dados.
  - ✅ Registrar logs internos.

---

## UC-004: Consultar Cliente

### Pré-Condições
- ✅ Operador devidamente autenticado e ativo no sistema.
- ✅ Conexão estável com a API REST de backend.
- ✅ Banco de dados PostgreSQL online e populado.

### Pós-Condições (Sucesso)
- ✅ Registros correspondentes renderizados na listagem de forma limpa.
- ✅ Vínculo explícito e correto entre o Cliente e seus PETs exibido na tabela.
- ✅ Log de auditoria gerado internamente para controle de acessos.

### Pós-Condições (Falha)
- ✅ Mensagem clara de "Nenhum cliente localizado" exibida centralizada na tabela.
- ✅ Dados anteriores preservados em caso de queda de rede e erro exibido via Toast.

### Fluxo Principal
1. Operador acessa a tela de "Consultar Cliente" através do menu da barra lateral.
2. Sistema exibe a tabela contendo os registros de clientes e um campo de busca focado.
3. Operador digita o Nome, CPF ou E-mail no campo de pesquisa.
4. Operador submete a busca clicando em "Buscar".
5. Sistema valida que o termo inserido possui o tamanho mínimo de caracteres exigido.
6. Sistema realiza a varredura indexada no banco de dados PostgreSQL.
7. Sistema renderiza as linhas dinâmicas correspondentes com os dados de contato do cliente e seus PETs vinculados.

### Fluxo Alternativo A1: Nenhum registro localizado
6a.1. Sistema realiza a varredura e não encontra correspondências na tabela.  
6a.2. Sistema limpa as linhas existentes da tabela.  
6a.3. Exibe a mensagem: "⚠️ Nenhum cliente localizado com o termo informado."

### Fluxo Alternativo A2: Falha crítica de conexão (API Offline)
6b.1. Sistema tenta contato com a rota `GET /clientes`, mas recebe erro de rede.  
6b.2. Sistema interrompe a busca de dados.  
6b.3. Exibe um Toast flutuante contendo o aviso: "Erro na Consulta: Inconsistência de rede detectada."

---

## Regras de Negócio (RN)

**RN-01:** A pesquisa por CPF deve desconsiderar formatações, limpando pontos (`.`) e traços (`-`) para padronizar a consulta estritamente por dígitos numéricos.

**RN-02:** A consulta deve agrupar os PETs correspondentes em uma única célula relacional associada à linha do cliente principal, evitando a duplicação de dados do tutor na tabela.

**RN-03:** Toda consulta submetida através da recepção deve gerar um registro de log no servidor backend para conformidade de segurança dos dados.

**RN-04:** O campo de busca deve exigir um preenchimento mínimo de 3 caracteres antes de disparar o gatilho de busca no banco de dados para evitar sobrecarga nas transações.

---

## Requisitos Não Funcionais (RNF)

**RNF-01:** O tempo de resposta para processamento, filtragem e renderização dos dados na tabela deve ser inferior a 2 segundos.

**RNF-02:** A interface da tabela de dados deve ser totalmente responsiva, adaptando-se com legibilidade a dispositivos móveis e tablets.

**RNF-03:** Toda e qualquer comunicação de dados sensíveis em trânsito deve ser protegida obrigatoriamente através do protocolo criptografado HTTPS.

**RNF-04:** A interface visual deve apresentar feedbacks limpos e claros de validação e carregamento (spinners e avisos).

---

## Mockup das Telas

### Tela 1: Listagem Geral e Filtro (Estado Inicial)
```text
┌────────────────────────────────────────────────────────────────────────┐
│ 🐾 PataSegura                                                          │
├────────────────────────────────────────────────────────────────────────┤
│  Consultar Clientes                                                    │
│                                                                        │
│  Termo de busca: [ João___________________ ]  [ BUSCAR ]               │
│                                                                        │
│  Tabela de Clientes:                                                   │
│  ┌────────────────┬─────────────────┬────────────────┬────────────────┐  │
│  │ Cliente / Tutor│ CPF             │ E-mail         │ PETs Vinculados│  │
│  ├────────────────┼─────────────────┼────────────────┼────────────────┤  │
│  │ João Silva     │ 123.456.789-01  │ joao@email.com │ Thor (Golden)  │  │
│  └────────────────┴─────────────────┴────────────────┴────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Tela 2: Nenhum Registro Localizado
```text
┌────────────────────────────────────────────────────────────────────────┐
│  Termo de busca: [ Desconhecido___________ ]  [ BUSCAR ]               │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │     ⚠️ Nenhum cliente localizado com o termo informado.            │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|----------|-----------|---------|---------------|
| Frontend | HTML5 | Atual | Estrutura semântica da tabela e campos de filtro |
| Estilização | CSS3 | Atual | Grid responsivo, tipografia e tabela minimalista |
| Interatividade | JavaScript | ES6+ | Filtros em tempo real, controle de spinners e manipulação do DOM |
| Backend | Node.js / Express | 4.18+ | Roteamento de API REST gerenciando buscas `GET /clientes` |
| Banco de Dados | PostgreSQL | 14+ | Indexação textual de buscas e armazenamento com integridade ACID |

---

## ADR-006: Filtragem Relacional Direta na Consulta de Clientes
**Status:** ACEITO

**Contexto:** O sistema precisa correlacionar o tutor e seus múltiplos PETs rapidamente na recepção do Pet Shop, sem poluir a tabela ou duplicar linhas desnecessariamente.

**Decisão:** Utilizar consultas agregadas no PostgreSQL para trazer os dados do cliente e encapsular os animais vinculados como uma coleção associada na mesma linha da tabela.

**Consequências:**  
✅ Visualização extremamente limpa e direta para a recepcionista.  
✅ Redução drástica de linhas duplicadas no painel.  
✅ Economia de banda trafegando pacotes de dados consolidados via API.
