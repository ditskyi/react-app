import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './AuthList/AuthList'
import TodoForm from './TodoForm/TodoForm';


class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/auth" exact render={()=>(
        this.props.user ? (<Redirect to="/todos"/>) : (<Auth user={this.props.user}/>)
        )} /> 
        <Route path="/todos" exact render={()=>(
          this.props.user ? (<TodoForm user={this.props.user}/>) : (<Redirect to="/auth"/>)
          )} />
      </Switch>
    )
  }
}
export default AppRouter
