# Prova CEAD - Sistema de Agendamento de Eventos

Este projeto consiste em um sistema de agendamento de eventos institucionais, composto por um backend em Laravel (API) e um frontend em Next.js.

## 🏗️ Estrutura do Projeto

O repositório está organizado da seguinte forma:

- **[events-cead-api-v2](./events-cead-api-v2)**: Backend (Laravel 10+) que fornece a API REST para gerenciamento de salas, pessoas e eventos.
- **[events-cead-frontend](./events-cead-frontend)**: Frontend (Next.js 15+) utilizando React, Tailwind CSS e integração com a API via Rewrites.

## 🚀 Como Executar

### 1. Requisitos
- PHP 8.1+
- Composer
- Node.js 18+ & npm
- MySQL/MariaDB

### 2. Configuração do Backend (API)
```bash
cd events-cead-api-v2
composer install
cp .env.example .env
# Configure seu banco de dados no .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8080
```

### 3. Configuração do Frontend
```bash
cd events-cead-frontend
npm install
npm run dev
```
O frontend estará acessível em `http://localhost:3000`.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Laravel, MySQL, Eloquent ORM.
- **Frontend**: Next.js, React, Tailwind CSS.
- **Integração**: Next.js Rewrites para proxy de API, evitando problemas de CORS em desenvolvimento.

## 📝 Notas de Desenvolvimento

- **Horário Comercial**: O cadastro de eventos possui uma trava de segurança via Middleware que permite operações apenas em horário comercial (08h às 18h). Em ambiente `local`, essa trava é automaticamente ignorada para facilitar os testes.
- **Consistência de Dados**: O sistema utiliza o campo `celular` para o cadastro de pessoas, sincronizado entre banco de dados, modelos e interfaces.
