import PropTypes from 'prop-types';
import { Li, Ul } from './ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <Ul>
      {contacts.map(({ id, name, number }) => (
        <Li key={id}>
          {name} <span>{number}</span>
          <button onClick={() => deleteContact(id)}>Delete</button>
        </Li>
      ))}
    </Ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
