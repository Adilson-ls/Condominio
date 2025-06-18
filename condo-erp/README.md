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

# Instale as dependências:
npm install # ou yarn

# Rode as migrações do banco de dados (se usar ORM com migrações):
npx sequelize db:migrate # Exemplo com Sequelize

# Inicie o servidor:
npm start # ou yarn start

# O servidor estará rodando em http://localhost:3001 (ou a porta configurada).
```

### Frontend
Abra um novo terminal e navegue até o diretório frontend/:

```bash
cd frontend

# Instale as dependências:
npm install # ou yarn

# No diretório frontend/, copie .env.example para .env e configure a URL da API (ex: REACT_APP_API_URL=http://localhost:3001).
# Inicie o servidor de desenvolvimento:
npm start # ou yarn start

# A aplicação estará disponível em http://localhost:3000.
```

---

## Documentação Específica
* Backend API Documentation: Consulte `backend/docs/api-swagger.yaml` para a documentação completa da API (rotas, parâmetros, respostas).
* Frontend Component Library: Consulte `frontend/docs/component-library.md` para exemplos de uso dos componentes React e diretrizes de UI/UX.

## Contribuição
Sinta-se à vontade para contribuir! Consulte nosso `CONTRIBUTING.md` para diretrizes sobre como submeter pull requests.

## Licença
Este projeto está licenciado sob a Licença MIT.
