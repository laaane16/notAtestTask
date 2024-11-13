import {SelectOption} from "./";

import { isArray } from "lodash";
import { Select } from "antd";
import PropTypes from 'prop-types';

const { OptGroup } = Select;

const Options = ({ options, styles }) => {
  return options.map((option) =>
    isArray(option.options) ? (
      <OptGroup key={option.value} label={option.label}>
        {option.options.map((subOption) => (
          <SelectOption styles={styles} key={subOption.value} option={subOption} />
        ))}
      </OptGroup>
    ) : (
      <SelectOption styles={styles} key={option.value} option={option} />
    )
  );
};

Options.propTypes = {
  options: PropTypes.array,
  styles: PropTypes.object,
}

export default Options;
