import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';
import { MALE, GENDER } from '../constants/ActionTypes';

class AddFriendInput extends Component {

  render() {
    const { name, gender, error } = this.state;
    return (
      <div className={classnames(styles.formBlock)}>
        <input
          type="text"
          autoFocus="true"
          className={classnames('name','form-control', styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={name}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit} />
        <div className={styles.error} style={{ display: !error ? 'hidden' : 'block' }}>
          {error}
        </div>
        <div
          className={classnames(styles.genderField, styles.textLeft)}
          style={{ 'display': name && name.length > 0 ? 'block' : 'hidden' }}
        >
        {
          GENDER.map((type, key) => {
            return (
              <div key={type} className={styles.inlineButton}>        
                <input 
                  type="radio" 
                  id={type} 
                  name="chbox" 
                  onChange={this.selectGender}
                  checked={gender === type} 
                  value={type} />
                <label htmlFor={type}><i className={(`fa fa-${type}`)} />{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              </div>
            )
          })
        }
        </div>
        <div className={classnames(styles.genderField, styles.textCenter)}>
          <button className={styles.btn} onClick={this.formSubmit}><i className="fa fa-paper-plane" aria-hidden="true"></i>Submit</button>
        </div>
      </div>
    );
  }

  selectGender = event => {
    this.setState({
      gender: event.target.value,
    });
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender: MALE,
    };
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  }

  addFormData = (name, gender) => {
    this.props.addFriend(name, gender);
    this.setState({ name: '', gender: MALE, error: null });
  }

  formSubmit = () =>  {
    const { name, gender } = this.state;
    if (this.validateForm())
      this.addFormData(name, gender);
  }

  validateForm = () =>{
    const { name } = this.state;
    if (name.trim().length === 0) {
      this.setState({
        error: 'please enter name',
      });
      return false
    }
    return true;
  }

  handleSubmit = e => {
    const { gender } = this.state;
    const name = e.target.value.trim();

    if (e.which === 13 && this.validateForm()) {
      this.addFormData(name, gender);
    }
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
