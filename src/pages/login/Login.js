import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Button } from "antd";
import axios from 'axios'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import './login.css'

const Login = () => {

    const {push} = useHistory()

    const [entrar, setEntrar] = useState({
        correo: "", 
        password: "" 
    })

    const inputChange = ({ target }) => {
        const { name, value } = target
        setEntrar({
            ...entrar,
            [name]: value
        })
    }
 

    const login = () => {
        
        axios.post("https://back-calistenia.herokuapp.com/api/login", entrar).then((response) => {
       
      
    console.log(response)
       if(response.status == 200){
            push('/dashboard/home')
  
        }
        
        }).catch(({ response }) => {
            Swal.fire(
                'Error',
                'Ingresar correo y contraseña validos',
                'error'
              )
            console.log(response.data)
        })
        
    }

    return ( 
        <div className="login">
            
            <form className="loginForm">
            <h2>Calistenia APP</h2>
                <input 
                    type="text" 
                    name="correo"
                    placeholder="email" 
                    className="loginInput"
                    onChange={inputChange}    
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="password" 
                    className="loginInput" 
                    onChange={inputChange} 
                />
                
                <Button  onClick={login} className="loginButton" >Ingresar</Button>
                {/*to={"/dashboard/home"} */}
            </form>
        </div>

     );
}
 
export default Login;