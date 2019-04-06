import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, NavLink } from 'react-router-dom';
import UsersPage from './routes/UsersPage';
import NewUserPage from './routes/NewUserPage';
import UserDetailsPage from './routes/UserDetails';

class App extends Component{
	static propTypes = {

	}

	render(){
		return(
			<div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <Fragment>
                  <li className="nav-item">
                    <NavLink to={'/users'} activeClassName="active" className="nav-link">
                      Users
                    </NavLink>
                  </li>
									<li className="nav-item">
										<NavLink to={'/create'} activeClassName="active" className="nav-link">
											Create User
										</NavLink>
									</li>
              </Fragment>
            </ul>
        </nav>
				<Switch>
					<Route path="/users" component={UsersPage} />
					<Route path="/create" component={NewUserPage} />
					<Route path="/user/:id" component={UserDetailsPage} />
					<Redirect to="/users" />
				</Switch>
			</div>
		);
	}
}

export default App;
