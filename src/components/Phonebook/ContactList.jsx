import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';
import { Ul } from './Styled/ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <Ul>
      {contacts.map(contact => {
        const { id } = contact;
        return (
          <ContactItem
            key={id}
            contact={contact}
            deleteContact={deleteContact}
          />
        );
      })}
    </Ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
