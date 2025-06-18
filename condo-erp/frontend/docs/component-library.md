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
```

---

## 2. Card

Um componente para exibir conteúdo em um formato de cartão, com sombra e bordas arredondadas.

### Propriedades (Props)

| Nome | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| children | node | Sim | Conteúdo a ser exibido dentro do cartão. |
| title | string | Não | Título opcional do cartão. |
| className | string | Não | Classes CSS adicionais. |

### Exemplos de Uso

```jsx
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
```
