// import { z } from 'zod';

// const currentYear = new Date().getFullYear();

// const CarSchema = z.object({
//   brand: z.string().max(25),
//   model: z.string().max(25),
//   color: z.string().max(12),
//   year_manufacture: z.number().int().min(1960).max(currentYear),
//   imported: z.boolean(),
//   selling_date: z.date().max(new Date(), { message: 'A data de venda não pode estar no futuro.' }).optional(),
//   selling_price:
//     z.coerce.number()
//     .min(1000, { message: 'O preço de venda deve ser maior ou igual a 1.000' })
//     .max(5000000, { message: 'O preço de venda deve ser menor ou igual a 5.000.000' })
//     .nullable(),
// })

// export default CarSchema;


import { z } from 'zod';

const currentYear = new Date().getFullYear()  //hoje



const CarSchema = z.object({
  brand: 
    z.string()
    .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres' }),
  model: 
   z.string()
   .max(25, { message: 'A marca deve ter no máximo, 25 caracteres'}),
  color: z.string()
   .max(12, { message: 'A cor precisa ter, no máximo, 12 caracteres'}),

  year_manufacture: 
   z.number()
   .int( { message: 'O ano de fabricação precisa ser um número inteiro'})
   .min(1960, {message: 'O ano de fabricação precisa ser no mínimo em 1960'})
   .max(currentYear, {message: 'O ano de fabricação precisa ser até o ano atual'}),

  imported: 
   z.coerce.boolean(),

  selling_date:
    z.coerce.date()
    .refine(date => date <= new Date(), { message: 'A data de venda não pode estar no futuro' })
    .nullable(),
      
  selling_price:
    z.coerce.number()
      .min(1000, { message: 'O preço de venda deve ser maior ou igual a 1.000' })
      .max(5000000, { message: 'O preço de venda deve ser menor ou igual a 5.000.000' })
      .nullable(),
})

export default CarSchema;



