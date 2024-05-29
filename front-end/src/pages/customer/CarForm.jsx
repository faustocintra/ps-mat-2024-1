// import React from 'react';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputMask from 'react-input-mask';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import { ptBR } from 'date-fns/locale/pt-BR';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import useConfirmDialog from '../../ui/useConfirmDialog';
// import useNotification from '../../ui/useNotification';
// import useWaiting from '../../ui/useWaiting';
// import CarSchema from '../../models/Car';
// import myfetch from '../../lib/myfetch';

// export default function CarForm() {
//   const [state, setState] = React.useState({
//     car: {
//       brand: '',
//       model: '',
//       color: '',
//       year_manufacture: new Date().getFullYear(),
//       imported: false,
//       plates: '',
//       selling_date: null,
//       selling_price: '',
//     },
//     formModified: false,
//     inputErrors: {},
//   });

//   const { car, formModified, inputErrors } = state;

//   const { askForConfirmation, ConfirmDialog } = useConfirmDialog();
//   const { notify, Notification } = useNotification();
//   const { showWaiting, Waiting } = useWaiting();

//   const colors = [
//     {value: 'Azul', label: 'Azul'},
//     {value: 'Branco', label: 'Branco'},
//     {value: 'Cinza', label: 'Cinza'},
//     {value: 'Preto', label: 'Preto'},
//     {value: 'Verde', label: 'Verde'},
//     {value: 'Vermelho', label: 'Vermelho'}
//   ]

//   const handleFieldChange = (event) => {
//     const { name, value, checked, type } = event.target;
//     const newValue = type === 'checkbox' ? checked : value;
//     setState((prevState) => ({
//       ...prevState,
//       car: {
//         ...prevState.car,
//         [name]: newValue,
//       },
//       formModified: true,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     showWaiting(true);
//     try {
//       CarSchema.parse(car);
//        await myfetch.post('/cars', car);
//       notify('Carro salvo com sucesso', 'success');
//     } catch (error) {
//       console.error(error);
//       if (error.errors) {
//         const messages = {};
//         error.errors.forEach((err) => {
//           messages[err.path[0]] = err.message;
//         });
//         setState((prevState) => ({
//           ...prevState,
//           inputErrors: messages,
//         }));
//         notify('Existem campos inválidos no formulário.', 'error');
//       } else {
//         notify(error.message, 'error');
//       }
//     } finally {
//       showWaiting(false);
//     }
//   };

//   return (
//     <>
//       <ConfirmDialog />
//       <Notification />
//       <Waiting />

//       <Typography variant="h1" gutterBottom>
//         Car Form
//       </Typography>

//       <Box className="form-fields">
//         <form onSubmit={handleFormSubmit}>
//           <TextField
//             name="brand"
//             label="Brand"
//             variant="filled"
//             required
//             fullWidth
//             value={car.brand}
//             onChange={handleFieldChange}
//             helperText={inputErrors?.brand}
//             error={inputErrors?.brand}
//           />

//           <TextField
//             name="model"
//             label="Model"
//             variant="filled"
//             required
//             fullWidth
//             value={car.model}
//             onChange={handleFieldChange}
//             helperText={inputErrors?.model}
//             error={inputErrors?.model}
//           />

//           <TextField
//             name="color"
//             label="Cor"
//             variant="filled"
//             required
//             fullWidth
//             value={car.color}
//             onChange={handleFieldChange}
//             select
//             helperText={inputErrors?.color}
//             error={inputErrors?.color}
//           >
//             {/* {colors.map((color) => {
//                 <MenuItem key={color.value} value={color.value}>
//                     {color.label}
//                 </MenuItem>
//             })} */}

//             {
//                 colors.map(c =>{
//                     <MenuItem key={c.value} value={c.value}>
//                         {c.label}
//                     </MenuItem>
//                 })
//             }
//           </TextField>        


//           <TextField
//             name="year_manufacture"
//             label="Year of Manufacture"
//             variant="filled"
//             required
//             select
//             fullWidth
//             value={car.year_manufacture}
//             onChange={handleFieldChange}
//             helperText={inputErrors?.year_manufacture}
//             error={inputErrors?.year_manufacture}
//           >
//             {Array.from({ length: new Date().getFullYear() - 1960 + 1 }, (_, i) => (
//               <MenuItem key={i} value={new Date().getFullYear() - i}>
//                 {new Date().getFullYear() - i}
//               </MenuItem>
//             ))}
//           </TextField>

//           <InputMask
//             mask="AAA-9$99"
//             value={car.plates}
//             onChange={handleFieldChange}
//           >
//             {() => (
//               <TextField
//                 name="plates"
//                 label="Plates"
//                 variant="filled"
//                 required
//                 fullWidth
//                 helperText={inputErrors?.plates}
//                 error={inputErrors?.plates}
//               />
//             )}
//           </InputMask>

//           <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
//             <DatePicker
//               name="selling_date"
//               label="Selling Date"
//               value={car.selling_date}
//               onChange={(value) => handleFieldChange({ target: { name: 'selling_date', value } })}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   variant="filled"
//                   helperText={inputErrors?.selling_date}
//                   error={inputErrors?.selling_date}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           <TextField
//             name="selling_price"
//             label="Selling Price"
//             variant="filled"
//             required
//             fullWidth
//             value={car.selling_price}
//             onChange={handleFieldChange}
//             helperText={inputErrors?.selling_price}
//             error={inputErrors?.selling_price}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={car.imported}
//                 onChange={handleFieldChange}
//                 name="imported"
//               />
//             }
//             label="Imported"
//           />

//           <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
//             <Button
//               variant="contained"
//               color="secondary"
//               type="submit"
//             >
//               Save
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </>
//   );
// }




import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputMask from 'react-input-mask';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import useConfirmDialog from '../../ui/useConfirmDialog';
import useNotification from '../../ui/useNotification';
import useWaiting from '../../ui/useWaiting';
import CarSchema from '../../models/Car';
import myfetch from '../../lib/myfetch';
import { useParams, useNavigate } from 'react-router-dom'
import { ZodError } from 'zod'


export default function CarForm() {

    const formDefaults = {
        brand: '',
        model: '',
        color: '',
        year_manufacture: new Date().getFullYear(),
        imported: false,
        plates: '',
        selling_date: null,
        selling_price: '',
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

    const { askForConfirmation, ConfirmDialog } = useConfirmDialog();
    const { notify, Notification } = useNotification();
    const { showWaiting, Waiting } = useWaiting();

    const colors = [
        { value: 'Azul', label: 'Azul' },
        { value: 'Branco', label: 'Branco' },
        { value: 'Cinza', label: 'Cinza' },
        { value: 'Preto', label: 'Preto' },
        { value: 'Verde', label: 'Verde' },
        { value: 'Vermelho', label: 'Vermelho' }
    ]

    const plateMaskFormatChars = {
        '$': '[0-9A-Z]',  // letra ou digito
        '9': '[0-9]',    // somente dígitos
        'A': '[A-Z]'    // somente letras
    }

    function handleFieldChange(event) {
        const carCopy = { ...car }
        carCopy[event.target.name] = event.target.value
        setState({ ...state, car: carCopy, formModified: true })
    }

    async function handleFormSubmit(event) {
        event.preventDefault()      // Evita que a página seja recarregada
        showWaiting(true)       // Exibe a tela de espera
        try {
            
            CarSchema.parse(car)

            
            if (params.id) await myfetch.put(`/cars/${params.id}`, car)
            
            else await myfetch.post('/cars', customer)

            notify('Carro salvo com sucesso.', 'success', 4000, () => {
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
            // Desliga a tela de espera, seja em caso de sucesso, seja em caso de erro
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
                            colors.map(c =>
                                <MenuItem key={c.value} value={c.value}>
                                    {c.label}
                                </MenuItem>
                            )
                        }
                    </TextField>


                    <TextField
                        name="year_manufacture"
                        label="Ano de Fabricação"
                        variant="filled"
                        required
                        select
                        fullWidth
                        value={car.year_manufacture}
                        onChange={handleFieldChange}
                        helperText={inputErrors?.year_manufacture}
                        error={inputErrors?.year_manufacture}
                    >
                        {Array.from({ length: new Date().getFullYear() - 1960 + 1 }, (_, i) => (
                            <MenuItem key={i} value={new Date().getFullYear() - i}>
                                {new Date().getFullYear() - i}
                            </MenuItem>
                        ))}
                    </TextField>


                    <InputMask
                        mask="AAA-9$99"
                        formatChars={plateMaskFormatChars}
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
                        />
                        }
                    </InputMask>

                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                        <DatePicker
                            name="selling_date"
                            label="Data de Venda"
                            value={car.selling_date}
                            onChange={(value) => handleFieldChange({ target: { name: 'selling_date', value } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    variant="filled"
                                    helperText={inputErrors?.selling_date}
                                    error={inputErrors?.selling_date}
                                />
                            )}
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
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={car.imported}
                                onChange={handleFieldChange}
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
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
}