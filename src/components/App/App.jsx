import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Box } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const saveContact = localStorage.getItem('contacts');
    if (saveContact !== null) {
      const parsedContact = JSON.parse(saveContact);
      console.log(parsedContact);
      this.setState({ contacts: parsedContact });
      return;
    }
    this.setState({
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: 4591256 },
        { id: 'id-2', name: 'Hermione Kline', number: 4438912 },
        { id: 'id-3', name: 'Eden Clements', number: 645779 },
        { id: 'id-4', name: 'Annie Copeland', number: 2279126 },
      ],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const isExist = this.state.contacts.find(
      contact =>
        contact.name === newContact.name || contact.number === newContact.number
    );
    if (isExist) {
      alert(`${newContact.name}: is already in contacts`);
      return;
    } else {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, newContact] };
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  contactFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContact = this.getVisibleContact();

    return (
      <Box>
        <h1>Phonebook</h1>
        <ContactForm onSave={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.contactFilter} value={this.state.filter} />
        <ContactList
          contacts={visibleContact}
          deleteContact={this.deleteContact}
        />
      </Box>
    );
  }
}

export default App;
