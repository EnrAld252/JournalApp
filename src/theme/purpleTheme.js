import  { createTheme } from '@mui/material'
import { red } from '@mui/material/colors';
  //lo que hace es extender el tema es decirsobrescribir lo que queremos 
export const purpleTheme= createTheme({
   
    palette:{
        primary:{
            main:'#262254'
        },
        secundary:{
            main:'#543884'
        },
        error:{
            main:red.A400
        }
    }
});