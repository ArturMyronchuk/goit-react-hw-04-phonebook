import React, { Component } from 'react';
import ContactForm from './Phonebook/ContactForm';
import ContactList from './Phonebook/ContactList';
import Filter from './Phonebook/Filter/Filter';
import { Div } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createUser = contact => {
    const { contacts } = this.state;
    const { name } = contact;
    const normalizedNewName = name.toLowerCase();

    if (
      contacts.find(contact => normalizedNewName === contact.name.toLowerCase())
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  addFilter = e => this.setState({ filter: e.target.value });

  onFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = id => {
    this.setState(prev => {
      return { contacts: prev.contacts.filter(contact => contact.id !== id) };
    });
  };
  render() {
    const { contacts, filter } = this.state;

    return (
      <Div>
        <h1>Phonebook</h1>
        <ContactForm createUser={this.createUser} />

        <h2>Contacts</h2>
        <Filter filter={filter} addFilter={this.addFilter} />
        <ContactList
          contacts={this.onFilter(contacts)}
          deleteContact={this.deleteContact}
        />
      </Div>
    );
  }
}
export default App;
