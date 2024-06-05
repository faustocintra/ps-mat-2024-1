import { z } from 'zod'

const maxDate = new Date()
const currentYear = new Date().getFullYear()

export default z.object({

    brand:
        z.string()
        .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres' }),

    model:
        z.string()
        .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres' }),

    color:
        z.string()
        .max(12, { message: 'A cor deve ter, no máximo, 12 caracteres' }),

    year_manufacture:
        z.coerce.number()
        .max(currentYear, { message: 'O ano de fabricação não pode estar no futuro'})
        .min(1960, { message: 'O ano não pode ser anterior a 1960' }),
    
    imported:
        z.coerce.boolean(),
    
    selling_date:
        z.coerce.date()
        .max(maxDate, { message: 'A data de venda não pode estar no futuro' }),
    
    selling_price:
        z.coerce.number()
        .max(5000000, { message: 'O preço de venda não pode ser maior do que R$5.000.000,00' })
        .min(1000, { message: 'O preço de venda não pode ser menor do que R$1.000,00' })
})