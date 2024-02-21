# Comando de criação do projeto back-end
npx @aka-demy/create-express-app
Perguntas que o comando faz:
*Give a name for the app: back-end
*Language: JavaScript
*Template: none
*package manager: npm

cd back-end
npm run dev

supaDB Batatinha1Quando2Nasce3

# Instalação do Prisma
npm install prisma --save -dev

# inicialização do Prisma
npx prisma init --datasource-provider postgresql

# Executar Migration
npx prisma migrate dev --name create-cars



