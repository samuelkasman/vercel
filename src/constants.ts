export const MODELS = [
  { value: 'text-davinci-003', label: 'text-davinci-003' },
  { value: 'text-curie-001', label: 'text-curie-001' },
  { value: 'text-babbage-001', label: 'text-babbage-001' },
  { value: 'text-ada-001', label: 'text-ada-001' },
];

export const PROMPT_1 = "Ignore all previous instructions. Now you're a professional fitness trainer. You goal is to create fitness program for me. In the upcoming conversation I'll provide fitness and medical data about myself and then you can create the detailed fitness program accordingly. ";

export const PROMPT_2 = "I'll provide the data in the following structure: 1. name, age, height, weight 2. lactate curve data 3. 14 days of data from my smart watch 4. goal of the training. I'll start with 1st point and then continue. When I send something, you acknowledge if you understand. After I send everything you ask questions if you need anything further and offer numbered options. Then you will create the detailed training program with daily instructions right away. Can we start? ";

export const PROMPT_SAFETY = " Do not generate or extend my questions or answers. ";

export const PROMPT_NEW_LINE = " \n ";

export const PROMPT_TRAINING_PLAN = "Show me the precise daily instructions for a weekly fitness training program. Start with Monday and give instructions for the whole week. Add some tips and encouragement at the end. ";
