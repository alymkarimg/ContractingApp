import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Calendar as RBC, DateLocalizer, momentLocalizer, Views } from 'react-big-calendar';
import { IJob } from '@/interfaces/job.interface';

const mLocalizer = momentLocalizer(moment);

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */

export default function Calendar({ localizer = mLocalizer, data, ...props }: { localizer?: typeof DateLocalizer; data: IJob[] }) {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const [myEvents, setMyEvents] = useState<IJob[]>([]);

  const handleSelectEvent = useCallback((event: IJob) => window.alert(`Book ${event.title}`), []);

  useEffect(() => {
    if (data) {
      const adjEvents = data.map((it, ind) => ({
        ...it,
        isResizable: ind % 2 === 0,
        isDraggable: ind % 2 === 0,
        id: it._id,
        start: new Date(it.datetime__start!),
        end: new Date(it.datetime__end!),
        allDay: false,
      }));

      setMyEvents(adjEvents);
    }
  }, [data]);

  const eventPropGetter = useCallback(
    (event: { start: Date }) => ({
      ...(new Date(event.start) < new Date() && {
        className: 'calender__past-event',
      }),
    }),
    []
  );

  const Key = () => {
    return (
      <ul className="calender__key">
        <li>
          <span className="square calender__past-event--key"></span>
          <span>Past event</span>
        </li>
        <li>
          <span className="square calender__current-event--key"></span>
          <span>Current Event</span>
        </li>
      </ul>
    );
  };

  return (
    <div className="calendar__wrapper" {...props}>
      <Key />
      <RBC
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        showMultiDayTimes
        step={30}
        views={[Views.WEEK]}
        tooltipAccessor={(event: IJob) => `${event.title}`}
        titleAccessor={(event: IJob) => event.title}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
        resizable
      />
    </div>
  );
}
