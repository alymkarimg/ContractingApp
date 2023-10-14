import { SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRange = (props: any) => {
  const { filterTime, state, setState } = props;

  return (
    <DatePicker
      filterTime={filterTime}
      showTimeSelect
      autoComplete="off"
      dateFormat="dd-MM-yyyy hh:mm"
      className="no-margin-front"
      selected={state}
      onChange={(update: any) => {
        setState(update);
      }}
      withPortal
    />
  );
};
