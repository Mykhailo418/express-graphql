import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {getUser} from '../../queries/users';
import {likeCopmpanyMutation} from '../../queries/companies';
import {graphql} from 'react-apollo';
import CompanyDetails from '../company/CompanyDetails';

class UserDetailsPageComponent extends Component{
    static propTypes = {

    }

    render(){
      const {data} = this.props;
      if(!data || !data.user) return 'Loading...';
      const {firstName, company} = data.user;
      const likeBtn = (company) ? <a href="#like" onClick={this.doLikeCompany(company.id, company.likes)}>👍 Like company</a> : null;
      return (
        <Fragment>
          <h1>{firstName}</h1>
          <CompanyDetails info={company} />
          {likeBtn}
        </Fragment>
      );
    }

  doLikeCompany = (id, likes) => (e) =>{
    e.preventDefault();
    this.props.mutate({
      variables: {id},
      refetchQueries: [{
            query: getUser,
            variables: {id: this.props.match.params.id},
          }],
      optimisticResponse: {
        __typename: 'Mutation',
        likeCompany: {
          __typename: 'CompanyType',
          id: id,
          likes: likes
        }
      }
    });
  }

}

export default graphql(likeCopmpanyMutation)(graphql(getUser, {
  options: (props) => ({variables: {id: props.match.params.id}})
})(UserDetailsPageComponent) );
