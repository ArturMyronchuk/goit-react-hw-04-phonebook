import React, { useState } from 'react';
import { Button, Label, Form, InputName } from './Styled/ContactForm.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ContactForm = ({ createUser }) => {
  const [contact, setContact] = useState({ name: '', number: '' });

  const onHandleChange = e => {
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    const id = nanoid(2);
    createUser({ ...contact, id });
    setContact({ name: '', number: '' });
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit}>
        <Label>
          Name
          <InputName
            onChange={onHandleChange}
            type="text"
            name="name"
            value={contact.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label>
          Number
          <InputName
            onChange={onHandleChange}
            type="tel"
            name="number"
            value={contact.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};

export default ContactForm;
