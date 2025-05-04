import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {},formValidations={}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation,setFormValidation]=useState({});
    
     const isFormValid=useMemo(()=>{
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue]!==null) return false;
          }
      return  true;
     },[formValidation]);


     //cada vez que cambia formState entrara
    useEffect(()=>{
      
       createValidators();

    },[formState]);

    useEffect(()=>{
        setFormState(initialForm);
    },[initialForm]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators=()=>{
         const formCheckedValues={};
         for (const formFlield of Object.keys(formValidations)) {
            console.log(formFlield);
            //1-funcion
            //2-mensaje de validación
            const[fn,errorMessage='Este campo es requerido']=formValidations[formFlield];
            formCheckedValues[`${formFlield}Valid`]=fn(formState[formFlield]) ? null:errorMessage;
         }
         setFormValidation(formCheckedValues);
         console.log(formCheckedValues);
         
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}