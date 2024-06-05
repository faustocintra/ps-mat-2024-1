import { z } from 'zod';
// Obter o ano atual
const currentYear = new Date().getFullYear();
 
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
    z.number()
    .int({ message: 'O ano de fabricação deve ser um número inteiro' })
    .min(1960, { message: 'O ano de fabricação deve ser entre 1960 e o ano atual' })
    .max(currentYear, { message: 'O ano de fabricação deve ser entre 1960 e o ano atual' }),
 
  imported:
    z.boolean({ message: 'O campo importado deve ser um valor booleano' }),
 
  selling_date:
    z.coerce.date()
    .refine(date => date <= new Date(), { message: 'A data de venda não pode estar no futuro' })
    .nullable(),
 
  selling_price:
    z.coerce.number()
    .min(1000, { message: 'O preço de venda deve ser maior ou igual a 1.000' })
    .max(5000000, { message: 'O preço de venda deve ser menor ou igual a 5.000.000' })
    .nullable(),
});