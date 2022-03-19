import React from "react";
import {IconV, Leyenda, Label, GrupoInput, Input } from './../elementos/formulario';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const Inputs = ({funcion, estado, cambiarestado, label, placeholder, type, name, leyenda, expresionRegular}) => {

    const onChange= (e)=>{
        cambiarestado({...estado, campo: e.target.value});
    }
    const validacion = ()=>{
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarestado({...estado, valido:'true'});
            }else{
                cambiarestado({...estado, valido:'false'});
            }
        }
        if(funcion){

            funcion();
        }
    }
    return (
        <div>
            <Label htmlFor={name} valido={estado.valido}>{label}</Label>
            <GrupoInput>
                <Input type={type} 
                placeholder={placeholder} id={name} value={estado.campo}
                onChange={onChange} onKeyUp={validacion} 
                onBlur={validacion} valido={estado.valido}
                ></Input>
                <IconV icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
                valido={estado.valido}
                />
            </GrupoInput>
            <Leyenda valido={estado.valido}>{leyenda}</Leyenda>
        </div>
    );
}
export default Inputs;