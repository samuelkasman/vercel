import RCSlider from 'rc-slider';

import './Slider.scss';

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

export const Slider = ({ label, min, max, step, onChange, value }: Props) => {
  const handleChange = (value: number | number[]) => {
    if (!Array.isArray(value)) {
      onChange(value);
    }
  };

  return <div className="slider">
    <div className="label">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="slider-container">
      <RCSlider value={value} min={min} max={max} step={step} onChange={handleChange} />
    </div>
  </div>;
};
