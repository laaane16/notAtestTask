import Input from "antd/es/input/Input";
import PropTypes from "prop-types";

const UniversalComponent = ({ conditions, props, defaultInputProps }) => {
  const {readOnly} = props;

  for (let i in conditions) {

    if (props[i]) {
      if (i === "type" && props[i] === "number") {

        if (readOnly) {
          return conditions[i]["readable"];
        } 
        return conditions[i]["writable"];
      }
      return conditions[i];
    }
  }
  return <Input {...defaultInputProps} />;
};

UniversalComponent.propTypes = {
  conditions: PropTypes.array,
  props: PropTypes.object,
  defaultInputProps: PropTypes.object,
};

export default UniversalComponent;
