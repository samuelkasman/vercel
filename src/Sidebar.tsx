import { Slider } from './Slider';

import { Options } from './types';
import { MODELS } from './constants';
import Select from 'react-select';

type Props = {
  options: Options
  onChange: (name: keyof Options) => (value: any) => void
}


export const Sidebar = ({ options, onChange }: Props) => {
  return <>
    <div>
      <div style={{ marginBottom: 30 }}>
        <label>Model</label>
        <Select<{ value: string, label: string }>
          value={{ value: options.model, label: options.model }}
          options={MODELS!}
          onChange={(newValue) => onChange('model')(newValue?.value)}
        />
      </div>
      <Slider
        label="Temperature"
        step={0.01}
        min={0}
        max={1}
        value={options.temperature!}
        onChange={onChange('temperature')}
      />
      <Slider label="Top P" step={0.01} min={0} max={1} value={options.top_p!} onChange={onChange('top_p')} />
      <Slider
        label="Frequency Penalty"
        step={0.01}
        min={0}
        max={2}
        value={options.frequency_penalty!}
        onChange={onChange('frequency_penalty')}
      />
      <Slider
        label="Presence Penalty"
        step={0.01}
        min={0}
        max={2}
        value={options.presence_penalty!}
        onChange={onChange('presence_penalty')}
      />
      <Slider
        label="Best Of"
        step={1}
        min={0}
        max={20}
        value={options.best_of!}
        onChange={onChange('best_of')}
      />
      <Slider
        label="Max tokens"
        step={1}
        min={1}
        max={2048}
        value={options.max_tokens!}
        onChange={onChange('max_tokens')}
      />
    </div>
  </>;
};
