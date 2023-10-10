import { SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRange = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
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
