# API Mock - JSON Server

Este diretório contém a configuração simplificada do JSON Server para desenvolvimento.

## Estrutura

- **`db.json`** - Arquivo principal com os dados das transações
- **`routes.json`** (opcional) - Define rotas customizadas para a API

## Como usar

### Configuração Básica (Recomendada)

```bash
# Instala o json-server na versão abaixo
npm install -D json-server@0.17.4
```

```bash
# Inicia o servidor com watch mode na porta 3001
npm run server
```

### Com Rotas Customizadas

Se você precisar de rotas diferentes (ex: `/api/transactions`), use:

```bash
npm run server:routes
```

Isso usa o arquivo `routes.json` para mapear rotas customizadas.

O servidor estará disponível em: `http://localhost:3001`

## Endpoints disponíveis

### GET /transactions

Retorna todas as transações

### GET /transactions/:id

Retorna uma transferência específica

### POST /transactions

Cria uma nova transferência

**Body:**

```json
{
  "amount": 100.00,
  "currency": "BRL",
  "description": "Descrição da transferência",
  "date": "2024-01-15T14:30:00Z",
  "type": "income" | "expense",
  "category": "alimentacao",
  "status": "pending" | "completed",
  "paymentMethod": "credit_card"
}
```

### PUT /transactions/:id

Atualiza uma transferência completa

### PATCH /transactions/:id

Atualiza parcialmente uma transferência

### DELETE /transactions/:id

Deleta uma transferência

## Tratamento de erros

A API retorna erros estruturados:

```json
{
  "error": "Tipo de erro",
  "message": "Mensagem descritiva",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

### Códigos de status HTTP

- `200` - Sucesso
- `400` - Dados inválidos
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor
