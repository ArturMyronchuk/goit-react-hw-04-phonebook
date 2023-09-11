import { Component } from 'react';
import { Button, Label, Form, InputName } from './Styled/ContactForm.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  onHandleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    const { createUser } = this.props;
    const { name, number } = this.state;
    const id = nanoid(2);
    createUser({ name, number, id });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <Form onSubmit={this.onHandleSubmit}>
          <Label>
            Name
            <InputName
              onChange={this.onHandleChange}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>

          <Label>
            Number
            <InputName
              onChange={this.onHandleChange}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />{' '}
          </Label>
          <Button type="submit">Add contact</Button>
        </Form>
      </>
    );
  }
}
export default ContactForm;
