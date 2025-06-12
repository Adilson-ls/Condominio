# Sistema de Gestão de Condomínios

Aplicativo completo para administração de condomínios, acessível via web e dispositivos móveis, com design responsivo e foco em experiência mobile-first. Solução intuitiva e abrangente para síndicos, administradores, porteiros, moradores e prestadores de serviço.

---

## ✨ Funcionalidades Principais

- **Autenticação e Perfis de Usuário**: Administrador/Síndico, Morador, Porteiro, Prestador de Serviço.
- **Controle de Acesso e Portaria**: Cadastro e registro de visitantes, veículos e prestadores.
- **Comunicação Interna**: Mural de avisos, chat e notificações.
- **Gestão de Áreas Comuns**: Reservas, calendário e aprovação.
- **Manutenção e Ocorrências**: Chamados, acompanhamento e registro de incidentes.
- **Gestão de Documentos**: Biblioteca, permissões e downloads.
- **Correspondências e Encomendas**: Registro, notificação e histórico.
- **Gestão de Chaves**: Controle de retirada, devolução e alertas.
- **Gestão Financeira** (futuro): Boletos, pagamentos e relatórios.
- **Configurações Globais**: Personalização da marca, módulos e regras.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend/Banco**: Firebase (Firestore, Authentication, Storage)
- **Mobile/Web**: Design responsivo, mobile-first

---

## 📁 Estrutura Recomendada de Pastas

```
src/
 ├── assets/           # Imagens, ícones, fontes
 ├── components/       # Componentes de UI reutilizáveis
 ├── contexts/         # Contextos React (Auth, Condomínio, etc)
 ├── hooks/            # Hooks customizados
 ├── modules/          # Módulos principais (Auth, Portaria, Comunicação, etc)
 ├── services/         # Integração com Firebase e APIs
 ├── utils/            # Funções utilitárias, validações, constantes
 ├── routes/           # Configuração de rotas
 ├── App.js            # Componente raiz
 └── index.js          # Ponto de entrada
```

---

## 🚀 Como instalar e rodar o aplicativo

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Condominio/10.0/Apps/PointOfSale
```

### 2. Instale as dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install
```

### 3. Configure o Firebase

- Crie um projeto no [Firebase](https://firebase.google.com/).
- Copie as credenciais do Firebase para um arquivo `.env` na raiz do projeto ou edite `src/services/firebase/config.js` conforme a estrutura do seu projeto.
- Exemplo de variáveis no `.env`:
  ```
  REACT_APP_FIREBASE_API_KEY=...
  REACT_APP_FIREBASE_AUTH_DOMAIN=...
  REACT_APP_FIREBASE_PROJECT_ID=...
  REACT_APP_FIREBASE_STORAGE_BUCKET=...
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
  REACT_APP_FIREBASE_APP_ID=...
  ```

### 4. Inicie o aplicativo

```bash
npm start
```

O app estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 📚 Documentação e Contribuição

- **Documentação**: Consulte os comentários no código e a estrutura de pastas para entender cada módulo.
- **Contribua**: Sinta-se à vontade para abrir issues e pull requests.
- **Licença**: MIT

---

