import { CreateCompletionRequest } from 'openai/api';

export type Options = Omit<CreateCompletionRequest, 'echo' | 'prompt'>

export enum Persona {
  Amanda = "amanda",
  Andreas = "andreas",
  Alina = "alina",
  Axel = "axel",
}

export enum Goal {
  BMI = "bmi",
  Endurance = "endurance",
  Marathon = "marathon",
  Muscle = "muscle",
}