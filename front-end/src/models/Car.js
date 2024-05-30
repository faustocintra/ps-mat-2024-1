import { z } from 'zod'

// O carro pode ter produzido até 1960
const minManufacture = new Date()
minManufacture.setFullYear(minManufacture.getFullYear() - 64)

const maxSellingDate = new Date()   // Hoje
maxSellingDate.setFullYear(maxSellingDate.getFullYear())

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
    z.coerce.date()
    .min(minManufacture, { message: 'Ano de fabricação está muito no passado' }),

    imported:
    z.boolean(),

    selling_date:
    // coerce força a conversão para o tipo Date, se o valor recebido for string
    z.coerce.date()
    .max(maxSellingDate, { message: 'A data de venda não deve estar no futuro' })
    .nullable(),   // O campo é opcional
      
    selling_price:
    // 
    z.coerce.number()
    .nullable(),   // O campo é opcional

})