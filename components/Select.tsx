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
  const { name } = props;

  // This needs to become a controlled component so track state
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const options = useRef(formattedOptions).current;

  const onInputChange = (inputValue: React.SetStateAction<string>, { action }: any) => {
    // onInputChange => update inputValue
    if (action === 'input-change') {
      setInputValue(inputValue);
    }
    if (inputValue === '') {
      setValue('');
    }
  };

  const onChange = (option: any) => {
    setValue(option);
    setInputValue(option ? option.label : '');
  };

  return (
    <Select
      name={name}
      className="no-margin-front occupation__select"
      options={options}
      value={value}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      components={{
        Input,
      }}
    />
  );
}
