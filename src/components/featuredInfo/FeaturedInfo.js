import React, { useState, useEffect } from "react";
import axios from "axios";
import "./featuredInfo.css"
//import {ArrowDownward} from "@material-ui/icons"
const fotoRutina = '../../img/rutina.jpeg'
const fotoMapa = '../../img/mapa2.png'
const imgRut = '../../img/rutina3.jpg'

const urlRutina = "https://back-calistenia.herokuapp.com/api/rutina/contador";
const urlEjercicio = "https://back-calistenia.herokuapp.com/api/ejercicio/contador";
const urlParque = "https://back-calistenia.herokuapp.com/api/parque/contador";

export default function FeaturedInfo() {

    const [rutina, setRutina] = useState([]);
    const [ejercicio, setEjercicio] = useState([]);
    const [parque, setParque] = useState([]);

    useEffect(() => {
        const contadorRutina = async () => {
            await axios
            .get(urlRutina)
            .then((response) => {
                setRutina(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        };
        contadorRutina()
      }, []);

      useEffect(() => {
        const contadorEjercicio = async () => {
            await axios
            .get(urlEjercicio)
            .then((response) => {
                setEjercicio(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        };
        contadorEjercicio()
      }, []);

      useEffect(() => {
        const contadorParque = async () => {
            await axios
            .get(urlParque)
            .then((response) => {
                setParque(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        };
        contadorParque()
      }, []);


    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Rutinas</span>
                <div className="featuredMoneyContainer">
                 
                    <img src={fotoRutina} className="imgRut"  alt="rutina" />
                    <span className="featuredMoney">{rutina.count}</span>
                </div>
                
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Ejercicios</span>
                <div className="featuredMoneyContainer">
                 
                    <img src={imgRut} className="imgRut"  alt="rutina" />
                    <span className="featuredMoney">{ejercicio.count}</span>
                </div>
                
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Parques</span>
                <div className="featuredMoneyContainer">
                 
                    <img src={fotoMapa} className="fotoMapa"  alt="rutina" />
                    <span className="featuredMoney">{parque.count}</span>
                </div>
                
            </div>
          
           
        </div>
    )
}
