import Select from 'react-select';
import { ModelSelectProps } from './utils';

const ModelSelect = (props: ModelSelectProps) => {
  const { value, onChange, options } = props;

  return (
    <Select
      styles={{
        valueContainer: (provided) => ({
          ...provided,
          width: '0',
          height: '0',
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
        option: ({ isSelected }) => (isSelected ? 'bg-quinary p-3' : 'bg-secondary p-3'),
        indicatorsContainer: () => 'bg-primary',
      }}
      unstyled
      isSearchable={false}
      isRtl={true}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default ModelSelect;
