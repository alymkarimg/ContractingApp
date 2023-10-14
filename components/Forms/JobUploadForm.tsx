import React, { useState, FormEvent, useEffect } from 'react';
import { DateRange } from '../DateRange';
import { SingleThumbRangeSlider } from '../RangeSlider';
import { LocationSearchBox } from '../LocationSearchBox';
import Select from '../Select';
import { toast } from 'react-toastify';

export default function Page(props: any) {
  const { apiKey } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // form state
  const [title, setTitle] = useState('');
  const [targetGeoLocation, setTargetGeoLocation] = useState({} as any);
  const [locationQuery, setLocationQuery] = useState('')
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [pay, setPay] = useState([0, 0]);
  const [occupation, setOccupation] = useState({ value: '', label: '' });
  const [occupationValue, setOccupationValue] = useState('');
  const [description, setDescription] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('latitude', targetGeoLocation.latitude);
      formData.append('longitude', targetGeoLocation.longitude);
      formData.append('datetime__start', dateStart);
      formData.append('datetime__end', dateEnd);
      formData.append('pay', pay[1].toString());
      formData.append('occupation', occupationValue);
      formData.append('description', description);

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

      if (data) {
        setSuccess(data.message);
        
        // clear all state
        setTitle('');
        setLocationQuery('')
        setDateStart('');
        setDateEnd('');
        setPay([0, 0]);
        setOccupation({ value: '', label: '' });
        setOccupationValue('');
        setDescription('');
      }
      // ...
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: error! }} />);
    // reset toast
    setError(null)
  }, [error]);

  useEffect(() => {
    if (success) toast.success(<ul dangerouslySetInnerHTML={{ __html: success! }} />);
    // reset toast
    setSuccess(null)
  }, [success]);

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
          <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} id="frm-title" type="text" className="no-margin-front" />
        </div>
        <div className="location block">
          <label htmlFor="frm-location">Location:</label>
          <LocationSearchBox setTargetGeoLocation={setTargetGeoLocation} locationQuery={locationQuery} setLocationQuery={setLocationQuery} apiKey={apiKey} />
        </div>
        <div className="datetime block">
          <label>Start date of job:</label>
          <DateRange
            state={dateStart}
            setState={setDateStart}
            filterTime={filterTime}
          />
        </div>
        <div className="datetime block">
          <label>End date of job:</label>
          <DateRange
            state={dateEnd}
            setState={setDateEnd}
            filterTime={filterTime}
          />
        </div>
        <div className="pay block">
          <label>Pay (Per Hour):</label>
          <SingleThumbRangeSlider state={pay} setState={setPay} form={'job__form'} min={0} max={100} />
        </div>
        <div className="occupation block">
          <label htmlFor="frm-occupation">Occupation Required:</label>
          <Select state={occupation} setState={setOccupation} stateValue={occupationValue} setStateValue={setOccupationValue} />
        </div>
        <div className="description block">
          <label htmlFor="frm-description">Job Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)} id="frm-description" rows={6}></textarea>
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
