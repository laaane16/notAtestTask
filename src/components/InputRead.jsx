import PropTypes from "prop-types";

const InputRead = ({ className, formatter }) => {
  return <span className={className}>{formatter && formatter?.value}</span>;
};

InputRead.propTypes = {
  className: PropTypes.string,
  formatter: PropTypes.object,
};

export default InputRead;