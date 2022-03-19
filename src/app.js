import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Formulario, ContBoton, MensajeError, MensajeExito, ContTerminos, Boton, Label,} from './elementos/formulario';
import Inputs from './componentes/inputs';


const App = () => {
    const [user, cambioUsuario] = useState({campo:'', valido:null});
    const [nombre, cambioNombre] = useState({campo:'', valido:null});
    const [password, cambioPassword] = useState({campo:'', valido:null});
    const [Rpassword, cambioRPassword] = useState({campo:'', valido:null});
    const [mail, cambioEmail] = useState({campo:'', valido:null});
    const [telefono, cambioTelefono] = useState({campo:'', valido:null});
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioV, cambiarFormularioV] = useState(null);
    const expresiones = {
        usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{10}$/ // 10 numeros.
    }
    const validarPassword= ()=>{
        if(password.campo.length > 0){
            if (password.campo !== Rpassword.campo) {
                cambioRPassword((prevState)=>{
                    return {...prevState, valido:'false'}
                });
            }else{
                cambioRPassword((prevState)=>{
                    return {...prevState, valido:'true'}
                });
            }
        }
    }
    const OnChanceTerminos=(e)=>{
        cambiarTerminos(e.target.checked);
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if (user.valido === 'true' && nombre.valido === 'true' && 
        password.valido === 'true' && Rpassword.valido === 'true' && 
        mail.valido === 'true' && telefono.valido === 'true' && 
        terminos) {
            cambiarFormularioV(true);
            cambioUsuario({campo:'', valido:null});
            cambioNombre({campo:'', valido:null});
            cambioPassword({campo:'', valido:null});
            cambioRPassword({campo:'', valido:'null'});
            cambioEmail({campo:'', valido:null});
            cambioTelefono({campo:'', valido:null});
        }else{
            cambiarFormularioV(false);
        }
    }
    return (
        <main>
            <Formulario action="" onSubmit={onSubmit}>
                <Inputs 
                    estado={user}
                    cambiarestado={cambioUsuario}
                    label="Usuario"
                    placeholder="Nombre de usuario"
                    type="text"
                    name="user"
                    leyenda="Por favor, introduzca un nombre de usuario."
                    expresionRegular={expresiones.usuario}
                />
                <Inputs 
                estado={nombre}
                cambiarestado={cambioNombre}
                    label="Nombre y Apellido"
                    placeholder="Nombre y Apellido"
                    type="text"
                    name="nombre"
                    leyenda="Por favor introduzca un nombre y apellido valido (solo letras)."
                    expresionRegular={expresiones.nombre}
                />
                <Inputs 
                estado={password}
                cambiarestado={cambioPassword}
                    label="Contraseña"
                    placeholder="Digite la contraseña"
                    type="password"
                    name="password"
                    leyenda="La contraseña debe contener de 4 - 12 elementos."
                    expresionRegular={expresiones.password}
                />
                <Inputs 
                estado={Rpassword}
                cambiarestado={cambioRPassword}
                    label="Repita la Contraseña"
                    placeholder="Escriba nuevamente la Contraseña"
                    type="password"
                    name="Rpassword"
                    leyenda="Las contraseñas deben coincidir."
                    expresionRegular={expresiones.password}
                    funcion={validarPassword}
                />
                <Inputs 
                estado={mail}
                cambiarestado={cambioEmail}
                    label="Correo Electrónico"
                    placeholder="Escriba su direccion de email"
                    type="email"
                    name="mail"
                    leyenda="Por favor introduzca un correo elctrónico valido."
                    expresionRegular={expresiones.correo}
                />
                <Inputs 
                estado={telefono}
                cambiarestado={cambioTelefono}
                    label="Telefono"
                    placeholder="Numero de Telefono"
                    type="phone"
                    name="telefono"
                    leyenda="El número de telefono debe contener 10 digittos, sin codigo del país."
                    expresionRegular={expresiones.telefono}
                />
            
                <ContTerminos>
                    <Label>
                        <input type="checkbox" name="terminos" id="terminos" checked={terminos} onChange={OnChanceTerminos} />
                             Acepto los Términos y Condiciones
                    </Label>
                </ContTerminos>
                {formularioV === false && <MensajeError>
                    <p>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error:</b>Por favor, acepte los términos y condiciones para continuar.
                    </p>
                </MensajeError>}
                <ContBoton>
                    <Boton type="submit">ENVIAR</Boton>
                    {formularioV === true && <MensajeExito>Formulario enviado con exito</MensajeExito>}
                </ContBoton>
            </Formulario>
        </main >
    );
}

export default App;