# 📋 ENTREGA SEMANAL DE REQUISITOS

**Versão:** 12.2  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown (será corrigido automaticamente)  
**Valor Total da Entrega:** 
**Data de Entrega:** 
**Grupo:** Grupo 1 - Petshop  
**Integrantes:** Isabela Rezende de Santana (isabela61850856@edu.df.senac.br); João Paulo Arruda de Sousa (joao60732706@edu.df.senac.br); Mateus Alcantra da Silva (mateus62355366@edu.df.senac.br)  

---
ID: RF-001
Título: Criar novo registro de cliente no sistema e seu(s) respectivos PETs
Tipo: Requisito Funcional
Prioridade: ALTA (bloqueia outras funcionalidades)
Complexidade: MÉDIA (estimado 5 story points)
Status: EM DESENVOLVIMENTO
Data de Criação: 27/08/2026
Última Atualização: 28/08/2026

Breve Descrição:
O sistema deve permitir que recepcionistas cadastrem novos clientes com dados básicos (nome, email, CPF, telefone, data de nascimento) e dados do(s) PETs (idade, nome, peso, raça) para manter registro atualizado.

## Descrição Detalhada

**Por que este requisito existe?**  
O sistema precisa gerenciar informações de clientes e PETs para:
- Manter histórico de clientes
- Personalizar atendimento
- Gerar relatórios de ocupação
- Facilitar check-in/check-out

**Contexto do Negócio:**  
site precisa registrar dados de todos os clientes e PETs que chegam, coletando informações essenciais para contato e identificação.

---

## Atores do Sistema

### 1. RECEPCIONISTA (Ator Principal)
- **Papel:** Cadastrar novo cliente ou PETs
- **Responsabilidade:** Inserir dados corretos, validar informações
- **Permissões:** 
  - ✅ CREATE (criar novo PETs)
  - ✅ READ (visualizar dados)
  - ❌ UPDATE (não pode editar dados de outros)
  - ❌ DELETE (não pode deletar)

### 2. GERENTE (Ator Secundário)
- **Papel:** Revisar e corrigir dados de hóspedes
- **Responsabilidade:** Supervisionar cadastros, resolver inconsistências
- **Permissões:**
  - ✅ CREATE, READ, UPDATE, DELETE

### 3. SISTEMA (Ator Automático)
- **Papel:** Validar dados, armazenar seguramente
- **Responsabilidade:** Validar formato, aplicar regras de negócio
- **Permissões:**
  - ✅ Todas operações
```
## UC-001: Realizar Cadastro de cliente/PETs

### Pré-Condições
- ✅ Recepcionista autenticado no sistema
- ✅ Dados de conexão disponíveis
- ✅ Banco de dados funcionando
- ✅ O cliente ou tutor deve existir no cadastro.

### Pós-Condições (Sucesso)
- ✅ Hóspede registrado com ID único
- ✅ Confirmação enviada por email
- ✅ Histórico de cadastro registrado
- ✅O cadastro fica disponível para consulta e agendamento de serviços.

### Pós-Condições (Falha)
- ✅ Mensagem de erro exibida
- ✅ Dados não salvos
- ✅ Tentativa registrada em log

### Fluxo Principal
1. Recepcionista clica em "Novo cliente ou PET"
2. Sistema exibe formulário vazio
3. Recepcionista preenche nome
4. Sistema valida formato do nome
5. Recepcionista preenche email
6. Sistema valida formato do email
7. Recepcionista clica "Salvar"
8. Sistema valida todos os campos
9. Sistema salva no banco de dados
10. Sistema exibe mensagem de sucesso
11. Recepcionista vê novo cliente na lista

### Fluxo Alternativo A1: Email já cadastrado
6a.1. Sistema detecta email duplicado
6a.2. Exibe mensagem de erro
6a.3. Usuário pode tentar outro email ou ligar para suporte

### Fluxo Alternativo A2: Conexão de rede falha
8a.1. Sistema tenta 3 vezes (retry automático)
8a.2. Se falhar: exibe erro de conexão
8a.3. Usuário pode tentar novamente

### Regras de Negócio (RN)
**RN-01:** Email deve ser único no sistema
**RN-02:** CPF deve ser validado (algoritmo módulo 11)
**RN-03:** Data de nascimento não pode ser futura
**RN-04:** Telefone deve ter 11 dígitos (Brasil)
**RN-05:** Nome não pode estar vazio
**RN-06:** Dados sensíveis criptografados em repouso
**RN-07:** Histórico mantido por 5 anos

### Requisitos Não-Funcionais (RNF)
**RNF-01:** Resposta < 2 segundos
**RNF-02:** Suporta 1000+ hóspedes
**RNF-03:** Backup diário automático
**RNF-04:** Modo offline com sincronização
**RNF-05:** HTTPS obrigatório
**RNF-06:** WCAG 2.1 (acessibilidade)
```

### Mockup/Descrição das Telas

**Tela 1: Formulário Vazio (Estado Inicial)**
```
┌─────────────────────────────────────┐
│  Cadastro de cliente                │
├─────────────────────────────────────┤
│                                     │
│ Nome: [________________]             │
│                                     │
│ Email: [________________]            │
│                                     │
│ CPF: [________________]              │
│                                     │
│ [ SALVAR ]  [ CANCELAR ]            │
│                                     │
└─────────────────────────────────────┘
```

**Tela 2: Formulário do PET**
```
┌─────────────────────────────────────┐
│  Cadastro de PETs                   │
├─────────────────────────────────────┤
│                                     │
│ Nome: [________________]             │
│                                     │
│ raça: [________________]            │
│                                     │
│ idade: [________________]

 peso: [________________]               │
│                                     │
│ [ SALVAR ]  [ CANCELAR ]            │
│                                     │
└─────────────────────────────────────┘
```
**Tela 3: Formulário Preenchido (Validação Visual)**
```
┌─────────────────────────────────────┐
│  Cadastro de cliente                │
├─────────────────────────────────────┤
│                                     │
│ Nome: [João Silva            ] ✅   │
│                                     │
│ Email: [joao@email.com       ] ✅   │
│                                     │
│ CPF: [12345678901            ] ✅   │
│                                     │
│ [ SALVAR ]  [ CANCELAR ]            │
│                                     │
└─────────────────────────────────────┘
```

**Tela 3: Carregando (Processando)**
```
┌─────────────────────────────────────┐
│  Cadastro de cliente                │
├─────────────────────────────────────┤
│                                     │
│  Salvando dados...                  │
│  ⟳ (spinner de carregamento)        │
│                                     │
│  [ CANCELAR ]                       │
│                                     │
└─────────────────────────────────────┘
```

**Tela 4: Erro de Validação**
```
┌─────────────────────────────────────┐
│  Cadastro de cliente                │
├─────────────────────────────────────┤
│                                     │
│ ⚠️ Email já cadastrado no sistema   │
│                                     │
│ Nome: [João Silva            ] ✅   │
│                                     │
│ Email: [joao@email.com       ] ❌   │
│ Use outro email               │
│                                     │
│ CPF: [12345678901            ] ✅   │
│                                     │
│ [ SALVAR ]  [ CANCELAR ]            │
│                                     │
└─────────────────────────────────────┘

## Arquitetura da Solução

### Diagrama de Componentes

```
┌──────────────┐
│   Frontend   │ (HTML+CSS+JS)
│   Cadastro   │
└──────┬───────┘
       │ HTTPS
       ▼
┌──────────────────┐
│ API REST Backend │ (Express.js)
│ POST /clientes   │
└──────┬───────────┘
       │ Validações
       ▼
┌──────────────────┐
│  PostgreSQL BD   │ (ACID Transactions)
│  Tabela: cliente 
  ou PETs
└──────────────────┘
```

### ADR-001: PostgreSQL como Banco de Dados

**Status:** ACEITO

**Contexto:** Dados de hóspedes precisam de consistência ACID e escalabilidade.

**Decisão:** Usar PostgreSQL 14+ para armazenar dados de hóspedes.

**Alternativas:**
- MySQL: Menos ACID
- MongoDB: Sem transações robustas

**Consequências:** ✅ Seguro, ✅ Escalável, ⚠️ Requer DevOps

### ADR-002: Bcrypt para Senhas

**Status:** ACEITO

**Contexto:** Senhas devem ser armazenadas de forma segura e irreversível.

**Decisão:** Usar bcrypt com 12 rounds de salt.

**Alternativas:** Scrypt, PBKDF2

**Consequências:** ✅ OWASP recomendado, ✅ Adaptativo

### ADR-003: REST API com Express.js

**Status:** ACEITO

**Contexto:** API escalável e simples para frontend.

**Decisão:** Usar Express.js 4.18+ com Node.js 18 LTS.

**Alternativas:** Django, Rails

**Consequências:** ✅ Rápido, ✅ JavaScript full-stack

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Frontend | HTML5 + CSS3 + JavaScript | ES2015+ | Web padrão |
| Backend | Express.js | 4.18+ | Minimalista, rápido |
| BD | PostgreSQL | 14+ | ACID, confiável |
| Hash | bcrypt | 5+ | OWASP recomendado |
| Validação | express-validator | 7+ | Robusta |

- [x] Sem erros ortográficos (revisado)
- [x] Sem erros gramaticais
- [x] Markdown renderiza corretamente no GitHub
- [x] Código está com syntax highlighting (```language)
- [x] Diagramas ASCII art são legíveis
- [x] Nenhuma seção está com "TODO" ou "..."
- [x] Documento tem tamanho apropriado (3-5 páginas)
- [x] Referências internas consistentes (RF-XXX, UC-XXX, RN-XX, RNF-XX)
- [x] Formatação consistente (títulos, listas, espaçamento)

