import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  DatePicker,
  Select,
} from "antd";
import 'moment/locale/es-mx';
import locale from 'antd/es/date-picker/locale/es_ES';
import moment from 'moment';
import "antd/dist/antd.css";

//import { EditOutlined } from "@ant-design/icons";
//import { Link } from "react-router-dom";
import "./eventList.css";
const axios = require("axios");
const { Item } = Form;
const { TextArea } = Input;
//const { Option } = Select;

const baseUrl = "https://back-calistenia.herokuapp.com/api/evento";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const dateFormat = 'YYYY/MM/DD';

export default function EventList() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState({
    idevento: "",
    nombre: "",
    fecha: "",
    descripcion: ""
  });

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const handleChange = ({target}) => {

    setEvents(events => (
      { ...events, [target.name] : target.value }
    ) );
   
  };

  const handleSelectChange = (date) => {
    const fecha = date.format(dateFormat)
    setEvents(events => (
      { ...events, fecha : fecha }
    ));
    
    
  };

  const seleccionarEvents = (events, caso) => {
    setEvents(events);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {

    
    await axios
      .post(baseUrl, events)
      .then((response) => {

        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + "/" + events.idevento, events)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idevento === events.idevento) {
            elemento.nombre = events.nombre;
            elemento.fecha = events.fecha;
            elemento.descripcion = events.descripcion;
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
      .delete(baseUrl + "/" + events.idevento)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idevento !== events.idevento)
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
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },

    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 280,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarEvents(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarEvents(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="eventList">
      <br />
      <h1>Eventos</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nuevo Evento
      </Button>
      <br />
      <br />
      <Table
        locale={{ emptyText: "Cargando..." }}
        columns={columns}
        dataSource={data}
      />

      <Modal
        visible={modalInsertar}
        title="Insertar Evento"
        destroyOnClose={true}
        onCancel={abrirCerrarModalInsertar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
          <Button type="primary" onClick={peticionPost}>
            Insertar
          </Button>,
        ]}
      >
        <Form {...layout}>
          <Form.Item label="Nombre">
            <Input name="nombre" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Fecha">
          <DatePicker
              name="fecha"
              locale={locale}
              style={{ width: 315 }}
              format={dateFormat}
              defaultValue={moment('2021/12/17', dateFormat)}
              onChange={handleSelectChange}
            />
          </Form.Item>

          <Form.Item label="Descripcion">
            <TextArea rows={4} name="descripcion" onChange={handleChange} />
          </Form.Item>

        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Evento"
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
              value={events && events.nombre}
            />
          </Item>
          <Item label="Fecha">
            <DatePicker
              name="fecha"
              locale={locale}
              format={dateFormat}
              defaultValue={moment(events && events.fecha, dateFormat)}
              onChange={handleSelectChange}
            />
          </Item>

          <Item label="Descripcion">
            <TextArea
              rows={4}
              name="descripcion"
              onChange={handleChange}
              value={events && events.descripcion}
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
        Estás seguro que deseas eliminar la dificultad{" "}
        <b>{events && events.nombre}</b>?
      </Modal>
    </div>
  );
}
