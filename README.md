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