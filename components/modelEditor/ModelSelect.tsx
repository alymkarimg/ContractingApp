import { useState } from 'react';
import { ModelSelect, Option } from './utils';
import _ from 'lodash';

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const Dropdown = (props: ModelSelect) => {
  const { state, setState, options, id } = props;

  const formattedOptions = options.map((q) => {
    return { label: titleCase(q.label), value: q.value.toLowerCase() };
  });

  // TODO: fix this TS error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    const selectedOption = formattedOptions[e.target.value];
    setState({ value: selectedOption.value, label: selectedOption.label } as Option);
  };

  return (
    <div id={id} className="z-10 rounded-lg bg-tertiary">
      <ul onClick={(e) => onClick(e)} className="list-none py-2 text-secondary bg-secondary text-tertiary text-sm">
        {formattedOptions.map((q, i) => (
          <li value={i} className={`hover:cursor-pointer ${q.value === state.value ? 'bg-quinary' : ''} block px-4 py-2`} key={`${q.value}_${id}`}>
            {q.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ModelSelect = (props: ModelSelect) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="p-2 pr-0 flex place-items-center">
      <button className="bg-primary p-1 text-tertiary text-xs px-3 h-6">Sort</button>
      <div className="absolute flex flex-col align-center justify-center">
        <div className="relative w-full top-25 right-17 xs:top-18 xs:right-20 sm:top-20 sm:right-24">
          {/* <DropdownMenu /> */}
          {isDropdownVisible && <Dropdown {...props} />}
        </div>
      </div>
    </div>
  );
};

export default ModelSelect;
