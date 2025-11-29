# API de Clínica Médica Didática

Este projeto é um backend didático completo em Node.js, utilizando Express, com foco em ensinar arquitetura em camadas, boas práticas e lógica de programação.

## Objetivo

O backend expõe uma API REST para gerenciar Pacientes, Médicos e Consultas, seguindo uma arquitetura em camadas (Controller, Service, Repository) e utilizando DTOs para entrada/saída de dados. A documentação da API é gerada com Swagger/OpenAPI 3.

## Estrutura de Pastas

A estrutura do projeto é organizada da seguinte forma para demonstrar a separação de responsabilidades:

```
Backend/
├── src/
│   ├── controllers/        # Recebe requisições HTTP, chama o service e envia respostas.
│   │   ├── pacientes.controller.ts
│   │   ├── medicos.controller.ts
│   │   └── consultas.controller.ts
│   ├── services/           # Contém a lógica de negócio e validações.
│   │   ├── pacientes.service.ts
│   │   ├── medicos.service.ts
│   │   └── consultas.service.ts
│   ├── repositories/       # Lida com o acesso a dados (mock em memória).
│   │   ├── pacientes.repository.ts
│   │   ├── medicos.repository.ts
│   │   └── consultas.repository.ts
│   ├── dtos/               # Data Transfer Objects para entrada/saída de dados.
│   │   ├── create-paciente.dto.ts
│   │   ├── update-paciente.dto.ts
│   │   ├── create-medico.dto.ts
│   │   ├── update-medico.dto.ts
│   │   ├── create-consulta.dto.ts
│   │   └── update-consulta.dto.ts
│   ├── routes/             # Define as rotas da API e agrupa por recurso.
│   │   ├── pacientes.routes.ts
│   │   ├── medicos.routes.ts
│   │   ├── consultas.routes.ts
│   │   └── index.ts        # Agrupa todas as rotas
│   ├── database/           # Simula um banco de dados em memória (arrays).
│   │   └── mock-db.ts
│   ├── config/             # Arquivos de configuração (ex: Swagger).
│   │   └── swagger.yaml
│   └── app.ts              # Ponto de entrada da aplicação (configuração do Express).
├── package.json
├── tsconfig.json
└── README.md
```

## Requisitos Técnicos Implementados

-   **Node.js + Express**: Framework web para construção da API.
-   **TypeScript**: Para tipagem estática e melhor organização do código.
-   **Swagger / OpenAPI 3**: Para documentação interativa da API, acessível em `/api-docs`.
-   **DTOs**: Utilizados para validar e tipar a entrada e saída de dados.
-   **Arquitetura em Camadas**:
    -   **Controllers**: Orquestram requisições e respostas.
    -   **Services**: Contêm a lógica de negócio e validações.
    -   **Repositories**: Realizam o acesso a dados (usando mock em memória).
-   **Banco Mockado**: Arrays em memória (`mock-db.ts`) simulam um banco de dados.
-   **Middleware de Tratamento de Erros**: Captura e formata erros (400, 404, 500).
-   **Validação Básica de Dados**: Implementada nos DTOs.
-   **Rotas Separadas**: Organizadas por recurso e agrupadas em `routes/index.ts`.
-   **Scripts NPM**: `start` para produção e `dev` para desenvolvimento.

## Entidades e Campos

### Paciente

-   `id` (string)
-   `nome` (string)
-   `email` (string)
-   `telefone` (string)
-   `dataNascimento` (string - AAAA-MM-DD)
-   `cpf` (string)
-   `endereco` (string)

### Médico

-   `id` (string)
-   `nome` (string)
-   `especialidade` (string)
-   `crm` (string)
-   `email` (string)
-   `telefone` (string)

### Consulta

-   `id` (string)
-   `pacienteId` (string)
-   `medicoId` (string)
-   `data` (string - ISO 8601)
-   `motivo` (string)
-   `observacoes` (string, opcional)
-   `status` (string - "AGENDADA", "CONCLUIDA", "CANCELADA")

## Funcionalidades e Regras de Negócio

-   **Pacientes**: `POST /api/pacientes`, `GET /api/pacientes`, `GET /api/pacientes/:id`, `PUT /api/pacientes/:id`, `DELETE /api/pacientes/:id`
-   **Médicos**: `POST /api/medicos`, `GET /api/medicos`, `GET /api/medicos/:id`, `PUT /api/medicos/:id`, `DELETE /api/medicos/:id`
-   **Consultas**: `POST /api/consultas`, `GET /api/consultas`, `GET /api/consultas/:id`, `PUT /api/consultas/:id`, `DELETE /api/consultas/:id`

### Regras de Negócio Específicas para Consultas

-   Não permitir criar consulta no passado.
-   Validar se `pacienteId` e `medicoId` existem.
-   Não permitir duas consultas para o mesmo médico no mesmo horário.

## Como Rodar o Projeto

1.  **Navegue até a pasta do projeto:**
    ```bash
    cd ProjetoGuia
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Para rodar em modo de desenvolvimento (com `ts-node-dev` para hot-reload):**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

4.  **Para construir e rodar em modo de produção:**
    ```bash
    npm run build
    npm start
    ```

5.  **Acesse a Documentação Swagger:**
    Com o servidor rodando, abra seu navegador e acesse:
    [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Exemplos de Chamadas de API (cURL)

Assumindo que o servidor está rodando em `http://localhost:3000/api`.

### Pacientes

#### Criar Paciente (POST /pacientes)
```bash
curl -X POST \
  http://localhost:3000/api/pacientes \
  -H 'Content-Type: application/json' \
  -d '{
    "nome": "Carlos Eduardo",
    "email": "carlos.eduardo@example.com",
    "telefone": "11912345678",
    "dataNascimento": "1992-03-22",
    "cpf": "111.222.333-44",
    "endereco": "Rua da Paz, 789, Centro, São Paulo - SP"
  }'
```

#### Listar Pacientes (GET /pacientes)
```bash
curl http://localhost:3000/api/pacientes
```

#### Buscar Paciente por ID (GET /pacientes/:id)
(Substitua `[ID_DO_PACIENTE]` pelo ID real de um paciente)
```bash
curl http://localhost:3000/api/pacientes/[ID_DO_PACIENTE]
```

#### Atualizar Paciente (PUT /pacientes/:id)
(Substitua `[ID_DO_PACIENTE]` pelo ID real de um paciente)
```bash
curl -X PUT \
  http://localhost:3000/api/pacientes/[ID_DO_PACIENTE] \
  -H 'Content-Type: application/json' \
  -d '{
    "telefone": "11998877665",
    "endereco": "Avenida Brasil, 1000, Jardim, São Paulo - SP"
  }'
```

#### Remover Paciente (DELETE /pacientes/:id)
(Substitua `[ID_DO_PACIENTE]` pelo ID real de um paciente)
```bash
curl -X DELETE \
  http://localhost:3000/api/pacientes/[ID_DO_PACIENTE]
```

### Médicos

#### Criar Médico (POST /medicos)
```bash
curl -X POST \
  http://localhost:3000/api/medicos \
  -H 'Content-Type: application/json' \
  -d '{
    "nome": "Dra. Fernanda Lima",
    "especialidade": "Dermatologia",
    "crm": "CRM/RJ 987654",
    "email": "fernanda.lima@example.com",
    "telefone": "21987654321"
  }'
```

#### Listar Médicos (GET /medicos)
```bash
curl http://localhost:3000/api/medicos
```

#### Buscar Médico por ID (GET /medicos/:id)
(Substitua `[ID_DO_MEDICO]` pelo ID real de um médico)
```bash
curl http://localhost:3000/api/medicos/[ID_DO_MEDICO]
```

#### Atualizar Médico (PUT /medicos/:id)
(Substitua `[ID_DO_MEDICO]` pelo ID real de um médico)
```bash
curl -X PUT \
  http://localhost:3000/api/medicos/[ID_DO_MEDICO] \
  -H 'Content-Type: application/json' \
  -d '{
    "telefone": "21999998888",
    "especialidade": "Dermatologia Estética"
  }'
```

#### Remover Médico (DELETE /medicos/:id)
(Substitua `[ID_DO_MEDICO]` pelo ID real de um médico)
```bash
curl -X DELETE \
  http://localhost:3000/api/medicos/[ID_DO_MEDICO]
```

### Consultas

#### Criar Consulta (POST /consultas)
(Substitua `[ID_DO_PACIENTE]` e `[ID_DO_MEDICO]` pelos IDs reais)
```bash
curl -X POST \
  http://localhost:3000/api/consultas \
  -H 'Content-Type: application/json' \
  -d '{
    "pacienteId": "[ID_DO_PACIENTE]",
    "medicoId": "[ID_DO_MEDICO]",
    "data": "2025-12-20T14:00:00Z",
    "motivo": "Consulta de rotina",
    "status": "AGENDADA",
    "observacoes": "Paciente com histórico de alergias."
  }'
```

#### Listar Consultas (GET /consultas)
```bash
curl http://localhost:3000/api/consultas
```

#### Buscar Consulta por ID (GET /consultas/:id)
(Substitua `[ID_DA_CONSULTA]` pelo ID real de uma consulta)
```bash
curl http://localhost:3000/api/consultas/[ID_DA_CONSULTA]
```

#### Atualizar Consulta (PUT /consultas/:id)
(Substitua `[ID_DA_CONSULTA]` pelo ID real de uma consulta)
```bash
curl -X PUT \
  http://localhost:3000/api/consultas/[ID_DA_CONSULTA] \
  -H 'Content-Type: application/json' \
  -d '{
    "status": "CONCLUIDA",
    "observacoes": "Consulta realizada com sucesso. Próximo retorno em 6 meses."
  }'
```

#### Remover Consulta (DELETE /consultas/:id)
(Substitua `[ID_DA_CONSULTA]` pelo ID real de uma consulta)
```bash
curl -X DELETE \
  http://localhost:3000/api/consultas/[ID_DA_CONSULTA]
