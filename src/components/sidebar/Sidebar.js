import React from "react";
import {
  LineStyle,
  Timeline,
  FitnessCenter,
  MenuBook,
  Room,
  Contacts,
  Streetview,
  LocalLibrary,
  Event,
  Face,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              <Link className="link" to={"/dashboard/home"}>
                <span>Inicio</span>
              </Link>
              {/* style={{ textDecoration: 'none', color: 'white' }} */}
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <Room className="sidebarIcon" />
              <Link className="link" to={"/dashboard/parks"}>
                <span>Parques</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <FitnessCenter className="sidebarIcon" />
              <Link className="link" to={"/dashboard/exercices"}>
                <span>Ejercicios</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MenuBook className="sidebarIcon" />
              <Link className="link" to={"/dashboard/routines"}>
                <span>Rutinas</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LocalLibrary className="sidebarIcon" />
              <Link className="link" to={"/dashboard/news"}>
                <span>Noticas</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <Event className="sidebarIcon" />
              <Link className="link" to={"/dashboard/events"}>
                <span>Eventos</span>
              </Link>
            </li>
          </ul>
        </div>
        

        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Face className="sidebarIcon" />
              <Link className="link" to={"/dashboard/users"}>
                Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
