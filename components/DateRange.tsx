import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRange = (props: {
  filterTime: ((date: Date) => boolean) | undefined;
  state: Date | null | undefined;
  setState: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const { filterTime, state, setState } = props;

  return (
    <DatePicker
      filterTime={filterTime}
      showTimeSelect
      autoComplete="off"
      dateFormat="dd-MM-yyyy hh:mm"
      className="no-margin-front"
      selected={state}
      onChange={(update) => {
        setState(update);
      }}
      withPortal
    />
  );
};
