import PropTypes from 'prop-types'
import cn from "classnames";

const WrappedChildren = ({ children, inputStyle, inputCN }) => {
  return (
    <div style={inputStyle} className={cn("ant-input", inputCN)}>
      {children}
    </div>
  );
};

WrappedChildren.propTypes = {
  children: PropTypes.node,
  inputStyle: PropTypes.any,
  inputCN: PropTypes.any
}

export default WrappedChildren;