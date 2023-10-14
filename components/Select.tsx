import React, { useState, useRef } from 'react';
import Select, { components } from 'react-select';
import options from '../data/occupation.json';

const Input = (props: any) => <components.Input {...props} isHidden={false} />;

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const formattedOptions = options.map((q) => {
  return { label: titleCase(q), value: q };
}) as any;

export default function EditableSelect(props: any) {
  const { state, setState, stateValue, setStateValue } = props;

  const options = useRef(formattedOptions).current;

  const onInputChange = (inputValue: React.SetStateAction<string>, { action }: any) => {
    // onInputChange => update inputValue
    if (action === 'input-change') {
      setStateValue(inputValue);
      setState({ label: inputValue.toString(), value: inputValue.toString().toLowerCase() });
    }
  };

  const onChange = (option: any) => {
    setState(option);
    setStateValue(option ? option.label : '');
  };

  return (
    <Select
      className="no-margin-front occupation__select"
      options={options}
      value={state}
      inputValue={stateValue}
      onInputChange={onInputChange}
      onChange={onChange}
      components={{
        Input,
      }}
    />
  );
}
