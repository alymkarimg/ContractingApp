import React, { useState, FormEvent } from 'react';
import { DateRange } from '../DateRange';
import { SingleThumbRangeSlider } from '../RangeSlider';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
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

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit} className="form__container">
        <div className="title block">
          <label htmlFor="frm-title">Title</label>
          <input id="frm-title" type="text" name="title" required className="no-margin-front" />
        </div>
        <div className="location block">
          <label htmlFor="frm-location">Location</label>
          <input id="frm-location" type="text" name="location" required className="no-margin-front" />
        </div>
        <div className="datetime block">
          <label>Date and Time</label>
          <DateRange />
        </div>
        <div className="pay block">
          <label>Pay (Per Hour)</label>
          <SingleThumbRangeSlider />
        </div>
        <div className="occupation block">
          <label htmlFor="frm-occupation">Occupation</label>
          <input id="frm-occupation" type="text" name="title" required className="no-margin-front" />
        </div>
        <div className="description block">
          <label htmlFor="frm-description">Job Description</label>
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
