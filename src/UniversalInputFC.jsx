import {
  InputRead,
  UniversalComponent,
  Options,
  CodeEditor,
  WrappedChildren,
} from "./components";

import maskIsValid from "./maskValidator";
import * as styles from "./styles.css";
import { formatCharsInput } from "./maskFormat";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { assign, keys, some } from "lodash";
import cn from "classnames";
import { Input, InputNumber, Select } from "antd";
import MaskedInput from "react-input-mask";

const { TextArea } = Input;

const TextInputWithActions = (props) => {
  const {
    disabled,
    placeholder,
    onChange,
    value,
    formatter,
    children,
    wrapperClassName,
    className,
    style,
    actionsClassName,
    actions,
    type,
    theme,
    multiline,
    minRows = 1,
    maxRows = 20,
    config,
    onEndEditing,
    allowTabs,
    subType,
    mask = "",
    options,
    actionsNode,
    readOnly,
    actionsStyle,
    prepareNumber,
    onKeyDown,
    autofocus,
  } = props;

  const inputRef = useRef();

  const [state, setState] = useState({ actionsWidth: 0, oldValue: "" });

  const isMounted = useRef(false);

  const currentMask = maskIsValid(mask) && mask;

  const textInputContainer = type === "number" ? "" : styles.textInputContainer;

  const containerCN = cn(wrapperClassName, textInputContainer, {
    [styles.inputMask]: !multiline && !!mask,
  });

  let inputCN = cn(className, {
    [styles.inputReadOnly]: readOnly,
    [styles[theme]]: !!theme,
    [styles.readOnly]: readOnly,
  });

  let actionsCN = styles.inputWithActions;
  let inputStyle = assign({}, style);

  let currentActionsNode = { ...actionsNode };

  if (!actions || actions.length == 0) {
    if (actionsStyle) {
      actionsStyle.visibility = "hidden";
    }
  } else if (state.actionsWidth) {
    inputStyle.paddingRight = state.actionsWidth;
  }

  const recalcActionsWidth = () => {
    actionsNode &&
      actionsNode.clientWidth !== state.actionsWidth &&
      setState({ ...state, actionsWidth: actionsNode.clientWidth });
  };

  const setFocus = () => {
    autofocus && inputRef.current.focus();
  };

  useEffect(() => {
    if (!isMounted) {
      recalcActionsWidth();
      setFocus();
      isMounted.current = true;
    } else {
      recalcActionsWidth();
    }
  }, []);

  const onHandleChange = (e) => {
    onChange(e.target.value);
  };

  const onSelectChange = (value) => {
    onChange(value);
  };

  const onChangeNumber = (value) => {
    const result = prepareNumber ? prepareNumber(value) : value;

    onChange(result);
  };

  const onBlur = (e) => {
    readOnly && setBlur(e.target.value);
  };

  const onBlurNumber = (e) => {
    if (readOnly) {
      return;
    }

    const value = prepareNumber
      ? prepareNumber(e.target.value)
      : e.target.value;
    if (value || state.oldValue !== "") {
      setBlur(value);
    }
  };

  const setBlur = (value) => {
    onChange(value);
    if (value !== state.oldValue) {
      onEndEditing && onEndEditing(value);
    }
    state.oldValue = value;
  };

  //--------------------------------

  // let changeTimer;

  // const onChangeDebounce = (value) => {
  //   onChange(value);

  //   onChangeDebounceCancel();

  //   changeTimer = setTimeout(() => {
  //     onChange(value);
  //   }, 200);
  // };

  // const onChangeDebounceCancel = () => {
  //   clearTimeout(changeTimer);
  // };

  const handleKeyDown = (e) => {
    onKeyDown && onKeyDown(e);
    if (!allowTabs) {
      return;
    }
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      document.execCommand("insertText", false, "\t");
      return false;
    }
  };

  const onChangeMasked = (e) => {
    const value = e.target.value;
    if (value === mask.replace(/[^-]/g, "_")) {
      onChange("");
    } else {
      onChange(value);
    }
  };

  const getPlaceHolderMask = (mask) => {
    const charsEditableMask = keys(formatCharsInput).join("");
    let placeholder = "";
    // let shielding = false;

    for (let i = 0; i < mask.length; i++) {
      // if (shielding) {
      //   shielding = false;
      //   placeholder += mask[i];
      //   continue;
      // }

      // if (mask[i] == "\\") {
      //   shielding = true;
      //   continue;
      // }

      if (charsEditableMask.includes(mask[i])) {
        placeholder += "_";
        continue;
      }

      placeholder += mask[i];
    }

    return placeholder;
  };

  const filterOption = (input, option) => {
    return (option.label || "").toLowerCase().includes(input.toLowerCase());
  };

  //-------------------------

  if (options) {
    inputStyle = assign(inputStyle, { width: "100%" });
    const valueInOptions = some(options, (option) => {
      if (option.value === value) {
        return true;
      }
      if (
        option.options &&
        some(option.options, (subOption) => subOption.value === value)
      ) {
        return true;
      }
    });
    if (!valueInOptions && value) {
      inputCN = cn(inputCN, styles.invalidValue);
    }
  }

  //--------------------------------

  const selectProps = {
    placeholder,
    ref: inputRef,
    className: inputCN,
    style: inputStyle,
    value,
    onChange: onSelectChange,
    onBlur,
    onInputKeyDown: handleKeyDown,
    showSearch: true,
    variant: false,
    suffixIcon: "",
    popupMatchSelectWidth: 300,
    filterOption,
  };

  const inputNumberProps = {
    type,
    disabled,
    placeholder,
    ref: inputRef,
    onKeyDown: handleKeyDown,
    className: inputCN,
    style,
    value,
    onChange: onChangeNumber,
    onBlur: onBlurNumber,
  };

  const maskedInputProps = {
    formatChars: formatCharsInput,
    onKeyDown: handleKeyDown,
    mask: currentMask,
    placeholder: getPlaceHolderMask(currentMask),
    value,
    style: inputStyle,
    className: inputCN,
    onChange: onChangeMasked,
    onBlur,
    disabled: readOnly,
  };

  const codeEditorProps = {
    placeholder,
    ref: inputRef,
    value,
    style: inputStyle,
    className: inputCN,
    onChange: onHandleChange,
    onBlur: setBlur,
    subType,
    rows: config?.get("rows"),
  };

  const textAreaProps = {
    placeholder,
    ref: inputRef,
    value,
    spellCheck: "false",
    rows: 4,
    autoSize: {
      minRows: readOnly ? 1 : minRows,
      maxRows,
    },
    className: cn(inputCN, styles.textArea),
    onChange: onHandleChange,
    onBlur,
    onKeyDown: handleKeyDown,
  };

  const defaultInputProps = {
    disabled: disabled,
    value,
    onChange: onHandleChange,
    style: inputStyle,
    className: inputCN,
    placeholder,
  };

  const wrappedChildrenProps = {
    children,
    inputStyle,
    inputCN,
  };

  const inputReadProps = {
    className: inputCN,
    formatter,
  };

  const conditions = {
    type: {
      writable: <InputNumber {...inputNumberProps} />,
      readable: <InputRead {...inputReadProps} />,
    },
    mask: (
      <MaskedInput {...maskedInputProps}>
        {(inputProps) => <Input ref={inputRef} {...inputProps} />}
      </MaskedInput>
    ),
    script: <CodeEditor {...codeEditorProps} />,
    options: (
      <Select {...selectProps}>
        <Options styles={styles} options={options} />
      </Select>
    ),
    multiline: <TextArea {...textAreaProps} />,
    children: (
      <WrappedChildren {...wrappedChildrenProps}>{children}</WrappedChildren>
    ),
  };

  return (
    <div className={containerCN}>
      {UniversalComponent({ conditions, props, defaultInputProps })}

      {(actions && actions.length && (
        <ul
          className={cn(actionsClassName, actionsCN)}
          ref={(node) => (currentActionsNode = node)}
          style={actionsStyle}
        >
          {actions.map((node, i) => (
            <li key={i}>{node}</li>
          ))}
        </ul>
      )) ||
        null}
    </div>
  );
};

TextInputWithActions.propTypes = {
  className: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  multiline: PropTypes.bool,
  mask: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  children: PropTypes.node,
  theme: PropTypes.string,
  value: PropTypes.any,
  formatter: PropTypes.any,
  wrapperClassName: PropTypes.string,
  actionsClassName: PropTypes.string,
  actions: PropTypes.any,
  config: PropTypes.object,
  onEndEditing: PropTypes.func,
  allowTabs: PropTypes.any,
  subType: PropTypes.string,
  actionsNode: PropTypes.node,
  readOnly: PropTypes.string,
  actionsStyle: PropTypes.object,
  prepareNumber: PropTypes.func,
  onKeyDown: PropTypes.func,
  autofocus: PropTypes.bool,
};

const UniversalInputFC = ({
  onChange,
  onEndEditing,
  updateProcess,
  eventable,
  actions,
  t,
  value,
  ...otherProps
}) => {
  const [shouldProcess, setShouldProcess] = useState(false);

  const handleChange = (value) => {
    onChange(value);
    eventable && setShouldProcess(true);
  };

  const handleEndEditing = (value) => {
    onEndEditing && onEndEditing(value);
    setShouldProcess(false);
  };

  const inProcess = updateProcess && updateProcess.get("inProcess");

  const newActions = [...(actions || [])];
  if (shouldProcess || inProcess) {
    newActions.push(
      <span
        className={cn(styles.actionIcon, {
          [styles.actionIconGray]: inProcess,
        })}
        title={inProcess ? "" : "ready to send"}
      ></span>
    );
  }

  return (
    <TextInputWithActions
      onEndEditing={handleEndEditing}
      onChange={handleChange}
      actions={newActions}
      value={value}
      updateProcess={updateProcess}
      eventable={eventable}
      t={t}
      {...otherProps}
    />
  );
};

UniversalInputFC.propTypes = {
  onChange: PropTypes.func,
  onEndEditing: PropTypes.func,
  updateProcess: PropTypes.any,
  eventable: PropTypes.any,
  actions: PropTypes.any,
  t: PropTypes.any,
  value: PropTypes.any,
};

export default UniversalInputFC;
