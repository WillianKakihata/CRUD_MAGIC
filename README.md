# 🧙‍♂️ API Magic - Gerador de Decks para Magic: The Gathering

Esta API é um serviço completo para criação, importação e gerenciamento de decks de Magic: The Gathering. Ela permite gerar decks aleatórios (com um comandante e 99 cartas), importar decks personalizados, além de oferecer funcionalidades de CRUD para cartas e usuários. A integração com as APIs externas como **Scryfall** e **MTG API** garante que as informações estejam sempre atualizadas.

---

## 📦 Instalação e Execução

### Pré-requisitos

- Docker
- Node.js

### Subindo o RabbitMQ com Docker

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
```

### Instalando dependências

```bash
cd CardsCrud
npm install
```

### Iniciando os servidores

```bash
# Servidor principal (CRUD)
npm run start:dev 'CRUD'

# Servidor de notificações (WebSocket + RabbitMQ)
npm run start:dev 'notification_queue'

# Servidor de importação assíncrona
npm run start:dev 'rmq-process'
```

---

## 📁 Estrutura do Projeto

- `CardsCrud`: CRUD de cartas, geração/importação de decks, autenticação.
- `notification_queue`: Gerencia notificações em tempo real via WebSockets.
- `rmq-process`: Processa importações de decks usando RabbitMQ.

---

## 🔧 Endpoints da API

### 📌 Cartas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/cards` | Cria uma nova carta. |
| GET    | `/cards` | Lista todas as cartas (**requer Admin**). |
| GET    | `/cards/:id` | Retorna uma carta específica por ID. |
| POST   | `/cards/:id` | Atualiza os dados de uma carta. |
| DELETE | `/cards/:id` | Remove uma carta do sistema. |

### 🧩 Geração e Importação de Decks

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/cards/generate` | Gera um deck aleatório com 1 comandante e 99 cartas válidas. |
| POST   | `/cards/import` | Importa um deck de cartas com validações. |

### 👤 Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/user` | Cria um novo usuário. |
| GET    | `/user` | Lista todos os usuários. |
| POST   | `/user/:username` | Atualiza dados de um usuário específico. |
| DELETE | `/user/:username` | Remove um usuário do sistema. |

### 🔐 Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/auth/login` | Realiza login e retorna um token JWT. |

### 🧪 Produtor de Cartas (Testes)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/cards-producer/place-card` | Envia uma carta para a fila do RabbitMQ para testes. |

---

## 🧵 `notification_queue` - Notificações em Tempo Real

Gerencia notificações via **RabbitMQ** e **WebSockets**.

### Funcionamento

1. O servidor escuta mensagens nas filas do RabbitMQ.
2. Ao receber um evento (ex: deck criado), envia uma notificação por WebSocket.
3. O cliente recebe e atualiza a interface automaticamente.

---

## 🔁 `rmq-process` - Importação Assíncrona de Decks

Gerencia o processo de importação de decks em segundo plano.

### Etapas

1. O usuário envia uma requisição de importação.
2. Os dados são enviados para a fila `deck_import_queue`.
3. O worker consome a fila, valida e processa o deck.
4. Ao final, envia status para a fila `deck_updates_queue`.
5. Um consumidor envia a notificação ao cliente via WebSocket.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**, **Express**, **TypeScript**
- **RabbitMQ** (via Docker)
- **WebSockets**
- **APIs externas**: [Scryfall](https://scryfall.com/docs/api), [MTG API](https://magicthegathering.io/)

---

## 📬 Contribuições

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue antes para discutirmos juntos.

---

## 🧙‍♂️ Feito com magia por jogadores de Magic para jogadores de Magic.
