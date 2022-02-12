import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './AuthList/AuthList'
import TodoForm from './TodoForm/TodoForm';

function AppRouter(props) {
    return (
      <Switch>
        <Route path="/auth" exact render={()=>(
        props.user ? (<Redirect to="/todos"/>) : (<Auth user={props.user}/>)
        )} /> 
        <Route path="/todos" exact render={()=>(
          props.user ? (<TodoForm user={props.user}/>) : (<Redirect to="/auth"/>)
          )} />
      </Switch>
    )
}

export default AppRouter
