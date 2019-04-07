import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class CompanyDetails extends Component{
    static propTypes = {

    }

    render(){
      const {info} = this.props;
      return (
        <Fragment>
          <h4>Company Information:</h4>
          <ul>
            <li><strong>Name:</strong> {info.name}</li>
            <li><strong>Description:</strong> {info.description}</li>
          </ul>
        </Fragment>
      );
    }
}

export default CompanyDetails;
