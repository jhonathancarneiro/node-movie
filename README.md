# My Movies - Backend

Este é o backend do projeto My Movies, uma aplicação para gerenciar seus filmes favoritos. O backend é responsável por fornecer os dados dos filmes, autenticação de usuários e gerenciamento das listas de filmes.

## Funcionalidades

- Cadastrar e autenticar usuários
- Listar filmes disponíveis
- Consultar detalhes de um filme
- Adicionar e remover filmes da lista 

## Tecnologias Utilizadas

- Node.js
- Express (framework web)
- Prisma (ORM para acesso ao banco de dados)
- Bcrypt (para criptografia de senhas)
- JWT (para autenticação via tokens)
- Cors (para permitir requisições de origens diferentes)
- Helmet (para segurança da aplicação)

## Instalação

1. Clone o repositório para o seu computador:

   ```bash
   git clone https://github.com/jhonathancarneiro/node-movie.git

Navegue até o diretório do projeto:

cd my-movies-backend

2. Instale as dependências do projeto:

yarn install

3. Execute as migrações do banco de dados para criar as tabelas necessárias:

npx prisma migrate dev


4. Inicie o servidor:

yarn dev

Uso
O backend fornecerá uma API para o frontend se comunicar e obter os dados dos filmes. O frontend enviará as requisições HTTP para o backend para realizar a autenticação, listar os filmes e gerenciar a lista de favoritos dos usuários.

Rotas

- `/` — Login.
- `/register` — Cadastro usuario.
- `/movies` - Lista de Filmes
