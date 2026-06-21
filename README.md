# Reserva de Salas — Backend

API REST com Fastify para o sistema de reserva de salas.

> O README completo do projeto (decisões, setup, arquitetura) está no [repositório do frontend](https://github.com/NicollasRyan/Reservas-Salas-FrontEnd).

## Setup rápido

```bash
npm install
```

Crie o arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/reserva_salas"
PORT=3333
CORS_ORIGIN="http://localhost:3000"
NODE_ENV="development"
```

```bash
npx prisma migrate deploy
npx prisma generate
npm run dev
```

API disponível em `http://localhost:3333`.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/salas` | Lista todas as salas |
| POST | `/salas` | Cria uma sala |
| PUT | `/salas/:id` | Atualiza uma sala |
| DELETE | `/salas/:id` | Remove uma sala |
| GET | `/reservas` | Lista reservas (filtros: `salaId`, `page`, `pageSize`, `orderBy`) |
| POST | `/reservas` | Cria uma reserva |
| PUT | `/reservas/:id` | Atualiza uma reserva |
| DELETE | `/reservas/:id` | Remove uma reserva |
