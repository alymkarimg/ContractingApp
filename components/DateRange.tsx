import { SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRange = (props: any) => {
  const { name, defaultDate, filterTime } = props;
  const [date, setDate] = useState(defaultDate);

  return (
    <DatePicker
      filterTime={filterTime}
      showTimeSelect
      autoComplete="off"
      dateFormat="dd-MM-yyyy hh:mm"
      name={name}
      className="no-margin-front"
      selected={date}
      onChange={(update: any) => {
        setDate(update);
      }}
      withPortal
    />
  );
};
