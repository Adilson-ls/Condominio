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
```

Para reverter a última migração:

```bash
npx sequelize db:migrate:undo
```

---

## Autenticação
A autenticação é feita via JWT (JSON Web Tokens).
* As credenciais (chave secreta) são definidas em `src/config/auth.js` e devem ser configuradas via variáveis de ambiente.
* O middleware de autenticação (`src/middlewares/authMiddleware.js`) verifica a validade do token em rotas protegidas.

## API REST (OpenAPI/Swagger)
A documentação completa da API está disponível no formato OpenAPI (Swagger).
* Arquivo de Definição: `backend/docs/api-swagger.yaml`
* Visualização: Você pode usar ferramentas como Swagger UI (instalável como um pacote npm ou online) para visualizar a documentação interativamente.

## Scripts NPM
* `npm start`: Inicia o servidor em modo de produção.
* `npm run dev`: Inicia o servidor em modo de desenvolvimento (com nodemon).
* `npm test`: Roda os testes unitários/de integração.
* `npm run lint`: Roda o linter para verificar padrões de código.

## Testes
Os testes são escritos utilizando Jest (ou Mocha/Chai).
* Testes Unitários: Para funções e componentes isolados.
* Testes de Integração: Para testar o fluxo completo de requisições da API.
