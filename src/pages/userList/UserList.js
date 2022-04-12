import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";
import "antd/dist/antd.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./userList.css";
const axios = require("axios");
const { Item } = Form;
const { Option } = Select;

const baseUrl = "https://back-calistenia.herokuapp.com/api/usuario";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function UserList() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState({
    idusuario: "",
    nombre: "",
    correo: "",
    password: "",
    perfil:""
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
    setUsers({ ...users, [name]: value });
    console.log(users);
  };

  const handleSelectChange = (selected) => {

    setUsers(users => (
      { ...users, perfil : selected }
    ));
   
  };

  const seleccionarUsers = (users, caso) => {
    setUsers(users);
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
      .post(baseUrl, users)
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
      .put(baseUrl + "/" + users.idusuario, users)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idusuario === users.idusuario) {
            elemento.nombre = users.nombre;
            elemento.correo = users.correo;
            elemento.password = users.password;
            elemento.perfil = users.perfil;
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
      .delete(baseUrl + "/" + users.idusuario)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idusuario !== users.idusuario)
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
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "Perfil",
      dataIndex: "perfil",
      key: "perfil",
    },


    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarUsers(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarUsers(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="userList">
      <br />
      <h1>Usuarios</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nuevo Usuario
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
        title="Insertar Usuario"
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
          <Item label="Nombre">
            <Input name="nombre" onChange={handleChange} />
          </Item>
          <Item label="Correo">
            <Input name="correo" onChange={handleChange} />
          </Item>
          <Item label="Password">
            <Input.Password
              name="password"
              placeholder="Ingresar password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleChange}
            />
          </Item>
          <Item label="Perfil">
            <Select
              defaultValue="--Seleccione--"
              style={{ width: 315 }}
              name="perfil"
              onChange={handleSelectChange}
            >
                 <Option key="Admin" value="Admin">Admin</Option>
                 <Option key="App" value="App">App</Option>
        
            </Select>
          </Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Usuario"
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
              value={users && users.nombre}
            />
          </Item>
          <Item label="Correo">
            <Input
              name="correo"
              onChange={handleChange}
              value={users && users.correo}
            />
          </Item>
          <Item label="Password">
            <Input.Password
              name="password"
              placeholder="Ingresar password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleChange}
              value={users && users.password}
            />
          </Item>
          <Item label="Perfil">
            <Select
              value={users && users.perfil}
              style={{ width: 315 }}
              name="perfil"
              onChange={handleSelectChange}
            >
               <Option key="Admin" value="Admin">Admin</Option>
                 <Option key="App" value="App">App</Option>
        
            </Select>
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
        Estás seguro que deseas eliminar el Usuario{" "}
        <b>{users && users.nombre}</b>?
      </Modal>
    </div>
  );
}
