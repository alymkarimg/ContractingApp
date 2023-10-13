import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export const SingleThumbRangeSlider = (props: any) => {
  const { name, min, max, setValue, value } = props;
  return (
    <div className="pay__container">
      <RangeSlider
        onInput={(value: any) => {
          setValue(value[1]);
        }}
        defaultValue={[0, 0]}
        min={min}
        max={max}
        name={name}
        className="single-thumb"
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
      />
      <div className="pay__labels">
        <div className="pay__min">£{min}</div>
        <div className="pay__value">£{value}</div>
        <div className="pay__max">£{max}</div>
      </div>
    </div>
  );
};
