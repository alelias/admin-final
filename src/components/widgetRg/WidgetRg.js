import React, { useState, useEffect } from "react";
import axios from "axios";
import "./widgetRg.css"

const urlNoticia = "https://back-calistenia.herokuapp.com/api/noticia/ultimo";

export default function WidgetRg() {
    //programar visualizar ultimos eventos, fecha
    //ultimas noticias
    //total de ejercicios
    //total rutinas
    //total parques

    const [noticia, setNoticia] = useState([]);

    useEffect(() => {
        const ultimaNoticia = async () => {
            await axios
            .get(urlNoticia)
            .then((response) => {
                setNoticia(response.data[0]);
            })
            .catch((error) => {
            console.log(error);
            });
        };
        ultimaNoticia()
      }, []);

    return (
        <div className="widgetRg">
            <h3 className="widgetRgTitle">Ultima Noticias</h3>
            <table className="widgetRgTable">
                <tr className="widgetRgTr">
                    <th className="widgetRgTh">Nombre</th>
                    <th className="widgetRgTh">Descripción</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetRgNom">{noticia.titulo}</td>
                    <td className="widgetRgLug">{noticia.descripcion}</td>
                </tr>
            </table>
        </div>
    )
}
