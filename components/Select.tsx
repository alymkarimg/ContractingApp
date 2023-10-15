import React, { useRef } from 'react';
import Select, { ActionMeta, components } from 'react-select';
import options from '../data/occupation.json';
import { InputProps, GroupBase } from 'react-select';

type OnChangeSelect = (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;

const Input = (props: React.JSX.IntrinsicAttributes & InputProps<unknown, boolean, GroupBase<unknown>>) => (
  <components.Input {...props} isHidden={false} />
);

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const formattedOptions = options.map((q) => {
  return { label: titleCase(q), value: q };
});

export default function EditableSelect(props: {
  state: unknown;
  setState: React.Dispatch<React.SetStateAction<unknown>>;
  stateValue: string;
  setStateValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { state, setState, stateValue, setStateValue } = props;

  const options = useRef(formattedOptions).current;

  const onInputChange = (inputValue: React.SetStateAction<string>, { action }: { action: string }) => {
    // onInputChange => update inputValue
    if (action === 'input-change') {
      setStateValue(inputValue);
      setState({ label: inputValue.toString(), value: inputValue.toString().toLowerCase() });
    }
  };

  const onChange: OnChangeSelect = (option: unknown) => {
    setState(option);
    setStateValue(option ? (option as { label: string }).label : '');
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
