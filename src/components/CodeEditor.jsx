import { Input } from "antd";
const { TextArea } = Input;

import PropTypes from "prop-types";

const CodeEditor = ({
  className,
  inputRef,
  style,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <TextArea
      rows={4}
      value={value}
      ref={inputRef}
      onChange={onChange}
      onBlur={() => onBlur && onBlur(value)}
      className={className}
      style={style}
    />
  );
};

CodeEditor.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.node,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
};

export default CodeEditor;
