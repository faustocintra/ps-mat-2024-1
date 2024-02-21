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

# Executar migration
npx prisma migrate dev --name create-cars