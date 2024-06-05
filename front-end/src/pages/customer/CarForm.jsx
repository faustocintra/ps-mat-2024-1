import React from 'react'
import Typography from '@mui/material/Typography'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import useConfirmDialog from '../../ui/useConfirmDialog'
import useNotification from '../../ui/useNotification'
import useWaiting from '../../ui/useWaiting'
import myfetch from '../../lib/myfetch'
import Car from '../../models/Car'
import { ZodError } from 'zod'

export default function CarForm() {

  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: false,
    plates: '',
    selling_date: null,
    selling_price: ''
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

  const colors = [
    'Amarelo',
    'Azul',
    'Branco',
    'Cinza',
    'Prata',
    'Preto',
    'Rosa',
    'Verde',
    'Vermelho'
  ].sort()

  const platesMaskFormatChars = {
    '9': '[0-9]',
    'A': '[A-Ja-j]',
    '$': '[0-9A-Ja-j]',
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1959 }, (_, i) => currentYear - i)

  function handleFieldChange(event) {
    const carCopy = { ...car }
    carCopy[event.target.name] = event.target.value
    setState({ ...state, car: carCopy, formModified: true })
  }

  function handleCheckboxChange(event) {
    const carCopy = { ...car }
    carCopy[event.target.name] = event.target.checked
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    showWaiting(true)
    try {
      Car.parse(car)
      if (params.id) await myfetch.put(`/cars/${params.id}`, car)
      else await myfetch.post('/cars', car)
      notify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    }
    catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        const messages = {}
        for (let i of error.issues) messages[i.path[0]] = i.message
        setState({ ...state, inputErrors: messages })
        notify('Há campos com valores inválidos no formulário', 'error')
      }
      else notify(error.message, 'error')
    }
    finally {
      showWaiting(false)
    }
  }

  React.useEffect(() => {
    if (params.id) loadData()
  }, [])

  async function loadData() {
    showWaiting(true)
    try {
      const result = await myfetch.get(`/cars/${params.id}`)
      result.selling_date = parseISO(result.selling_date)
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
    ) return
    navigate('..', { relative: 'path', replace: true })
  }

  return (
    <>
      <ConfirmDialog />
      <Notification />
      <Waiting />

      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar veículo #${params.id}` : 'Cadastrar novo veículo'}
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
            select
            value={car.color}
            onChange={handleFieldChange}
            helperText={inputErrors?.color}
            error={inputErrors?.color}
          >
            {colors.map(color => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="year_manufacture"
            label="Ano de Fabricação"
            variant="filled"
            required
            fullWidth
            select
            value={car.year_manufacture}
            onChange={handleFieldChange}
            helperText={inputErrors?.year_manufacture}
            error={inputErrors?.year_manufacture}
          >
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          <InputMask
            mask="AAA-9$99"
            maskChar=" "
            formatChars={platesMaskFormatChars}
            value={car.plates}
            onChange={handleFieldChange}
          >
            {() => <TextField
              name="plates"
              label="Placa"
              variant="filled"
              required
              fullWidth
              helperText={inputErrors?.plates}
              error={inputErrors?.plates}
            />}
          </InputMask>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Venda"
              value={car.selling_date}
              onChange={value => handleFieldChange({ target: { name: 'selling_date', value } })}
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
            name="selling_price"
            label="Preço de Venda"
            variant="filled"
            required
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange}
            helperText={inputErrors?.selling_price}
            error={inputErrors?.selling_price}
            inputProps={{ inputMode: 'numeric' }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={car.imported}
                onChange={handleCheckboxChange}
                name="imported"
              />
            }
            label="Importado"
          />

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

        </form>
      </Box>
    </>
  )
}