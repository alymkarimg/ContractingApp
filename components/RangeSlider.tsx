import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export const SingleThumbRangeSlider = (props: any) => {
  const { min, max, state, setState } = props;

  return (
    <div className="pay__container">
      <RangeSlider
        onInput={(value: any) => {
          setState(value);
        }}
        value={state}
        defaultValue={[0, 0]}
        min={min}
        max={max}
        className="single-thumb"
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
      />
      <div className="pay__labels">
        <div className="pay__min">£{min}</div>
        <div className="pay__value">£{state[1]}</div>
        <div className="pay__max">£{max}</div>
      </div>
    </div>
  );
};
