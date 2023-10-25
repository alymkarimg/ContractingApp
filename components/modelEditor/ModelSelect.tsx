import Select from 'react-select';
import { ModelSelectProps } from './utils';

const ModelSelect = (props: ModelSelectProps) => {
  const { value, onChange, options } = props;

  return (
    <Select
      styles={{
        control: (provided) => ({
          ...provided,
          height: '42px',
          border: 'none',
          boxShadow: 'none',
        }),
        valueContainer: (provided) => ({
          ...provided,
          display: 'none',
        }),

        input: (provided) => ({
          ...provided,
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
        }),
        option: () => ({
          ':hover': {
            backgroundColor: 'black',
          },
          ':focus': {
            backgroundColor: 'black',
          },
        }),
        menuList: (provided) => ({
          ...provided,
          padding: 'none',
        }),
      }}
      classNames={{
        container: () => 'ml-2 bg-primary',
        control: () => 'bg-primary',
        menuList: () => 'bg-secondary w-36',
        option: (state) => (state.isSelected ? 'bg-quinary p-3' : 'bg-secondary p-3'),
        indicatorsContainer: () => 'bg-primary',
      }}
      isSearchable={false}
      isRtl={true}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default ModelSelect;
