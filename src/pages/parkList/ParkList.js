import React, { useState, useEffect } from "react";

import { Table, Button, Modal, Input, Form, Image } from "antd";
import "antd/dist/antd.css";

import {useMapbox} from '../../hooks/useMapbox'
import "./parkList.css";
const { TextArea } = Input;
const axios = require("axios");
const { Item } = Form;

const baseUrl = "https://back-calistenia.herokuapp.com/api/parque";
const imgPunto = '../../img/pngegg.png'

const layout = {
  labelCol: {
    span: 8, 
  },
  wrapperCol: {
    span: 16,
  },
};

const puntoInicial = {
  lng: -70.77501632397149,
  lat: -33.53199106757794,
  zoom: 15
}


export default function ParkList() {

  const {setRef,coords} = useMapbox(puntoInicial);

  const [data, setData] = useState([]);
  const [parks, setParks] = useState({
    idparque: "",
    nombre: "",
    latitud: coords.lat,
    longitud: coords.lng,
    descripcion: "",
  });


  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);


  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  
  const handleChange = ({target}) => {
    
    setParks(parks => (
      { ...parks, [target.name] : target.value }
    ) );
  };
  
  useEffect(() => {
    setParks((parks) => ({
      ...parks, latitud: coords.lat, longitud: coords.lng
    }))
  },[coords])

  const seleccionarParks = (parks, caso) => {
    setParks(parks);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

 

  const peticionGet = async () => {
    
    await axios.get(baseUrl)
      .then((response) => {
      
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postPark = async (e) => {
    
  
    await axios
      .post(baseUrl, parks)
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + "/" + parks.idparque, parks)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idparque === parks.idparque) {
            elemento.nombre = parks.nombre;
            elemento.latitud = parks.latitud;
            elemento.longitud = parks.longitud;
            elemento.descripcion = parks.descripcion;
          }
        });
        setData(dataAuxiliar);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + parks.idparque)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idparque !== parks.idparque)
        );
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Latitud",
      dataIndex: "latitud",
      key: "latitud",
    },
    {
      title: "Longitud",
      dataIndex: "longitud",
      key: "longitud",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },

    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarParks(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarParks(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <>

    <div className="parkList">
    
      <br />
      <h1>Parques</h1>
    <div className="contenedor-mapa ">
           
        <div
        ref={setRef}
            className='mapContainer'
        >
 
        </div>
        
        <div className='form'>
          <Form style={layout}>
              <Item label="Nombre">
                <Input name="nombre" onChange={handleChange} />
              </Item>
              <Item label="Latitud">
                <Input name="latitud" onChange={handleChange} value={coords.lat} readOnly/>
              </Item>
              <Item label="Longitud">
                <Input name="longitud"  onChange={handleChange} value={coords.lng} readOnly/>
              </Item>

              <Item label="Descripcion">
                <TextArea name="descripcion" rows={4} onChange={handleChange} />
              </Item>
              <Button type="primary" onClick={postPark}>
              Insertar
            </Button> 
          </Form>
            
        </div>
            
 </div>
      <br />
 
      <br />
      <br />
      <Table
        locale={{ emptyText: "Cargando..." }}
        columns={columns}
        dataSource={data}
      />

  
      <Modal
        visible={modalEditar}
        title="Editar Parque"
        onCancel={abrirCerrarModalEditar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
          <Button type="primary" onClick={peticionPut}>
            Editar
          </Button>,
        ]}
      >
        <Form {...layout}>
          <Item label="Nombre">
            <Input
              name="nombre"
              onChange={handleChange}
              value={parks && parks.nombre}
            />
          </Item>
          <Item label="Latitud">
            <Input
              name="latitud"
              onChange={handleChange}
              value={parks && parks.latitud}
            />
          </Item>
          <Item label="Longitud">
            <Input
              name="longitud"
              onChange={handleChange}
              value={parks && parks.longitud}
            />
          </Item>

          <Item label="Descripcion">
            <TextArea
              name="descripcion"
              rows={4}
              onChange={handleChange}
              value={parks && parks.descripcion}
            />
          </Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEliminar}
        onCancel={abrirCerrarModalEliminar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalEliminar}>No</Button>,
          <Button type="primary" danger onClick={peticionDelete}>
            Sí
          </Button>,
        ]}
      >
        Estás seguro que deseas eliminar el parque{" "}
        <b>{parks && parks.nombre}</b>?
      </Modal>
    </div>
    </>
  );
}
