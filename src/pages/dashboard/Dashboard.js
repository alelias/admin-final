import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import UserList from '../../pages/userList/UserList';
import DificultList from '../../pages/dificultList/DificultList';
import ParkList from '../../pages/parkList/ParkList';
import RoutineList from '../../pages/routineList/RoutineList';
import NewList from '../../pages/newList/NewList';
import ProfileList from '../../pages/profileList/ProfileList';
import EventList from '../../pages/eventList/EventList';
import ExerciceList from '../../pages/exerciceList/ExerciceList';


function Dashboard() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          
          <Route exact path='/dashboard/home'>
            <Home />
          </Route>
          <Route path='/dashboard/users'>
            <UserList />
          </Route>
          <Route path='/dashboard/dificults'>
            <DificultList />
          </Route>
          <Route path='/dashboard/exercices'>
            <ExerciceList />
          </Route>
          <Route path='/dashboard/parks'>
            <ParkList />
          </Route>
          <Route path='/dashboard/routines'>
            <RoutineList />
          </Route>
          <Route path='/dashboard/news'>
            <NewList />
          </Route>
          <Route path='/dashboard/events'>
            <EventList />
          </Route>
          <Route path='/dashboard/profiles'>
            <ProfileList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
