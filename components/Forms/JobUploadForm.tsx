import React, { useState, FormEvent, useEffect } from 'react';
import { DateRange } from '../DateRange';
import { SingleThumbRangeSlider } from '../RangeSlider';
import { LocationSearchBox } from '../LocationSearchBox';
import Select from '../Select';
import { ToastContainer, toast } from 'react-toastify';

export default function Page(props: any) {
  const { apiKey } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pay, setPay] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      formData.append('pay', pay.toString() ?? '');

      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.message);
      }

      // Handle response if necessary
      const data = await response.json();
      // ...
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: error! }} />);
  }, [error]);

  const filterTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form__container">
        <div className="title block">
          <label htmlFor="frm-title">Title:</label>
          <input id="frm-title" type="text" name="title" className="no-margin-front" />
        </div>
        <div className="location block">
          <label htmlFor="frm-location">Location:</label>
          <LocationSearchBox name={'location'} apiKey={apiKey} />
        </div>
        <div className="datetime block">
          <label>Start date of job:</label>
          <DateRange
            filterTime={filterTime}
            defaultDate={new Date(new Date().setMinutes(Math.ceil(new Date().getMinutes() / 30) * 30))}
            name={'datetime__start'}
          />
        </div>
        <div className="datetime block">
          <label>End date of job:</label>
          <DateRange
            filterTime={filterTime}
            defaultDate={new Date(new Date().setMinutes(Math.ceil(new Date().getMinutes() / 30) * 30 + 30))}
            name={'datetime__end'}
          />
        </div>
        <div className="pay block">
          <label>Pay (Per Hour):</label>
          <SingleThumbRangeSlider name={'pay'} min={0} max={100} setValue={setPay} value={pay} />
        </div>
        <div className="occupation block">
          <label htmlFor="frm-occupation">Occupation Required:</label>
          <Select name={'occupation'} />
        </div>
        <div className="description block">
          <label htmlFor="frm-description">Job Description:</label>
          <textarea id="frm-description" rows={6} name="description"></textarea>
        </div>
        <div className="button block">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
}
