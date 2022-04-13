/* eslint import/no-webpack-loader-syntax: off */

import {useRef,useState, useEffect, useCallback}  from 'react'
import mapboxgl from '!mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
const axios = require("axios");

mapboxgl.accessToken = 'pk.eyJ1Ijoid2FsZXRhIiwiYSI6ImNreGY5ZWtreTFvbnUydXE5aTF5eno4cGUifQ.tIMnTnqPoymEqgtchY33ew';
const baseUrl = "https://back-calistenia.herokuapp.com/api/parque";

//const imgPunto = '../../img/pngegg.png'

export const useMapbox = (puntoInicial) => {
    
    const mapaDiv = useRef()
    const setRef = useCallback((node) => {
            mapaDiv.current = node;
    },[])
  
    //referencia a los marcadores
    const marcadores = useRef({});

    const [data, setData] = useState([]);

    const mapa = useRef()
    const [coords, setCoords] = useState(puntoInicial)

      useEffect(() => {
        const peticionGet = async () => {
    
            await axios.get(baseUrl)
              .then((response) => {
              
                setData(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          };
        peticionGet();
      }, [data]);
      


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });
        map.addControl(new mapboxgl.NavigationControl());
        
        map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            }) 
        );

        data.forEach((park) => {
            const marker = new mapboxgl.Marker()
        .setLngLat([parseFloat(park.longitud),parseFloat(park.latitud)])
        .addTo(map);
        })
        

        mapa.current = map;
    },[])

    //cuando se mueve el mapa
    useEffect(() => {
        mapa.current?.on('move', () => {
            const {lng, lat} = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(6),
                lat: lat.toFixed(6),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })
    },[])

    //agregar marcadores
    /*
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador);
       
    }, [agregarMarcador])
*/
    return{
        coords,
        setRef,
        marcadores,
    }
}
