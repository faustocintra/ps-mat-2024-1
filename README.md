# Comando criacção do projeto back-end
npx @aka-demy/create-express-app
Perguntas que o comando faz:
* Give a name for the app: back-end
* Language: Javascript
* TemplateEngine: None
* Package manager: npm

cd back-end
npm run dev

supaDB batatinha1quando2nasce3

# Instalação do Prisma
npm install prisma --save-dev

# Iniciação do Prisma
npx prisma init --datasource-provider postgresql

# Executar uma migration
npx prisma migrate dev --name create-cars

# Comando de criação do projeto front-end
npm create vite@latest

Perguntas que o comando faz:
* Ok to proceed? y
* Project name: front-end
* Select a framework: React
* Select a variant: JavaScript

cd front-end
npm install
npm run dev

# Instalação de bibliotecas adicionais no projeto front-end
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material