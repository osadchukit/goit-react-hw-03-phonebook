import PropTypes from 'prop-types';
import { Input, Label } from './Filter.styled';

export const Filter = ({ onChange, value }) => {
  return (
    <Label>
      фільтер
      <Input type="text" onChange={onChange} value={value} />
    </Label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
