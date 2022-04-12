import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./dificultList.css";
const axios = require("axios");
const { Item } = Form;

const baseUrl = "https://back-calistenia.herokuapp.com/api/dificultad";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function DificultList() {
  const [data, setData] = useState([]);
  const [dificults, setDificults] = useState({
    iddificultad: "",
    nombre: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDificults({ ...dificults, [name]: value });
    console.log(dificults);
  };

  const seleccionarDificults = (dificults, caso) => {
    setDificults(dificults);
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
    //delete artista.id;
    await axios
      .post(baseUrl, dificults)
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
      .put(baseUrl + "/" + dificults.iddificultad, dificults)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.id === dificults.iddificultad) {
            elemento.nombre = dificults.nombre;
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
      .delete(baseUrl + "/" + dificults.iddificultad)
      .then((response) => {
        setData(
          data.filter(
            (elemento) => elemento.iddificultad !== dificults.iddificultad
          )
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
      title: "Acciones",
      key: "acciones",
      width: 280,
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarDificults(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarDificults(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="dificultList">
      <br />
      <h1>Dificultades</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nueva Dificultad
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
        title="Insertar Dificultad"
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
          <Item label="Dificultad">
            <Input name="nombre" onChange={handleChange} />
          </Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Dificultad"
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
              value={dificults && dificults.nombre}
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
        <b>{dificults && dificults.nombre}</b>?
      </Modal>
    </div>
  );
}
