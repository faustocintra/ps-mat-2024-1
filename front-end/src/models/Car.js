import { z } from 'zod'

/*
  id                Int         @id @default(autoincrement())
  brand             String      // Marca do carro
  model             String      // Modelo do carro
  color             String      // Modelo do carro
  year_manufacture  Int         // Ano de fabricação
  imported          Boolean     @default(false)  // Importado?
  plates            String      // Placas
  selling_date      DateTime?   // Data de venda
  selling_price     Decimal?    // Preço de venda
*/

/*
  brand máximo de 25 caracteres
  model máximo de 25 caracteres
  color máximo de 12 caracteres
  year_manufacture deve ser numérico e estar entre 1960 e o ano atual (calculado);
  imported: deve ser um valor booleano (consultar docs do zod)
  selling_date: data não pode estar no futuro; opcional;
  selling_price: deve ser numérico (consulte "coerce" no zod), com valor maior ou igual a 1000 e menor ou igual a 5000000; OPCIONAL
*/
const maxYearManufacture = new Date()   // Hoje


export default z.object({
  brand:
    z.string()
      .min(1, { message: 'O campo "marca" do veículo não pode estar vazia.' })
      .max(25, { message: 'O nome da marca não pode ultrapassar os 25 caracteres.' })
  ,

  model:
    z.string()
      .min(1, { message: 'O campo "modelo" do veículo não pode estar vazio.' })
      .max(25, { message: 'O nome do modelo do veículo não pode ultrapassar os 25 caracteres.' })
  ,

  color:
    z.string()
      .min(1, { message: 'O campo "cor" do veículo não pode estar vazio.' })
      .max(25, { message: 'A cor do veículo não pode ultrapassar os 25 caracteres.' })
  ,

  year_manufacture:
    z.coerce.number()
      .min(1960, { message: 'O ano de fabricação do veículo não pode ser anterior a 1960.' })
      .max(maxYearManufacture.getFullYear(), { message: 'O ano de fabricação do veículo não pode ser superior ao ano atual.' })
  ,

  imported:
    z.coerce.boolean()
  ,

  selling_date:
    z.coerce.date()
      .max(maxYearManufacture, { message: 'O ano de venda não pode estar no futuro.' })
      .nullable()
  ,

  selling_price:
    z.coerce.number()
      .min(1000, { message: 'O valor mínimo de venda é de 1.000' })
      .max(5000000, { message: 'O valor máximo de venda é de 5.000.000' })
      .nullable()
})