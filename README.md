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