# ps-mat-2024-1
Repositório da disciplina Eletiva II - Programação de Scripts, 5º semestre ADS matutino Fatec Franca 2024/1
# Instalação do Prisma 
npm install prima --save-dev

# Inicialização  do Prisma 
npx prisma init --datasource-provider postgresql

# Executar uma migration 
npx prisma migrate dev --name init 
