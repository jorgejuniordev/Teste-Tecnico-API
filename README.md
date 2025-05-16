# Gerenciador Financeiro

## Requisitos

- Node.js
- PostgreSQL

## Configuração

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis necessárias (DATABASE_URL, JWT_SECRET, etc)

## Iniciando o Projeto Localmente

1. Inicie o servidor:

```bash
npm run start:dev
```

Obs.: caso for iniciar o projeto em produção, é necessário modificar o arquivo `src/app.module.ts`
de

```bash
synchronize: true
```

para

```bash
synchronize: false
```

2. Execute o seeder para criar o usuário administrador padrão e categorias:

```bash
npm run seed
```

## Endpoints

- POST /auth/login - Login

- GET /financial-categories - Listar categorias
- POST /financial-categories - Criar categoria
- PATCH /financial-categories/:id - Atualizar categoria
- DELETE /financial-categories/:id - Deletar categoria

- GET /financial-entries - Listar registros
- GET /financial-entries/resume/:startDate/:endDate - Resumo de registros entre datas
- POST /financial-entries - Criar registro
- PATCH /financial-entries/:id - Atualizar registro
- DELETE /financial-entries/:id - Deletar registro
