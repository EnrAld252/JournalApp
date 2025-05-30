import { Grid, Typography } from '@mui/material'
import { StarOutline } from '@mui/icons-material'

export const NothingSelectedView = () => {
    return (
        <div className='gridCardView'>
            <Grid

                container
                className='animate__animated animate__fadeIn animate_faster'
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ height:'100vh', backgroundColor: 'primary.main', borderRadius: 3 }}
            >
                <Grid item xs={12}>
                    <StarOutline sx={{ fontSize: 100, color: 'white' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography color='white' variant='h5'>Selecciona o crea una entrada</Typography>
                </Grid>


            </Grid>
        </div>

    )
}
