import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Calendar as RBC, DateLocalizer, momentLocalizer, Views } from 'react-big-calendar';
import { IJob } from '@/interfaces/job.interface';
import { useToasts } from '../Helper';
import { getJobs } from '@/components/Helper';
import Swal from 'sweetalert2';

const mLocalizer = momentLocalizer(moment);

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */

export default function Calendar({
  unBookJob = false,
  setData,
  localizer = mLocalizer,
  data,
  ...props
}: {
  unBookJob?: boolean;
  setData: Dispatch<SetStateAction<IJob[]>>;
  localizer?: typeof DateLocalizer;
  data: IJob[];
}) {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [myEvents, setMyEvents] = useState<IJob[]>([]);

  // fire toasts if error or success is set
  useToasts(success, setSuccess, error, setError);

  const handleSelectEvent = useCallback(
    async (event: IJob) => {
      const result = unBookJob
        ? await Swal.fire({
            heightAuto: false,
            title: `Do you want to remove your booking for: ${event.title} (${moment(event.datetime__start).format('DD-MM-YYYY HH:mm')} to ${moment(
              event.datetime__end
            ).format('DD-MM-YYYY HH:mm')})?`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          })
        : await Swal.fire({
            heightAuto: false,
            title: `Do you want to book: ${event.title} (${moment(event.datetime__start).format('DD-MM-YYYY HH:mm')} to ${moment(
              event.datetime__end
            ).format('DD-MM-YYYY HH:mm')})?`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          });
      if (result.isConfirmed) {
        // remove user id from job
        try {
          const response = unBookJob ? await fetch(`../api/jobs/unbookJob?id=${event._id}`) : await fetch(`../api/jobs/bookJob?id=${event._id}`);

          if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.message);
          }

          if (response.ok) {
            // Handle response if necessary
            const data = await response.json();
            await getJobs(setData, undefined, unBookJob);
            setSuccess(data.message);
          }
        } catch (e) {
          console.log(e);
          setError((e as { message: string }).message);
        }
      } else {
        unBookJob
          ? await Swal.fire({ title: 'Job was not removed', heightAuto: false, icon: 'info' })
          : await Swal.fire({ title: 'Job was not removed', heightAuto: false, icon: 'info' });
      }
    },
    [unBookJob, setData]
  );

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
