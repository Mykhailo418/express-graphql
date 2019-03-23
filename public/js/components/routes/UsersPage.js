import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {queryListUsers,deleteUser} from '../../queries/users';
import {graphql} from 'react-apollo';

const deleteBtnStyle = {
  display: 'inline-block',
  marginLeft: '10px',
  color: 'red',
  cursor: 'pointer'
}

class UsersPageComponent extends Component{
    static propTypes = {

    }

    render(){
      const data = this.outputData(this.props.data);
      return (
        <Fragment>
          <h1>Users</h1>
          {data}
        </Fragment>
      );
    }

    outputData = ({loading, users}) => {
      console.log('props',loading, users);
      if(loading) return <p>...loading</p>;
      else if(!loading && (!users || !users.length) ) return <p>There are no users</p>;
      return this.getUsersList(users);
    }

    getUsersList = (users) => {
        const data = users.map((user) =>
          <li key={user._id}>
            <a href={`#${user.id}`}>
              {user.firstName}
            </a>
            <span style={deleteBtnStyle} onClick={this.deleteUser(user._id, user.firstName)}>X</span>
          </li>
        );
        return <ul>{data}</ul>;
    }

    deleteUser = (id, firstName) => () => {
      this.props.mutate({
        variables: {id},
        refetchQueries: [{query: queryListUsers}]
      }).then((data) => {
          alert(`User ${firstName} was deleted`);
          
      }).catch((e) => alert('Error'));
    }
}

export default graphql(deleteUser)(graphql(queryListUsers)(UsersPageComponent));
