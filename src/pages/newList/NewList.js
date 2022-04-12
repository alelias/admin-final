import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, DatePicker } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./newList.css";
const axios = require("axios");
const { Item } = Form;
const { TextArea } = Input;
const baseUrl = "https://back-calistenia.herokuapp.com/api/noticia";
//const baseUrl = "http://localhost:4500/api/noticia";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function NewList() {
  const [data, setData] = useState([]);
  const [news, setNews] = useState({
    idnoticia: "",
    titulo: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
    console.log(news);
  };

  const seleccionarNews = (news, caso) => {
    setNews(news);
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
      .post(baseUrl, news)
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
      .put(baseUrl + "/" + news.idnoticia, news)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idnoticia === news.idnoticia) {
            elemento.titulo = news.titulo;
            elemento.descripcion = news.descripcion;
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
      .delete(baseUrl + "/" + news.idnoticia)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idnoticia !== news.idnoticia)
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
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 240,
    },

    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarNews(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarNews(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="newList">
      <br />
      <h1>Noticias</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nueva Noticia
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
        title="Insertar Noticia"
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
          <Item label="Titulo">
            <Input name="titulo" onChange={handleChange} />
          </Item>
  
          <Form.Item label="Descripcion">
            <TextArea rows={4} name="descripcion" onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Noticia"
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
          <Item label="Titulo">
            <Input
              name="titulo"
              onChange={handleChange}
              value={news && news.titulo}
            />
          </Item>
          
          <Item label="Descripcion">
            <TextArea
              rows={4}
              name="descripcion"
              onChange={handleChange}
              value={news && news.descripcion}
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
        Estás seguro que deseas eliminar la noticia <b>{news && news.titulo}</b>
        ?
      </Modal>
    </div>
  );
}
