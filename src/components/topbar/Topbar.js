import React, {useState} from "react";
import "./topbar.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
//import { Link } from "react-router-dom";

const Topbar = () => {

  let history = useHistory();

  const salir = () => {
    history.push('/');
    window.location.reload(true);
  }
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Calistenia Admin</span>
        </div>

        <div className="btnSalir">
          <Button onClick={salir} type="default" shape="round">
            <LogoutOutlined />
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;