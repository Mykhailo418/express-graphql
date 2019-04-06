import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {getUser} from '../../queries/users';
import {graphql} from 'react-apollo';

class UserDetailsPageComponent extends Component{
    static propTypes = {

    }

    render(){
      const {data} = this.props;
      if(!data || !data.user) return 'Loading...';
      const {firstName} = data.user;
      return (
        <Fragment>
          <h1>{firstName}</h1>
        </Fragment>
      );
    }


}

export default graphql(getUser, {
  options: (props) => ({variables: {id: props.match.params.id}})
})(UserDetailsPageComponent);
