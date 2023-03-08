import { Field, Formik } from 'formik';
import { Form, FormFilter, ErrorMessage } from './ContactForm.styled';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

const FilterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.number().positive().required('Required'),
});

export const ContactForm = ({ onSave }) => {
  return (
    <Formik
      initialValues={{ name: '', number: 0 }}
      validationSchema={FilterSchema}
      onSubmit={(value, actions) => {
        onSave({
          ...value,
          id: nanoid(),
        });
        actions.resetForm(false);
      }}
    >
      <Form>
        <FormFilter>
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="div" />
        </FormFilter>
        <FormFilter>
          Tel
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="div" />
        </FormFilter>
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};
