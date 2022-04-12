import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./exerciceList.css";
import axios from 'axios'
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const baseUrl = "https://back-calistenia.herokuapp.com/api/ejercicio";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function ExerciceList() {
  const [data, setData] = useState([]);
  const [exercices, setExercices] = useState({
    idejercicio: "",
    nombre: "",
    descripcion: "",
    link: "",
    iddificultad: "",
    dificultade: {
      iddificultad: "",
      nombre: "",
    },
  });
  const [dataDif, setDataDif] = useState([]);


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

    setExercices(exercices => (
      { ...exercices, [target.name] : target.value }
    ) );
   
  };

  const handleSelectChange = (selected) => {

    setExercices(exercices => (
      { ...exercices, iddificultad : selected }
    ));
   
  };

  const seleccionarExercices = (exercices, caso) => {
    setExercices(exercices);
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

  useEffect(() => {
    const peticionGetDif = async () => {
      const baseUrlDif = "https://back-calistenia.herokuapp.com/api/dificultad";

      const dificults = await axios.get(baseUrlDif);
      setDataDif(dificults.data)
      console.log(dificults);
    };
    peticionGetDif()
  }, []);
 

  const peticionPost = async () => {
    //delete artista.id;
    await axios.post(baseUrl, exercices)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    await axios.put(baseUrl + "/" + exercices.idejercicio, exercices)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idejercicio === exercices.idejercicio) {
            elemento.nombre = exercices.nombre;
            elemento.descripcion = exercices.descripcion;
            elemento.link = exercices.link;
            elemento.iddificultad = exercices.iddificultad;
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
    await axios.delete(baseUrl + "/" + exercices.idejercicio)
      .then((response) => {
        setData(
          data.filter(
            (elemento) => elemento.idejercicio !== exercices.idejercicio
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
  }, [data]);



  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 180,
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 280,
    },

    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 150,
    },
    {
      title: "Dificultad",
      dataIndex: ["dificultade", "nombre"],
      key: "iddificultad",
    },

    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarExercices(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarExercices(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="exerciceList">
      <br />
      <h1>Ejercicios</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nuevo Ejercicio
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
        title="Insertar Ejercicio"
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
          <Item label="Descripcion">
            <TextArea rows={4} name="descripcion" onChange={handleChange} />
          </Item>
          <Item label="Link">
            <Input name="link" onChange={handleChange} />
          </Item>

          <Item label="Dificultad">
            <Select
              defaultValue="--Seleccione--"
              style={{ width: 315 }}
              name="iddificultad"
              onChange={handleSelectChange}
            >
              
              {
              dataDif.map((dificultad) =>
              (
                 <Option key={dificultad.iddificultad} value={dificultad.iddificultad}>{dificultad.nombre}</Option>
              ))
              }
            
           
            </Select>
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
              value={exercices && exercices.nombre}
            />
          </Item>
          <Item label="Descripcion">
            <TextArea
              rows={4}
              name="descripcion"
              onChange={handleChange}
              value={exercices && exercices.descripcion}
            />
          </Item>
          <Item label="Link">
            <Input
              name="link"
              onChange={handleChange}
              value={exercices && exercices.link}
            />
          </Item>
          <Item label="Dificultad">
           
            <Select
              defaultValue={exercices && exercices.dificultade.nombre}
              style={{ width: 315 }}
              name="iddificultad"
              onChange={handleSelectChange}
            >
               {
              dataDif.map(dificultad =>
              (
                 <Option key={dificultad.iddificultad} value={dificultad.iddificultad}>{dificultad.nombre}</Option>
              ))
              }
            
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
        Estás seguro que deseas eliminar el ejercicio{" "}
        <b>{exercices && exercices.nombre}</b>?
      </Modal>
    </div>
  );
}
