# Comando de criação do projeto back-end
npx @aka-demy/create-express-app

Perguntas que o comando faz:
* Give a name fot the app: back-end
* Language: Javascript
* Template engine: None
* Choose a package manager: npm

# Instalação do Prisma
npm install prisma --save-dev

# Inicialização do Prisma
npx prisma init --datasource-provider postgresql

# Executar uma migration
npx prisma migrate dev --name create-cars

# Para quem está no micro do Laboratório
DATABASE_URL="postgresql://postgres:fatec123*@localhost:5432/karangos?schema=public"

# Comando de criação do projeto front-end
npm create vite@latest

Perguntas que o comando faz:
* Ok to proceed? y
* Project name: front-end
* Select a framework: React
* Select a variant: JavaScript

Em seguida, executar os seguintes comandos no terminal:
cd front-end
npm install
npm rund dev

# Instalação das bibliotecas
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto

# Istalação do data-grid

npm install @mui/x-data-grid