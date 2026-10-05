# RF-002: Login de Usuários

**Versão:** 1.0  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown 
**Grupo:** Grupo 1 - Petshop  
**Integrantes:** isabela61850856@edu.df.senac.br [Isabela Rezende]; mateus62355366@edu.df.senac.br[Mateus Alcantra]; joao60732706@edu.df.senac.br[João Paulo Arruda].  

**ID:** RF-002  
**Título:** Autenticação de usuários no sistema  
**Tipo:** Requisito Funcional  
**Prioridade:** ALTA  
**Complexidade:** BAIXA (estimado 3 story points)  
**Status:** EM DESENVOLVIMENTO  
**Data de Criação:** 03/09/2026  
**Última Atualização:** 03/09/2026

**Breve Descrição:**  
O sistema deve permitir que usuários autorizados realizem login utilizando email e senha para acessar as funcionalidades do sistema de gerenciamento do Pet Shop.

---

## Descrição Detalhada

### Por que este requisito existe?

O sistema precisa garantir que apenas usuários autorizados tenham acesso às informações e operações do Pet Shop para:

- Garantir a segurança dos dados
- Controlar permissões de acesso
- Registrar atividades dos usuários
- Proteger informações de clientes e PETs

### Contexto do Negócio

O Pet Shop opera com dados de clientes, PETs, serviços e agendamentos. Portanto, é necessário que funcionários e gerentes sejam autenticados antes de acessar o sistema.

---

## Atores do Sistema

### 1. FUNCIONÁRIO (Ator Principal)

- **Papel:** Acessar o sistema
- **Responsabilidade:** Informar credenciais válidas
- **Permissões:**
  - ✅ Realizar login
  - ✅ Encerrar sessão
  - ✅ Acessar funcionalidades autorizadas

### 2. GERENTE (Ator Secundário)

- **Papel:** Administrar o sistema
- **Responsabilidade:** Acessar funções administrativas
- **Permissões:**
  - ✅ Realizar login
  - ✅ Gerenciar usuários
  - ✅ Acessar relatórios

### 3. SISTEMA (Ator Automático)

- **Papel:** Validar autenticação
- **Responsabilidade:** Verificar credenciais e criar sessão
- **Permissões:**
  - ✅ Validar dados
  - ✅ Gerenciar sessões
  - ✅ Registrar logs de acesso

---

## UC-002: Realizar Login

### Pré-Condições

- ✅ Usuário cadastrado no sistema
- ✅ Sistema disponível
- ✅ Banco de dados funcionando
- ✅ Conexão de rede ativa

### Pós-Condições (Sucesso)

- ✅ Usuário autenticado
- ✅ Sessão criada
- ✅ Tela inicial exibida
- ✅ Log de acesso registrado

### Pós-Condições (Falha)

- ✅ Mensagem de erro exibida
- ✅ Acesso negado
- ✅ Tentativa registrada em log

### Fluxo Principal

1. Usuário acessa a tela de login
2. Sistema exibe formulário de autenticação
3. Usuário informa email
4. Usuário informa senha
5. Usuário clica em "Entrar"
6. Sistema valida os campos
7. Sistema verifica as credenciais
8. Sistema cria sessão do usuário
9. Sistema redireciona para a página inicial
10. Usuário acessa o sistema

### Fluxo Alternativo A1: Credenciais Inválidas

7a.1. Sistema identifica dados incorretos  
7a.2. Exibe mensagem de erro  
7a.3. Retorna para a tela de login

### Fluxo Alternativo A2: Usuário Inexistente

7b.1. Sistema não encontra o email informado  
7b.2. Exibe mensagem de erro  
7b.3. Solicita novo login

### Fluxo Alternativo A3: Falha de Conexão

7c.1. Sistema não consegue acessar o banco de dados  
7c.2. Exibe mensagem de erro temporário  
7c.3. Usuário pode tentar novamente

---

## Regras de Negócio (RN)

**RN-01:** O email deve estar cadastrado no sistema

**RN-02:** A senha deve corresponder ao usuário informado

**RN-03:** Senhas devem ser armazenadas utilizando criptografia

**RN-04:** Após 5 tentativas inválidas consecutivas, a conta poderá ser bloqueada temporariamente

**RN-05:** Toda autenticação deve gerar registro de log

**RN-06:** O sistema deve encerrar sessões inativas após 30 minutos

---

## Requisitos Não Funcionais (RNF)

**RNF-01:** Tempo de autenticação inferior a 2 segundos

**RNF-02:** Comunicação obrigatória via HTTPS

**RNF-03:** Compatível com dispositivos móveis

**RNF-04:** Disponibilidade mínima de 99%

**RNF-05:** Senhas protegidas com bcrypt

**RNF-06:** Interface acessível conforme WCAG 2.1

---

## Mockup/Descrição das Telas

### Tela 1: Login

```text
┌─────────────────────────────────────┐
│          PET SHOP LOGIN             │
├─────────────────────────────────────┤
│                                     │
│ Email: [____________________]       │
│                                     │
│ Senha: [____________________]       │
│                                     │
│ [ ENTRAR ]                          │
│                                     │
│ Esqueceu sua senha?                 │
│                                     │
└─────────────────────────────────────┘
```

### Tela 2: Autenticação em Andamento

```text
┌─────────────────────────────────────┐
│          PET SHOP LOGIN             │
├─────────────────────────────────────┤
│                                     │
│ Validando credenciais...            │
│                                     │
│ ⟳ Carregando                        │
│                                     │
└─────────────────────────────────────┘
```

### Tela 3: Login Realizado com Sucesso

```text
┌─────────────────────────────────────┐
│          PET SHOP LOGIN             │
├─────────────────────────────────────┤
│                                     │
│ ✅ Login realizado com sucesso      │
│                                     │
│ Redirecionando...                   │
│                                     │
└─────────────────────────────────────┘
```

### Tela 4: Erro de Login

```text
┌─────────────────────────────────────┐
│          PET SHOP LOGIN             │
├─────────────────────────────────────┤
│                                     │
│ ❌ Email ou senha inválidos         │
│                                     │
│ Email: [usuario@email.com]          │
│ Senha: [************]               │
│                                     │
│ [ ENTRAR ]                          │
│                                     │
└─────────────────────────────────────┘
```

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|----------|-----------|---------|---------------|
| Frontend | HTML5 | Atual | Estrutura das páginas do sistema |
| Estilização | CSS3 | Atual | Criação da interface visual e responsividade |
| Interatividade | JavaScript | ES6+ | Validação de formulários e interação com o usuário |
| Backend | Python | 3.12+ | Processamento das regras de negócio e autenticação |

### Justificativa da Arquitetura

- **HTML5** para desenvolver a estrutura das telas do sistema.
- **CSS3** para estilização e adaptação da interface em diferentes dispositivos.
- **JavaScript** para validações em tempo real e melhoria da experiência do usuário.
- **Python** para implementar as funcionalidades do sistema e controlar a autenticação dos usuários.

### Arquitetura Atualizada

```text
┌──────────────┐
│   Frontend   │
│    HTML5     │
│    CSS3      │
│ JavaScript   │
└──────┬───────┘
       │
       │ Requisições
       ▼
┌──────────────────┐
│     Python       │
│    Backend       │
│     Login        │
└──────────────────┘
```

---

## ADR-004: Python como Tecnologia Backend

**Status:** ACEITO

**Contexto:** O sistema precisa processar autenticação, validações e regras de negócio de forma simples e eficiente.

**Decisão:** Utilizar Python como linguagem responsável pelas funcionalidades do backend.

**Alternativas:**

- Java
- PHP
- C#

**Consequências:**

- ✅ Linguagem simples e de fácil manutenção
- ✅ Ampla documentação e comunidade
- ✅ Fácil integração com HTML, CSS e JavaScript
- ✅ Adequada para projetos acadêmicos