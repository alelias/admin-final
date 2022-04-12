import React,{useState, useEffect} from 'react'
import {Table, Button, Modal, Input, Form } from "antd"
import "antd/dist/antd.css";
import {
    EditOutlined
  } from '@ant-design/icons';
import { Link} from 'react-router-dom'
import './profileList.css'
const axios = require('axios');
const { Item } = Form;

const baseUrl="https://back-calistenia.herokuapp.com/api/perfil";

const layout={
    labelCol:{
      span: 8
    },
    wrapperCol:{
      span: 16
    }
  };

export default function ProfileList() {

    const [data, setData]=useState([]);
    const [profiles, setProfiles] = useState({
        idperfil: '',
        nombre: ''
    })

    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
     
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setProfiles({...profiles,
        [name]: value});
        console.log(profiles);
      }
    
      const seleccionarProfiles=(profiles, caso)=>{
        setProfiles(profiles);
        (caso==="Editar")?abrirCerrarModalEditar():abrirCerrarModalEliminar()
      }

      


const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
      }
    
    
      const peticionPost=async()=>{
        //delete artista.id;
        await axios.post(baseUrl, profiles)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
          }
    
          const peticionPut=async()=>{
            await axios.put(baseUrl+"/"+profiles.idperfil, profiles)
            .then(response=>{
              var dataAuxiliar=data;
              dataAuxiliar.map(elemento=>{
                if(elemento.idperfil===profiles.idperfil){
                  elemento.nombre=profiles.nombre;

                }
              });
              setData(dataAuxiliar);
              abrirCerrarModalEditar();
            }).catch(error=>{
              console.log(error);
            })
              }
    
              
          const peticionDelete=async()=>{
            await axios.delete(baseUrl+"/"+profiles.idperfil)
            .then(response=>{
              setData(data.filter(elemento=>elemento.idperfil!==profiles.idperfil));
              abrirCerrarModalEliminar();
            }).catch(error=>{
              console.log(error);
            })
              }
    
      useEffect(()=>{
        peticionGet();
      },[])
const columns = [
    
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
   
    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button type="primary" onClick={()=>seleccionarProfiles(fila, "Editar")}>Editar</Button> {"   "}
          <Button type="primary" danger onClick={()=>seleccionarProfiles(fila, "Eliminar")}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];
    return (
        <div className='profileList'>
           <br />
           <h1>Perfiles</h1>
      <br />
      <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar} >Insertar Nuevo Perfil</Button>
      <br />
      <br />
      <Table locale={{ emptyText: 'Cargando...' }} columns={columns} dataSource={data}/>


      <Modal
      visible={modalInsertar}
      title="Insertar Perfil"
      destroyOnClose={true}
      onCancel={abrirCerrarModalInsertar}
      centered
      footer={[
        <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
        <Button type="primary" onClick={peticionPost}>Insertar</Button>,
      ]}
      >
<Form {...layout}>
  <Item label="Nombre">
    <Input name="nombre" onChange={handleChange}/>
  </Item>

</Form>
      </Modal>


      
      <Modal
      visible={modalEditar}
      title="Editar Perfil"
      onCancel={abrirCerrarModalEditar}
      centered
      footer={[
        <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
        <Button type="primary" onClick={peticionPut}>Editar</Button>,
      ]}
      >
<Form {...layout}>
  <Item label="Nombre">
    <Input name="nombre" onChange={handleChange} value={profiles && profiles.nombre}/>
  </Item>

  
</Form>
      </Modal>


          
      <Modal
      visible={modalEliminar}
      onCancel={abrirCerrarModalEliminar}
      centered
      footer={[
        <Button onClick={abrirCerrarModalEliminar}>No</Button>,
        <Button type="primary" danger onClick={peticionDelete}>Sí</Button>,
      ]}
      >
Estás seguro que deseas eliminar de el perfil <b>{profiles && profiles.nombre}</b>?
      </Modal>
            
        </div>
    )
}
