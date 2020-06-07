import React, {Component} from 'react';
import { MainRoutes, AppRoutes } from './routes/routes';
import { withRouter } from 'react-router-dom';
import './App.scss'

class App extends Component {
  render() {
    return(
      true ? <MainRoutes /> : <AppRoutes />
    )
  }
}

const RouteWithAuth = withRouter(App);

export default RouteWithAuth;