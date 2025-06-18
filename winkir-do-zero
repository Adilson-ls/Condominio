duas partes principais: Backend (API) e Frontend (Aplicação Web), cada uma em seu próprio diretório.
condo-erp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # Configurações do banco de dados (PostgreSQL)
│   │   │   └── auth.js              # Chaves secretas JWT, etc.
│   │   ├── controllers/             # Lógica de negócio e manipulação de requisições
│   │   │   ├── authController.js
│   │   │   ├── condoController.js   # Gestão de condomínios
│   │   │   ├── unitController.js    # Unidades/moradores
│   │   │   ├── financeController.js # Boletos, despesas, etc.
│   │   │   ├── communicationController.js # Avisos, ocorrências
│   │   │   └── ... (outros módulos)
│   │   ├── models/                  # Definição dos modelos de dados (SQL, Sequelize, Prisma, etc.)
│   │   │   ├── User.js
│   │   │   ├── Condominium.js
│   │   │   ├── Unit.js
│   │   │   ├── Bill.js              # Boletos/Contas a Receber
│   │   │   ├── Expense.js           # Contas a Pagar
│   │   │   ├── Notice.js            # Avisos
│   │   │   ├── Occurrence.js        # Ocorrências
│   │   │   └── ...
│   │   ├── routes/                  # Definição das rotas da API
│   │   │   ├── authRoutes.js
│   │   │   ├── condoRoutes.js
│   │   │   ├── unitRoutes.js
│   │   │   ├── financeRoutes.js
│   │   │   ├── communicationRoutes.js
│   │   │   └── index.js             # Agregador de rotas
│   │   ├── middlewares/             # Funções intermediárias (autenticação, validação)
│   │   │   ├── authMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   ├── services/                # Lógica de negócio complexa ou integração com serviços externos
│   │   │   ├── mailService.js       # Envio de e-mails
│   │   │   ├── paymentGatewayService.js # Integração com gateway de pagamento
│   │   │   └── ...
│   │   ├── utils/                   # Funções utilitárias (helpers)
│   │   │   ├── errorHandler.js
│   │   │   ├── formatters.js
│   │   │   └── ...
│   │   ├── app.js                   # Configuração principal do Express
│   │   └── server.js                # Inicialização do servidor
│   ├── .env.example                 # Exemplo de variáveis de ambiente
│   ├── package.json                 # Dependências e scripts do Node.js
│   ├── package-lock.json
│   ├── README.md                    # Documentação do Backend
│   └── docs/                        # Documentação específica do Backend (API docs, diagramas)
│       └── api-swagger.yaml         # Definição da API (OpenAPI/Swagger)
│
└── frontend/
    ├── public/
    │   ├── index.html               # Arquivo HTML principal
    │   └── favicon.ico
    ├── src/
    │   ├── assets/                  # Imagens, ícones, fontes
    │   │   ├── images/
    │   │   └── styles/              # Variáveis CSS, mixins (se usar pré-processadores)
    │   ├── components/              # Componentes React reutilizáveis (botões, cards, modais)
    │   │   ├── Button/
    │   │   │   ├── index.jsx
    │   │   │   └── styles.js
    │   │   ├── Card/
    │   │   └── ...
    │   ├── contexts/                # Context API para gerenciamento de estado global
    │   │   ├── AuthContext.jsx
    │   │   └── CondoContext.jsx
    │   ├── hooks/                   # Hooks personalizados
    │   │   ├── useAuth.js
    │   │   └── useForm.js
    │   ├── layouts/                 # Estrutura de layout das páginas (Ex: AdminLayout, PublicLayout)
    │   │   ├── DefaultLayout.jsx
    │   │   └── AuthLayout.jsx
    │   ├── pages/                   # Páginas da aplicação (views)
    │   │   ├── Auth/
    │   │   │   ├── LoginPage.jsx
    │   │   │   └── RegisterPage.jsx
    │   │   ├── Dashboard/
    │   │   │   └── DashboardPage.jsx
    │   │   ├── Financial/
    │   │   │   ├── BillsPage.jsx
    │   │   │   └── ExpensesPage.jsx
    │   │   ├── Communication/
    │   │   │   ├── NoticesPage.jsx
    │   │   │   └── OccurrencesPage.jsx
    │   │   └── ...
    │   ├── services/                # Funções para comunicação com a API (Axios instances)
    │   │   ├── api.js               # Instância do Axios configurada
    │   │   └── authService.js
    │   ├── routes/                  # Configuração das rotas do React Router Dom
    │   │   ├── index.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── utils/                   # Funções utilitárias (helpers, formatters)
    │   │   ├── constants.js
    │   │   └── validators.js
    │   ├── App.jsx                  # Componente principal da aplicação
    │   ├── index.js                 # Ponto de entrada da aplicação React
    │   └── reportWebVitals.js
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    ├── README.md                    # Documentação do Frontend
    └── docs/                        # Documentação específica do Frontend (UI/UX, arquitetura de componentes)
        └── component-library.md     # Exemplos de uso de componentes

Documentação do Código e do Projeto
Uma boa documentação é crucial para a manutenção, escalabilidade e para que novos desenvolvedores possam entender e contribuir com o projeto.
1. Documentação de Alto Nível (Project Root - condo-erp/README.md)
Este README.md na raiz do projeto deve ser o ponto de partida para qualquer um que queira entender o sistema.
# Sistema ERP de Gestão de Condomínios

Este é um sistema ERP completo para a gestão de condomínios, desenvolvido com Node.js (Express), React e PostgreSQL. Ele oferece módulos para gestão financeira, comunicação, reservas de áreas comuns, controle de portaria e muito mais.

---

## Módulos Principais

* **Financeiro:** Gestão de boletos, contas a pagar, orçamentos, prestação de contas.
* **Comunicação:** Mural de avisos, ocorrências, chat, enquetes, documentos online.
* **Reservas:** Agendamento de salão de festas, churrasqueiras, etc.
* **Portaria:** Controle de acesso, correspondências.
* **Manutenção:** Gerenciamento de demandas e manutenções preventivas.

---

## Tecnologias Utilizadas

* **Backend:** Node.js, Express, PostgreSQL (com ORM como Sequelize ou Prisma), JWT para autenticação.
* **Frontend:** React, React Router Dom, Axios, Context API (ou Redux/Zustand para estado global), Styled Components (ou Tailwind CSS/Sass para estilização).

---

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

* Node.js (versão LTS recomendada)
* npm ou Yarn
* PostgreSQL

### Configuração do Banco de Dados

1.  Crie um banco de dados PostgreSQL chamado `condo_erp`.
2.  No diretório `backend/`, copie `.env.example` para `.env` e configure as variáveis de ambiente do banco de dados (ex: `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`).

### Backend

Navegue até o diretório `backend/`:

```bash
cd backend

 * Instale as dependências:
   npm install # ou yarn

 * Rode as migrações do banco de dados (se usar ORM com migrações):
   npx sequelize db:migrate # Exemplo com Sequelize

 * Inicie o servidor:
   npm start # ou yarn start

   O servidor estará rodando em http://localhost:3001 (ou a porta configurada).
Frontend
Abra um novo terminal e navegue até o diretório frontend/:
cd frontend

 * Instale as dependências:
   npm install # ou yarn

 * No diretório frontend/, copie .env.example para .env e configure a URL da API (ex: REACT_APP_API_URL=http://localhost:3001).
 * Inicie o servidor de desenvolvimento:
   npm start # ou yarn start

   A aplicação estará disponível em http://localhost:3000.
Documentação Específica
 * Backend API Documentation: Consulte backend/docs/api-swagger.yaml para a documentação completa da API (rotas, parâmetros, respostas).
 * Frontend Component Library: Consulte frontend/docs/component-library.md para exemplos de uso dos componentes React e diretrizes de UI/UX.
Contribuição
Sinta-se à vontade para contribuir! Consulte nosso CONTRIBUTING.md para diretrizes sobre como submeter pull requests.
Licença
Este projeto está licenciado sob a Licença MIT.

### 2. Documentação do Backend (`backend/README.md` e `backend/docs/`)

O `backend/README.md` pode ser mais técnico, explicando detalhes de autenticação, estrutura do banco de dados, etc.

---

#### **`backend/README.md`**

```markdown
# Backend do Sistema ERP de Condomínios

Este diretório contém a API RESTful para o sistema de gestão de condomínios, desenvolvida com Node.js e Express.

---

## Arquitetura

A arquitetura do backend segue o padrão **MVC (Model-View-Controller)** adaptado para uma API REST, com uma separação clara entre:

* **Models:** Definição da estrutura de dados e interação com o PostgreSQL.
* **Controllers:** Lógica de negócio e manipulação das requisições HTTP.
* **Routes:** Definição dos endpoints da API.
* **Middlewares:** Funções executadas antes dos controladores (autenticação, validação).
* **Services:** Lógica de negócio complexa ou integração com serviços externos.

---

## Banco de Dados (PostgreSQL)

Utilizamos PostgreSQL como banco de dados relacional. As migrações e modelos são gerenciados via [Sequelize ORM](https://sequelize.org/) (ou Prisma, TypeORM, etc.).

### Configuração

As credenciais do banco de dados devem ser configuradas no arquivo `.env` na raiz deste diretório.


DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=condo_erp

### Migrações

Para criar as tabelas e aplicar as alterações no schema do banco de dados, execute:

```bash
npx sequelize db:migrate

Para reverter a última migração:
npx sequelize db:migrate:undo

Autenticação
A autenticação é feita via JWT (JSON Web Tokens).
 * As credenciais (chave secreta) são definidas em src/config/auth.js e devem ser configuradas via variáveis de ambiente.
 * O middleware de autenticação (src/middlewares/authMiddleware.js) verifica a validade do token em rotas protegidas.
API REST (OpenAPI/Swagger)
A documentação completa da API está disponível no formato OpenAPI (Swagger).
 * Arquivo de Definição: backend/docs/api-swagger.yaml
 * Visualização: Você pode usar ferramentas como Swagger UI (instalável como um pacote npm ou online) para visualizar a documentação interativamente.
Scripts NPM
 * npm start: Inicia o servidor em modo de produção.
 * npm run dev: Inicia o servidor em modo de desenvolvimento (com nodemon).
 * npm test: Roda os testes unitários/de integração.
 * npm run lint: Roda o linter para verificar padrões de código.
Testes
Os testes são escritos utilizando Jest (ou Mocha/Chai).
 * Testes Unitários: Para funções e componentes isolados.
 * Testes de Integração: Para testar o fluxo completo de requisições da API.

#### **`backend/docs/api-swagger.yaml` (Exemplo Parcial)**

Este arquivo usa o formato **OpenAPI (Swagger)** para descrever cada endpoint da API, seus parâmetros, respostas e modelos de dados.

```yaml
openapi: 3.0.0
info:
  title: API de Gestão de Condomínios
  version: 1.0.0
  description: API RESTful para gerenciar condomínios, moradores, finanças e comunicação.
servers:
  - url: http://localhost:3001/api/v1
    description: Servidor de Desenvolvimento
tags:
  - name: Autenticação
    description: Gerenciamento de usuários e tokens de acesso.
  - name: Condomínios
    description: Gestão de informações de condomínios.
  - name: Moradores
    description: Gestão de unidades e moradores.
  - name: Financeiro
    description: Boletos, despesas e relatórios financeiros.
paths:
  /auth/register:
    post:
      summary: Registrar um novo usuário.
      tags:
        - Autenticação
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                  format: email
                password:
                  type: string
      responses:
        '201':
          description: Usuário registrado com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  email:
                    type: string
        '400':
          description: Erro de validação ou usuário já existe.

  /auth/login:
    post:
      summary: Autenticar usuário e obter token JWT.
      tags:
        - Autenticação
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
      responses:
        '200':
          description: Login bem-sucedido.
          headers:
            x-auth-token:
              schema:
                type: string
              description: Token de autenticação JWT.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
        '401':
          description: Credenciais inválidas.

  /condominiums:
    get:
      summary: Listar todos os condomínios (apenas para administradores).
      tags:
        - Condomínios
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de condomínios.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Condominium'
        '401':
          description: Não autorizado.

# ... Outros endpoints (POST /condominiums, GET /condominiums/{id}, PUT /condominiums/{id}, DELETE /condominiums/{id})

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Condominium:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          description: Nome do condomínio
        address:
          type: string
          description: Endereço completo
        cnpj:
          type: string
          description: CNPJ do condomínio
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
          format: email
        role:
          type: string
          enum: [admin, syndic, resident]
# ... Outros schemas (Unit, Bill, Expense, Notice, Occurrence)

3. Documentação do Frontend (frontend/README.md e frontend/docs/)
O frontend/README.md foca na configuração e desenvolvimento da aplicação React.
frontend/README.md
# Frontend do Sistema ERP de Condomínios

Este diretório contém a aplicação web do sistema de gestão de condomínios, desenvolvida com React.

---

## Arquitetura de Componentes

A aplicação segue uma abordagem baseada em componentes, com a seguinte estrutura principal:

* **`pages/`**: Componentes que representam telas completas da aplicação (ex: `LoginPage`, `DashboardPage`).
* **`components/`**: Componentes reutilizáveis em diversas partes da aplicação (ex: `Button`, `Card`, `Modal`).
* **`layouts/`**: Componentes que definem a estrutura de layout das páginas (ex: `DefaultLayout` com cabeçalho, sidebar e rodapé).
* **`contexts/`**: Para gerenciamento de estado global da aplicação (autenticação, dados do usuário logado).
* **`hooks/`**: Hooks personalizados para encapsular lógica reutilizável.
* **`services/`**: Funções para fazer requisições HTTP para a API do backend.
* **`routes/`**: Configuração das rotas da aplicação usando `react-router-dom`.

---

## Gerenciamento de Estado

O gerenciamento de estado é feito primariamente via **Context API** do React para estados globais (ex: autenticação, informações do condomínio ativo). Para estados locais dos componentes, utiliza-se `useState` e `useReducer`.

---

## Estilização

A estilização dos componentes é feita utilizando **Styled Components** (ou a biblioteca de sua escolha como Tailwind CSS, Sass Modules, etc.). As definições de cores, fontes e outros temas podem ser encontradas em `src/assets/styles/`.

---

## Consumo da API

As requisições HTTP para o backend são feitas utilizando a biblioteca **Axios**. Uma instância configurada do Axios está disponível em `src/services/api.js` para padronizar as requisições e incluir interceptors (para tokens de autenticação, por exemplo).

---

## Rotas Protegidas

As rotas que exigem autenticação são gerenciadas pelo componente `PrivateRoute.jsx` em `src/routes/`, que verifica a existência de um token de autenticação e redireciona para a página de login caso o usuário não esteja autenticado.

---

## Otimização e Performance

* **Code Splitting:** Para carregar apenas o código necessário para cada rota.
* **Lazy Loading:** Para componentes que não são essenciais no carregamento inicial da página.
* **Otimização de Imagens:** Utilização de formatos e tamanhos adequados para imagens.

---

## Testes

Os testes da aplicação frontend são feitos com [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/react/).

* **Testes de Componentes:** Verificam o comportamento de componentes isolados.
* **Testes de Integração:** Testam o fluxo de usuário entre múltiplos componentes e interações com a API mockada.

Para rodar os testes:

```bash
npm test # ou yarn test


#### **`frontend/docs/component-library.md` (Exemplo Parcial)**

Este arquivo pode servir como um catálogo de componentes, mostrando como usá-los, suas propriedades (props) e exemplos visuais.

```markdown
# Biblioteca de Componentes UI

Esta documentação descreve os componentes reutilizáveis da aplicação frontend, suas propriedades (props) e exemplos de uso.

---

## 1. Button

Um componente de botão genérico.

### Propriedades (Props)

| Nome     | Tipo      | Obrigatório | Descrição                                  | Valores Padrão |
| :------- | :-------- | :---------- | :----------------------------------------- | :------------- |
| `children` | `node`    | Sim         | Conteúdo interno do botão (texto, ícone).  | -              |
| `variant`  | `string`  | Não         | Estilo visual do botão.                    | `'primary'`    |
| `onClick`  | `func`    | Não         | Função de callback ao clicar.              | -              |
| `disabled` | `boolean` | Não         | Se o botão está desabilitado.              | `false`        |
| `type`     | `string`  | Não         | Tipo do botão HTML (`button`, `submit`).   | `'button'`     |

### Variantes Disponíveis

* `'primary'` (azul principal)
* `'secondary'` (verde secundário)
* `'danger'` (vermelho)
* `'outline'` (borda transparente)
* `'text'` (apenas texto)

### Exemplos de Uso

```jsx
import React from 'react';
import Button from '../components/Button'; // Ajuste o caminho conforme sua estrutura

const ExampleButtons = () => {
  return (
    <div>
      <Button onClick={() => alert('Botão Primário Clicado!')}>
        Botão Primário
      </Button>
      <Button variant="secondary" onClick={() => alert('Botão Secundário Clicado!')}>
        Salvar
      </Button>
      <Button variant="danger" disabled>
        Excluir (Desabilitado)
      </Button>
      <Button variant="outline" type="submit">
        Enviar Formulário
      </Button>
    </div>
  );
};

export default ExampleButtons;

2. Card
Um componente para exibir conteúdo em um formato de cartão, com sombra e bordas arredondadas.
Propriedades (Props)
| Nome | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| children | node | Sim | Conteúdo a ser exibido dentro do cartão. |
| title | string | Não | Título opcional do cartão. |
| className | string | Não | Classes CSS adicionais. |
Exemplos de Uso
import React from 'react';
import Card from '../components/Card';

const ExampleCard = () => {
  return (
    <Card title="Minhas Ocorrências Recentes">
      <p>Árvore caída na área comum.</p>
      <p>Vazamento no encanamento do bloco B.</p>
      <Button variant="text">Ver todas</Button>
    </Card>
  );
};

export default ExampleCard;


### 4. Documentação de Código (Comentários In-line)

Além dos `README.md` e arquivos `docs/`, é fundamental documentar o código diretamente.

* **JSDoc (JavaScript Documentation):** Use comentários no formato JSDoc para descrever funções, classes, parâmetros, retornos e o propósito geral do código. Ferramentas podem gerar documentação HTML a partir desses comentários.

    ```javascript
    // Exemplo em backend/src/controllers/userController.js
    /**
     * @file Controller para operações relacionadas a usuários.
     * @module controllers/userController
     */

    /**
     * Registra um novo usuário no sistema.
     * @param {Object} req - Objeto de requisição do Express.
     * @param {string} req.body.name - Nome do usuário.
     * @param {string} req.body.email - Endereço de e-mail do usuário (único).
     * @param {string} req.body.password - Senha do usuário.
     * @param {Object} res - Objeto de resposta do Express.
     * @returns {Promise<void>} - Retorna uma resposta JSON com o usuário criado ou um erro.
     */
    exports.registerUser = async (req, res, next) => {
      try {
        const { name, email, password } = req.body;
        // ... lógica de validação e criação do usuário
        res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
      } catch (error) {
        next(error); // Encaminha o erro para o middleware de tratamento de erros
      }
    };
    ```

* **Comentários Explicativos:** Use comentários concisos para explicar lógicas complexas, decisões de design ou partes não óbvias do código.

    ```javascript
    // Exemplo em frontend/src/pages/Financial/BillsPage.jsx
    // Função para buscar os boletos do condomínio com base nos filtros
    const fetchBills = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/finance/bills', {
          params: {
            status: filterStatus,
            month: filterMonth,
            year: filterYear,
          },
        });
        setBills(response.data);
      } catch (error) {
        // Exibir notificação de erro para o usuário
        console.error('Erro ao buscar boletos:', error);
        toast.error('Não foi possível carregar os boletos.');
      } finally {
        setIsLoading(false);
      }
    };
    ```

### 5. Outros Arquivos de Documentação

* **`CONTRIBUTING.md`:** Se o projeto for open source e aceitar contribuições, este arquivo deve conter as diretrizes para enviar pull requests, estilo de código, como rodar testes, etc.
* **`LICENSE`:** O arquivo de licença (ex: MIT, GPL) que define como o código pode ser usado e distribuído.
* **Diagramas (Opcional):** Para sistemas mais complexos, diagramas de arquitetura, fluxo de dados ou UML podem ser guardados em `docs/` para melhor entendimento visual.

---

Ao seguir essa estrutura e abordar a documentação em diferentes níveis, você terá um sistema robusto e fácil de entender, tanto para quem o desenvolve quanto para quem o utiliza.