import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {queryListCompanies} from '../../queries/companies';
import {mutationNewUser,queryListUsers} from '../../queries/users';
import {graphql} from 'react-apollo';
import {} from 'react-router';

class NewUserComponent extends Component{
    static propTypes = {

    }

    state = {
      firstName: '',
      age: 0,
      companyId: ""
    }

    render(){
      //console.log(this.props);
      return (
        <Fragment>
          <h1>Add New User</h1>
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <label>First Name:</label>
              <input type='text' value={this.state.firstName} onChange={this.onChangeField('firstName')} className="form-control" />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input type='number' value={this.state.age} onChange={this.onChangeField('age')} className="form-control" />
            </div>
            <div className="form-group">
              <label>Company:</label>
              <select className="form-control" onChange={this.onChangeField('companyId')} value={this.state.companyId}>
                <option value=""></option>
                {this.outpurCompaniesList()}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Fragment>
      );
    }

    onChangeField = field => (event) => {
      this.setState({[field]: event.target.value});
    }

    outpurCompaniesList = () => {
      const {companies} = this.props.data;
      if(!companies) return [];
      return companies.map((company) => <option key={company._id} value={company.id} >{company.name}</option>)
    }

    onSubmitForm = (e) => {
      e.preventDefault();
      this.props.mutate({
        variables: {
          firstName: this.state.firstName,
          age: this.state.age*1,
          companyId: this.state.companyId.toString(),
        },
        refetchQueries: [{query: queryListUsers}]
      })
      .then((data) => {
        alert(`User was added ${data.data.addUser.id}`);
        this.props.history.push('/');
      })
      .catch((e) => {alert('Error'); console.error(e)});
    }

}

export default graphql(mutationNewUser)(graphql(queryListCompanies)(NewUserComponent));
