import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {mutationAddCompany,queryListCompanies} from '../../queries/companies';
import {graphql} from 'react-apollo';

class NewCompanyComponent extends Component{
    static propTypes = {

    }

    state = {
      name: '',
      description: ''
    }

    render(){
      return (
        <Fragment>
          <h1>Add New Company</h1>
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <label>Name:</label>
              <input type='text' value={this.state.name} onChange={this.onChangeField('name')} className="form-control" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input type='text' value={this.state.description} onChange={this.onChangeField('description')} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <hr />
          <h3>Existed Companies:</h3>
          {this.outputListOfCompanies()}
        </Fragment>
      );
    }

    onChangeField = field => (event) => {
      this.setState({[field]: event.target.value});
    }

    onSubmitForm = (e) => {
      e.preventDefault();
      this.props.mutate({
        variables: {
          name: this.state.name,
          description: this.state.description
        }
      })
      .then((data) => {
        alert(`Company was added ${data.data.addCompany._id}`);
        this.clearForm();
      })
      .catch((e) => {alert('Error'); console.error(e)});
    }

    clearForm = () => {
      this.setState({
        name: '',
        description: ''
      });
    }

    outputListOfCompanies = () => {
      const {companies} = this.props.data;
      if(!companies) return <p>There are no companies</p>;
      const companiesList = companies.map((company) => <li key={company._id} >{company.name}</li>);
      return <ul>{companiesList}</ul>;
    }

}

export default graphql(mutationAddCompany)(graphql(queryListCompanies)(NewCompanyComponent));
