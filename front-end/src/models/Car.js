import { z } from 'zod'

// O carro pode ter produzido até 1960
const minManufacture = new Date()
minManufacture.setFullYear(minManufacture.getFullYear() - 65)

const maxSellingDate = new Date()   // Hoje
maxSellingDate.setFullYear(maxSellingDate.getFullYear())

const currentYear = new Date().getFullYear();

  export default z.object({

    brand:
    z.string()
    .max(25, { message: 'Brand deve ter, no máximo, 25 caracteres' }),
    
    model:
    z.string()
    .max(25, { message: 'Model deve ter, no máximo, 25 caracteres' }),

    color:
    z.string()
    .max(12, { message: 'Color deve ter, no máximo, 12 caracteres' }),

    year_manufacture:
    z.number()
    .int({ message: 'O ano de fabricação deve ser um número inteiro' })
    .min(1960, { message: 'O ano de fabricação deve ser entre 1960 e o ano atual' })
    .max(currentYear, { message: 'O ano de fabricação deve ser entre 1960 e o ano atual' }),

    imported:
    z.boolean(),

    plates:
    z.string()
    .transform(val => val.trim())
    // Depois de um transform(), não podemos mais usar length(). Por isso,
    // precisamos usar uma função personalizada com refine() para validar
    // o tamanho do campo
    .refine(val => val.length === 8, { message: 'A placa está errada. Falta algum dígito. As letras devem ser maiúsculas' }),


    selling_date:
    // coerce força a conversão para o tipo Date, se o valor recebido for string
    z.coerce.date()
    .max(maxSellingDate, { message: 'A data de venda não deve estar no futuro' })
    .nullable(),   // O campo é opcional
      
    // z.string()
    //.max(8, { message: 'O número da placa deve conter 8 caracteres' }),
    //.length(8, { message: 'O número da placa deve conter 3 letras e 4 numeros' }),
    
    selling_price:
    z.coerce.number()
    //.trim()
    //.transform(v => v.replace('R$', ''))
    .min(1000, { message: 'Valor do veículo não pode ser inferior a R$ 1.000,00'})
    .max(5000000, { message: 'Valor do veículo não pode ser superior a R$ 5.000.000,00'})
    .nullable(),
    
})