import React from 'react'
import Typography from '@mui/material/Typography'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import myfetch from '../../lib/myfetch'
import Car from '../../models/Car'
import { ZodError } from 'zod'
import { Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, Select, Switch } from '@mui/material'
import ReactInputMask from 'react-input-mask'

export default function CarForm() {



  /*
    Por padrão, todos os campos do nosso formulário terão como
    valor inicial uma string vazia. A exceção é o campo selling_date
    que, devido ao funcionamento do componente DatePicker, deve
    iniciar valendo null.
  */
  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    plates: '',
    year_manufacture: '',
    imported: false,
    selling_date: null,
    selling_price: null
  }

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false,
    inputErrors: {}
  })
  const {
    car,
    formModified,
    inputErrors
  } = state

  const params = useParams()
  const navigate = useNavigate()

  const { askForConfirmation, ConfirmDialog } = useConfirmDialog()
  const { notify, Notification } = useNotification()
  const { showWaiting, Waiting } = useWaiting()

  const maskFormChars = {
    '9': '[0-9]',
    'A': '[A-Za-z]',
    '*': '[A-Za-z0-9]',
    '$': '[A-Ja-j0-9]', // Aceita letras de A a J (maiúsculas ou minúsculas) e dígitos
    '_': '[\s0-9]'
  }



  const colors = [
    "Branco",
    "Preto",
    "Prata",
    "Laranja",
    "Vermelho",
    "Azul",
    "Amarelo",
    "Verde",
    "Roxo"
  ]

  const getYearManufactureYears = () => {
    const years_manufacture = []
    for (let currentYear = Number(new Date().getFullYear()); currentYear >= 1960; currentYear--) {
      years_manufacture.push(currentYear)
    }
    return years_manufacture
  }





  function handleFieldChange(event) {
    if (event.target.name == 'imported') {
      const carCopy = { ...car }
      carCopy[event.target.name] = Boolean(event.target.checked)
      setState({ ...state, car: carCopy, formModified: true })
    } else {
      const carCopy = { ...car }
      carCopy[event.target.name] = event.target.value
      setState({ ...state, car: carCopy, formModified: true })
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault()      // Evita que a página seja recarregada
    showWaiting(true)       // Exibe a tela de espera
    try {
      // Invoca a validação dos dados da biblioteca Zod
      // por meio do model Car
      Car.parse(car)

      // Se houver parâmetro na rota, significa que estamos modificando
      // um carro já existente. A requisição será enviada ao back-end
      // usando o método PUT
      if (params.id) await myfetch.put(`/cars/${params.id}`, car)
      // Caso contrário, estamos criando um novo carro, e enviaremos
      // a requisição com o método POST
      else await myfetch.post('/cars', car)

      // Deu certo, vamos exbir a mensagem de feedback que, quando for
      // fechada, vai nos mandar de volta para a listagem de carros
      notify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    }
    catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        // Formamos um objeto contendo os erros do Zod e
        // o colocamos na variável de estado inputErrors
        const messages = {}
        for (let i of error.issues) messages[i.path[0]] = i.message
        setState({ ...state, inputErrors: messages })
        notify('Há campos com valores inválidos no formulário', 'error')
      }
      else notify(error.message, 'error')
    }
    finally {
      // Desliga a tela de espera, seja em caso de sucesso, seja em caso de erro
      showWaiting(false)
    }
  }

  /*
    useEffect() que é executado apenas uma vez, no carregamento do componente.
    Verifica se a rota tem parâmetro. Caso tenha, significa que estamos vindo
    do componente de listagem por meio do botão de editar, e precisamos chamar
    a função loadData() para buscar no back-end os dados do carro a ser editado
  */
  React.useEffect(() => {
    if (params.id) loadData()
  }, [])

  async function loadData() {
    showWaiting(true)
    try {
      const result = await myfetch.get(`/cars/${params.id}`)

      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      if(result.selling_date){
        result.selling_date = parseISO(result.selling_date)
      }

      setState({ ...state, car: result })
    }
    catch (error) {
      console.error(error)
      notify(error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }

  async function handleBackButtonClick() {
    if (formModified &&
      ! await askForConfirmation('Há informações não salvas. Deseja realmente sair?')
    ) return  // Sai da função sem fazer nada

    // Navega de volta para a página de listagem
    navigate('..', { relative: 'path', replace: true })
  }

  return (
    <>
      <ConfirmDialog />
      <Notification />
      <Waiting />

      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar carro #${params.id}` : 'Cadastrar novo carro'}
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          <TextField
            name="brand"
            label="Marca"
            variant="filled"
            required
            fullWidth
            value={car.brand}
            onChange={handleFieldChange}
            helperText={inputErrors?.brand}
            error={inputErrors?.brand}
          />

          <TextField
            name="model"
            label="Modelo"
            variant="filled"
            required
            fullWidth
            value={car.model}
            onChange={handleFieldChange}
            helperText={inputErrors?.model}
            error={inputErrors?.model}
          />

          <TextField
            name="color"
            label="Cor"
            variant="filled"
            required
            fullWidth
            value={car.color}
            onChange={handleFieldChange}
            select
            helperText={inputErrors?.color}
            error={inputErrors?.color}
          >
            {
              colors.sort().map(color =>
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              )
            }
          </TextField>

          <TextField
            name="year_manufacture"
            label="Ano de Fabricação"
            variant="filled"
            required
            fullWidth
            value={car.year_manufacture}
            onChange={handleFieldChange}
            select
            helperText={inputErrors?.year_manufacture}
            error={inputErrors?.year_manufacture}
          >
            {
              getYearManufactureYears().map(year =>
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              )
            }
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Venda"
              value={car.selling_date}
              onChange={value => handleFieldChange({
                target: { name: 'selling_date', value }
              })}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true,
                  helperText: inputErrors?.selling_date,
                  error: inputErrors?.selling_date
                }
              }}
            />
          </LocalizationProvider>



          <TextField
            id="selling_price"
            name="selling_price"
            label="Valor de Venda"
            variant="filled"
            fullWidth
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>
            }}
            value={car.selling_price}
            onChange={handleFieldChange}
            helperText={inputErrors?.selling_price}
            error={inputErrors?.selling_price}
          />

          <ReactInputMask
            formatChars={maskFormChars}
            mask="AAA-9$99"
            value={car.plates.toUpperCase() /* Placas em maiúsculas */}
            onChange={handleFieldChange}
            maskChar=" "
          >
            {
              () =>
                <TextField
                  id="plates"
                  name="plates"
                  label="Placa"
                  variant="filled"
                  required
                  fullWidth
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                />
            }
          </ReactInputMask>

          <FormControl>
            <FormControlLabel control={<Checkbox />} label="Importado" name='imported' checked={car.imported} onChange={handleFieldChange} error={inputErrors?.imported} helperText={inputErrors?.imported} />
          </FormControl>


          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              onClick={handleBackButtonClick}
            >
              Voltar
            </Button>
          </Box>

          {/* <Box sx={{ fontFamily: 'monospace', display: 'flex', width: '100%' }}>
            {JSON.stringify(inputErrors)}
          </Box>
          <Box sx={{ fontFamily: 'monospace', display: 'flex', width: '100%' }}>
            {JSON.stringify(car)}
          </Box> */}

        </form>
      </Box>
    </>
  )
}