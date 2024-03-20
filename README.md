# Comando de criação do projeto back-end
npx @aka-demy/create-express-app

Perguntas que o comando faz:
* Give a name for the app: back-end
* Language: Javascript
* Template engine: None
* Package manager: npm

# Instalação do Prisma
npm install prisma --save-dev

# Inicialização do Prisma
npx prisma init --datasource-provider postgresql

# Executar uma migration
npx prisma migrate dev --name create-cars

# Comando de criação do projeto front-end
npm create vite@latest
*
# perguntas que o comando faz:
* Ok to proceed ? y
* Project Name: Front-end
* select a framework: React
* Select a variant: Javascript

# em seguida executar os seguintes comandos4
* cd front-end
* npm install 
* npm run dev 

# Instalação de bibliotecas adicionais no projeto front-end
npm install react-router-dom
npm install @fontsource/roboto