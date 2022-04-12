import React, { useState, useEffect } from "react";
import axios from "axios";
import "./widgetLg.css"

const urlEvento = "https://back-calistenia.herokuapp.com/api/evento/ultimo";

export default function WidgetLg() {
    //programar visualizar ultimos eventos, fecha
    //ultimas noticias
    //total de ejercicios
    //total rutinas
    //total parques
    const [evento, setEvento] = useState([]);

    useEffect(() => {
        const ultimoEvento = async () => {
            await axios
            .get(urlEvento)
            .then((response) => {
                setEvento(response.data[0]);
            })
            .catch((error) => {
            console.log(error);
            });
        };
        ultimoEvento()
      }, []);

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Ultimo Eventos</h3>
            <table className="widgetLgTable">
            <tr className="widgetLgTr">
                    <th className="widgetLgTh">Evento</th>
                    <th className="widgetLgTh">Detalle</th>
                    <th className="widgetLgTh">Fecha</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgTh">{evento.nombre}</td>
                    <td className="widgetLgTh">{evento.descripcion}</td>
                    <td className="widgetLgTh">{evento.fecha}</td>
                </tr>
            </table>
        </div>
    )
}
