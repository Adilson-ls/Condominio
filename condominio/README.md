# Condomínio Conectado

## Descrição
O "Condomínio Conectado" é um aplicativo de gestão de condomínios que visa facilitar a comunicação e a administração entre moradores e administradores. O aplicativo oferece funcionalidades como autenticação de usuários, recuperação de senha, e um painel de controle para gerenciar informações do condomínio.

## 🗂️ Estrutura de Pastas
A estrutura do projeto é organizada em módulos, cada um responsável por uma funcionalidade específica. Abaixo está uma visão geral das principais pastas e arquivos:

- **src/assets**: Diretório para armazenar arquivos estáticos, como imagens e fontes.
- **src/components**: Contém componentes reutilizáveis da interface do usuário, divididos em `common` e `layout`.
- **src/config**: Configurações globais, incluindo a integração com o Firebase.
- **src/contexts**: Contextos React para gerenciar estados globais, como autenticação.
- **src/hooks**: Hooks personalizados para reutilização de lógica de estado e efeitos.
- **src/modules**: Módulos que encapsulam funcionalidades específicas, como autenticação.
- **src/services**: Funções auxiliares para interagir com APIs e serviços externos.
- **src/utils**: Funções utilitárias que podem ser usadas em diferentes partes da aplicação.
- **src/routes**: Configuração das rotas da aplicação, controlando o acesso a diferentes partes do aplicativo.

```
src/
├── assets/                # Imagens e arquivos estáticos
├── components/            # Componentes reutilizáveis
│   ├── common/            # Botão, Input, Spinner etc.
│   └── layout/            # Header, Sidebar, Navbar
├── config/                # Configurações globais (ex: Firebase)
├── contexts/              # Contextos globais (ex: Auth)
├── hooks/                 # Hooks customizados
├── modules/               # Features do sistema (ex: Auth)
│   └── Auth/              # Módulo de autenticação
│       ├── api/           # Comunicação com Firebase Auth
│       ├── hooks/         # Hooks específicos do módulo
│       ├── schemas/       # Schemas de validação (Zod)
│       ├── screens/       # Telas de Login, Registro, etc.
│       └── components/    # Componentes internos do módulo
├── services/              # Serviços de negócio
├── utils/                 # Funções utilitárias
├── routes/                # Definição de rotas
├── App.tsx                # Componente principal
└── main.tsx               # Ponto de entrada
```

---
## Tecnologias Utilizadas
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de construção para desenvolvimento rápido.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Firebase**: Plataforma para autenticação, banco de dados e armazenamento.

## Como Executar o Projeto
1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd condominio-conectado
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do Firebase.
5. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.