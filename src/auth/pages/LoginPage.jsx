import { useDispatch, useSelector } from 'react-redux'
import { Link as Routerlink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import React, { useMemo } from 'react'
import { AuthLayout } from '../layout/Authlayout'
import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn, startLoginWitchEmailPassword } from '../../store/auth'

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'cheking', [status]);

  //Intentara autentificarse con email y contraseña
  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(startLoginWitchEmailPassword({ email, password }));
  }
  //Se autentifica con cuenta de google
  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }
  return (

    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate_faster'>
        <Grid container>
          <Grid item size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          display={!!errorMessage ? '' : 'none'}
          sx={{ mt: 1 }}
        >
          <Grid
            item
            xs={12}
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          <Grid item size={{ xs: 6, sm: 6 }} >
            <Button
              disabled={isAuthenticating}
              type='submit'
              variant='contained'
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item size={{ xs: 6, sm: 6 }} >
            <Button
              disabled={isAuthenticating}
              variant='contained'
              fullWidth
              onClick={onGoogleSignIn} >
              <Google />
              <Typography sx={{ ml: 1 }} >Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Link component={Routerlink} color='inherit' to="/auth/register">
            Crear Una Cuenta
          </Link>

        </Grid>

      </form>
    </AuthLayout>

  )
}
