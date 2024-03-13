# Comando de criação do projeto back-end
npx @aka-demy/create-express-app

Perguntas feitas pelo comando:
 * Give a name for the app: back end
 * Language: Javascript
 * Template engine: none
 * Package manager: npm

# Instalação do Prisma
npm install prisma --save-dev

# Inicialização do Prisma
npx prisma init --datasource-provider postgresql

# Criar tabelas no arquivo schema.prisma 

# Executar migration
npx prisma migrate dev --name create-*nome*
criar arquivos de controller, routes e icluir route em app.jsx

Comando para teste: npm run dev
Thunderclient New Request no endereço http://localhost:8080/*route*

# Instalar bycrypt para criptografar senhas
npm install bcrypt

# Instalar jsonwebtoken para autenticação de usuário
npm install jsonwebtoken

# Criar método em controller/user
controller.login

# Instalar dotenv
npm install dotenv
criar senha TOKEN_SECRET no arquivo .env
importar dotenv no arquivo app.js
passar o TOKEN_SECRET para gerar token em controller.login