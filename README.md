# Comando de criação do projeto back-end

npx @aka-demy/create-express-app
Perguntas que o comando faz:
app-name: back-end
*Language: JavaScript
*Template engine: None
*Package manager: npm

http://localhost:8080/

# instalação do Prisma
npm install prisma --save-dev

# inicialização do Prisma 
npx prisma init --datasource-provider postgresql

# Executar uma migration
npx prisma migrate dev --name create-cars

# Comando de criação do projeto front-end
npm create vite@latest

Perguntas que o comdando faz:
* Pk to proceed? y
* Project name: front-end
* select framework: React
* Select a variant: JavaScript

Em seguida executar os comandos:
cd front-end
npm install
npm run dev

# Instalação das ibliotecas adicionais no projeto front-end
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material