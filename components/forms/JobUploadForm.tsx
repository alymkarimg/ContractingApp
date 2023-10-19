import React, { useState, FormEvent, useEffect, Dispatch } from 'react';
import { DateRange } from '../DateRange';
import { SingleThumbRangeSlider } from '../RangeSlider';
import { LocationSearchBox } from '../LocationSearchBox';
import Select from '../Select';
import { toast } from 'react-toastify';
import { jobSchema } from '@/validations/jobSchema';
import { formatJob, formatZodErrors } from '@/validations/helper';
import DOMPurify from 'dompurify';
import { IJob } from '@/interfaces/job.interface';
import _ from 'lodash';
import { useRouter } from 'next/navigation';

const JobUploadForm = (props: { apiKey: string; data?: IJob }) => {
  const { apiKey, data } = props;
  const isAddMode = !data;
  const [isLoading, setIsLoading] = useState<boolean>(!isAddMode);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // form state
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [dateStart, setDateStart] = useState(null as Date | null);
  const [dateEnd, setDateEnd] = useState(null as Date | null);
  const [pay, setPay] = useState([0, 0]);
  const [occupation, setOccupation] = useState({ value: '', label: '' });
  const [occupationValue, setOccupationValue] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    // query place details
    let address, lat, lng;
    try {
      const response = await fetch(`api/place-details?query=${location}`);
      const placeDetailsJson = await response.json();
      address = placeDetailsJson.formatted_address;
      lat = placeDetailsJson.geometry.location.lat;
      lng = placeDetailsJson.geometry.location.lng;
    } catch (e) {
      console.log(e);
    }

    try {
      jobSchema().parse(
        formatJob({
          title,
          location,
          address,
          lat,
          lng,
          datetime__start: dateStart ? dateStart.toISOString() : '',
          datetime__end: dateEnd ? dateEnd.toISOString() : '',
          pay: pay[1].toString(),
          occupation: occupationValue,
          description,
        })
      );

      const formData = new FormData();
      formData.append('title', title);
      formData.append('location', location);
      formData.append('address', address);
      formData.append('lat', lat);
      formData.append('lng', lng);
      formData.append('datetime__start', dateStart?.toString() ?? '');
      formData.append('datetime__end', dateEnd?.toString() ?? '');
      formData.append('pay', pay[1].toString());
      formData.append('occupation', occupationValue);
      formData.append('description', description);

      const response = await fetch(`/api${isAddMode ? '' : `?id=${data._id}`}`, {
        method: isAddMode ? 'Post' : 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.message);
      }

      if (response.ok && isAddMode) {
        // Handle response if necessary
        const data = await response.json();

        setSuccess(data.message);

        // clear all state
        setTitle('');
        setLocation('');
        setLocationQuery('');
        setDateStart(null);
        setDateEnd(null);
        setPay([0, 0]);
        setOccupation({ value: '', label: '' });
        setOccupationValue('');
        setDescription('');
      } else {
        router.push(`/admin-area?success=${true}`);
      }

      setIsLoading(false);
    } catch (e: unknown) {
      // Capture the error message to display to the user
      setError(formatZodErrors(JSON.parse((e as { message: string }).message)));
    }
  }

  // populate data
  useEffect(() => {
    if (data && !_.isEmpty(data)) {
      // populate] all state
      setTitle(data.title);
      setLocation(data.location);
      setLocationQuery(data.address);
      setDateStart(new Date(data.datetime__start!));
      setDateEnd(new Date(data.datetime__end!));
      setPay([0, data.pay / 100]);
      setOccupation({ value: data.occupation, label: _.capitalize(data.occupation) });
      setOccupationValue(data.occupation);
      setDescription(data.description);
      setIsLoading(false);
    }
  }, [data]);

  // toast stuff
  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }} />);
    // reset toast
    setError(null);
  }, [error]);

  useEffect(() => {
    if (success) toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(success) }} />);
    // reset toast
    setSuccess(null);
  }, [success]);

  // form stuff
  const filterTime = (time: string | number | Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <>
      {(!_.isEmpty(data) && !isAddMode) ||
        (isAddMode && (
          <form onSubmit={onSubmit} className="form__container">
            <div className="title block">
              <label htmlFor="frm-title">Title*:</label>
              <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} id="frm-title" type="text" className="no-margin-front" />
            </div>
            <div className="location block">
              <label htmlFor="frm-location">Location*:</label>
              <LocationSearchBox setLocation={setLocation} locationQuery={locationQuery} setLocationQuery={setLocationQuery} apiKey={apiKey} />
            </div>
            <div className="datetime block">
              <label>Start of job*:</label>
              <DateRange state={dateStart} setState={setDateStart} filterTime={isAddMode ? filterTime : undefined} />
            </div>
            <div className="datetime block">
              <label>End of job*:</label>
              <DateRange state={dateEnd} setState={setDateEnd} filterTime={isAddMode ? filterTime : undefined} />
            </div>
            <div className="pay block">
              <label>Pay (Per Hour)*:</label>
              <SingleThumbRangeSlider state={pay} setState={setPay} min={0} max={100} />
            </div>
            <div className="occupation block">
              <label htmlFor="frm-occupation">Occupation Required*:</label>
              <Select
                state={occupation}
                setState={setOccupation as Dispatch<unknown>}
                stateValue={occupationValue}
                setStateValue={setOccupationValue}
              />
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
        ))}
    </>
  );
};

export default JobUploadForm;
