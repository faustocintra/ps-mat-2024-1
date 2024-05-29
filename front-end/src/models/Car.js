import { z } from 'zod'

/*
    Calcular o year_manufacture
*/
const maxYearManufacture = new Date() // hoje
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear() + 1)

// O carro tem que ser de no maximo 1960
const minYearManufacture = new Date()
minYearManufacture.setFullYear(minYearManufacture.getFullYear - 64)

const maxSellingDate = new Date() // hoje
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear() + 1)


export default z.object({
    brand:
        z.string()
            .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres' }),

    year_manufacture:
        // coerce força a conversao para o tipo date, se o valor recebido for string
        z.coerce.number()
            .min(minYearManufacture, { message: 'O carro é muito antigo' })
            .max(maxYearManufacture, { message: 'Data inválida de criação, ainda não estamos nesse ano' }),

    model:
        z.string()
            .max(25, { message: 'O modelo pode ter, no máximo, 25 caracteres' }),

    color:
        z.string()
            .max(12, { message: 'A cor pode ter, no máximo, 12 caracteres' }),

    imported:
        z.coerce.boolean()
            .nullable(),

    selling_date:
        z.coerce.date()
            .max(maxSellingDate, { message: 'Não estamos no futuro' })
            .nullable(),

    selling_price:
        z.coerce.number()
            .min(1000, { message: 'Preço muito baixo' })
            .max(5000000, { message: 'Preço muito alto' })
            .nullable()
})
