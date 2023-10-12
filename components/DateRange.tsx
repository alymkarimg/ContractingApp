import { SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRange = (props: any) => {
  const { name } = props;
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      dateFormat={'dd-MM-yyyy'}
      name={name}
      className="no-margin-front"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update: any) => {
        setDateRange(update);
      }}
      withPortal
    />
  );
};
