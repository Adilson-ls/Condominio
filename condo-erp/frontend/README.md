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
```
