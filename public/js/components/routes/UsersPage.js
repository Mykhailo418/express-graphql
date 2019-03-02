import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {queryListUsers} from '../../queries/users';
import {graphql} from 'react-apollo';

class CustomComponent extends Component{
    static propTypes = {

    }

    render(){
      const {loading, users} = this.props.data;
      console.log('props',loading, users);
      let data;
      if(loading) data = <p>...loading</p>;
      else if(!loading && (!users || !users.length) ) data = <p>There are no users</p>;
      else data = this.getUsersList(users);
      return (
        <Fragment>
          <h1>Users</h1>
          {data}
        </Fragment>
      );
    }

    getUsersList = (users) => {
        const data = users.map((user) =>
          <li key={user._id}>
            <a href={`#${user.id}`}>
              {user.firstName}
            </a>
          </li>
        );
        return <ul>{data}</ul>;
    }
}

export default graphql(queryListUsers)(CustomComponent);
