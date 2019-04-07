import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {getUser} from '../../queries/users';
import {graphql} from 'react-apollo';
import CompanyDetails from '../company/CompanyDetails';

class UserDetailsPageComponent extends Component{
    static propTypes = {

    }

    render(){
      const {data} = this.props;
      if(!data || !data.user) return 'Loading...';
      const {firstName, company} = data.user;
      return (
        <Fragment>
          <h1>{firstName}</h1>
          <CompanyDetails info={company} />
        </Fragment>
      );
    }


}

export default graphql(getUser, {
  options: (props) => ({variables: {id: props.match.params.id}})
})(UserDetailsPageComponent);
