import React, { useState, useEffect } from 'react';
import ContactForm from './Phonebook/ContactForm';
import ContactList from './Phonebook/ContactList';
import Filter from './Phonebook/Filter/Filter';
import { Div } from './App.styled';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? initialState;
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createUser = contact => {
    const { name } = contact;
    const lowerCaseName = name.toLowerCase(); // Перетворюємо ім'я до нижнього регістру
    if (
      contacts.find(contact => lowerCaseName === contact.name.toLowerCase())
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(contacts => {
      return [contact, ...contacts];
    });
  };

  const addFilter = e => setFilter(e.target.value);

  const onFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts => {
      return contacts.filter(contact => contact.id !== id);
    });
  };

  return (
    <Div>
      <h1>Phonebook</h1>
      <ContactForm createUser={createUser} />
      <h2>Contacts</h2>
      <Filter filter={filter} addFilter={addFilter} />
      <ContactList
        contacts={onFilter(contacts)}
        deleteContact={deleteContact}
      />
    </Div>
  );
};
export default App;
