import { z } from 'zod';

const currentYear = new Date().getFullYear();

const CarSchema = z.object({
  brand: z.string().max(25),
  model: z.string().max(25),
  color: z.string().max(12),
  year_manufacture: z.number().int().min(1960).max(currentYear),
  imported: z.boolean(),
  selling_date: z.date().max(new Date(), { message: 'A data de venda não pode estar no futuro.' }).optional(),
  selling_price:
    z.coerce.number()
    .min(1000, { message: 'O preço de venda deve ser maior ou igual a 1.000' })
    .max(5000000, { message: 'O preço de venda deve ser menor ou igual a 5.000.000' })
    .nullable(),
})

export default CarSchema;


