import { useState } from 'react';
import { ModelDropdown, Option } from './utils';
import Image from 'next/image';

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const Dropdown = (props: ModelDropdown) => {
  const { setState, options, id } = props;

  const formattedOptions = options.map((q) => {
    return { label: titleCase(q.label), value: q.value.toLowerCase() };
  });

  const onChange = (option: unknown) => {
    setState(option as Option);
  };

  return (
    <div id={id} className="z-10 rounded-lg bg-tertiary">
      <ul onChange={(e) => onChange(e)} className="list-none py-2 text-secondary">
        {formattedOptions.map((q) => (
          <li value={q.value} key={`${q.value}_${id}`}>
            <a href="#" className="block px-4 py-2">
              {q.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ModelDropdown = (props: ModelDropdown) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // setDropdownVisible(false);
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

export default ModelDropdown;
