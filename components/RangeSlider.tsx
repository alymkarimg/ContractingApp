import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export const SingleThumbRangeSlider = () => {
  return <RangeSlider className="single-thumb" defaultValue={[0, 50]} thumbsDisabled={[true, false]} rangeSlideDisabled={true} />;
};
