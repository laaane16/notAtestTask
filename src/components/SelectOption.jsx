import { Select } from "antd";
const { Option } = Select;
import PropTypes from 'prop-types';


const SelectOption = ({ option, styles }) => {
  return (
    <Option value={option.value} label={option.label}>
      {option.label}
      {option.subLabel && (
        <span className={styles.optionSubLabel}>{option.subLabel}</span>
      )}
    </Option>
  );
};

SelectOption.propTypes = {
  option: PropTypes.object,
  styles: PropTypes.object,
}
export default SelectOption;
