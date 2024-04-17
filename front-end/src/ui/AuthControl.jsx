import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AuthUserContext from '../contexts/AuthUserContext'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Divider, Modal, Popover } from '@mui/material'

export default function AuthControl() {
  const { authUser, setAuthUser } = React.useContext(AuthUserContext)


  if (authUser) {
    const navigate = useNavigate();
    //estilização do modal de logout
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 24,
      p: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    //abre o popover
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };


    //Fecha o popover
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME);
      setAuthUser(null)
      navigate("/login")
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
      <>
        <Button id={id} onClick={handleClick} sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <AccountCircleIcon color="secondary" fontSize="large" />
            <Typography variant="caption" color='secondary' fontSize={12}>
              {authUser.fullname}
            </Typography>
          </Box>
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              Tem certeza que deseja sair?
            </Typography>
            <Box sx={{ m: 3 }}>
              <Button onClick={handleLogout}>SIM</Button>
              <Button onClick={handleModalClose}>NÃO</Button>
            </Box>
          </Box>
        </Modal>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0.5 }}>
            <Typography variant="caption" color='secondary' fontSize={15}>
              {authUser.fullname}
            </Typography>
            <Divider sx={{ backgroundColor: 'action.disabledBackground', mb: 0.5 }} fullWidth flexItem />
            <Button color="secondary" sx={{ width: '8rem' }} fontSize={15}>Perfil</Button>
            <Button color="secondary" sx={{ width: '8rem' }} fontSize={15} onClick={handleModalOpen}>Sair</Button>
          </Box>
        </Popover>
      </>
    )
  }
  else {
    return (
      <Link to="/login">
        <Button color="secondary">Entrar</Button>
      </Link>
    )
  }

}