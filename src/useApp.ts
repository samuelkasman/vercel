import { useEffect, useState } from "react";
import { Options, Persona, Goal } from "./types";
import { Configuration, OpenAIApi } from "openai";
import { PROMPT_1, PROMPT_2, PROMPT_SAFETY, PROMPT_NEW_LINE, PROMPT_TRAINING_PLAN } from "./constants";
import { amanda, amandaLactateCurve, amandaSubsetEmpty, amandaSubsetSmall, amandaSubsetSmallest } from "./personas/amanda"
import { andreas, andreasSubsetEmpty, andreasSubsetSmall, andreasSubsetSmallest } from "./personas/andreas";
import { alina, alinaLactateCurve, alinaSubsetEmpty, alinaSubsetSmall, alinaSubsetSmallest } from "./personas/alina";
import { axel, axelSubsetEmpty, axelSubsetSmall, axelSubsetSmallest } from "./personas/axel";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_TOKEN,
});

const openai = new OpenAIApi(configuration);

export const useApp = () => {
  const sourcesArray = [
    "Smart watch",
    "Smart scale",
    "Medical data",
    "Tracker app",
  ];

  const [persona, setPersona] = useState();
  const [sources, setSources] = useState(
    new Array(sourcesArray.length).fill(false)
  );
  const [goal, setGoal] = useState<Goal>();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [promptHistory, setPromptHistory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Options>({
    model: "text-davinci-003",
    temperature: 0.05,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    best_of: 1,
    max_tokens: 256,
  });

  useEffect(() => {
    if (persona && goal && !isLoading) {
      handleCreateProgram();
    }
  }, [persona])
  

  const onPersonaChange = (e: any) => {
    setPersona(e.target.value);

    if (e.target.value === Persona.Amanda) {
      setSources([true, true, true, true]);
      setGoal(Goal.Marathon);
    }
    if (e.target.value === Persona.Andreas) {
      setSources([false, true, true, false]);
      setGoal(Goal.Endurance);
    }
    if (e.target.value === Persona.Alina) {
      setSources([false, false, true, false]);
      setGoal(Goal.BMI);
    }
    if (e.target.value === Persona.Axel) {
      setSources([true, false, false, true]);
      setGoal(Goal.Muscle);
    }
  };

  const getPersonaPrompt = () => {
    let selectedPersona = amanda;

    if (persona === Persona.Andreas) {
      selectedPersona = andreas;
    }
    if (persona === Persona.Alina) {
      selectedPersona = alina;
    }
    if (persona === Persona.Axel) {
      selectedPersona = axel;
    }

    return `1. My name is ${selectedPersona.Person.Name}, my age is ${selectedPersona.Person.Age}, my height is ${selectedPersona.Person.Height}cm, my weight is ${selectedPersona.Person.Weight}kg. `;
  };

  const getLactatePrompt = () => {
    let lactateCurve = "I do not have this data."

    if (sources[2] || sources[3]) {
      if (persona === Persona.Amanda) {
        lactateCurve = amandaLactateCurve;
      }
      if (persona === Persona.Alina) {
        lactateCurve = alinaLactateCurve;
      }
    }

    return `2. ${lactateCurve} `;
  };

  const getFitnessDataPrompt = () => {
    let selectedPersona = {"Person": {}, "Data": {}};

    if (persona === Persona.Amanda) {
      selectedPersona = amandaSubsetEmpty;
      if (sources[1]) {
        selectedPersona = amandaSubsetSmallest;
      }
      if (sources[0]) {
        selectedPersona = amandaSubsetSmall;
      }
      if (sources[3]) {
        selectedPersona = amanda;
      }
    }

    if (persona === Persona.Andreas) {
      selectedPersona = andreasSubsetEmpty;
      if (sources[1]) {
        selectedPersona = andreasSubsetSmallest;
      }
      if (sources[0]) {
        selectedPersona = andreasSubsetSmall;
      }
      if (sources[3]) {
        selectedPersona = andreas;
      }
    }

    if (persona === Persona.Alina) {
      selectedPersona = alinaSubsetEmpty;
      if (sources[1]) {
        selectedPersona = alinaSubsetSmallest;
      }
      if (sources[0]) {
        selectedPersona = alinaSubsetSmall;
      }
      if (sources[3]) {
        selectedPersona = alina;
      }
    }

    if (persona === Persona.Axel) {
      selectedPersona = axelSubsetEmpty;
      if (sources[1]) {
        selectedPersona = axelSubsetSmallest;
      }
      if (sources[0]) {
        selectedPersona = axelSubsetSmall;
      }
      if (sources[3]) {
        selectedPersona = axel;
      }
    }

    return `3. My fitness data for the last 14 days: ${JSON.stringify(selectedPersona.Data)} `;
  };

  const getGoalPrompt = () => {
    let goalMessage = "improve my BMI"

    if (goal === Goal.Endurance) {
      goalMessage = "improve my endurance";
    }
    if (goal === Goal.Marathon) {
      goalMessage = "prepare for a marathon";
    }
    if (goal === Goal.Muscle) {
      goalMessage = "gain muscle";
    }

    return `4. My fitness goal is to ${goalMessage}. `;
  };

  const handleCreateProgram = async () => {
    setIsLoading(true);
    let prompt_history = "";

    // First set of questions
    // works better if sent together (ai doesnt make up things in advance)
    const response = await openai.createCompletion({
      prompt: PROMPT_1 + PROMPT_2 + PROMPT_SAFETY,
      echo: true,
      ...options,
    });
    prompt_history += (response.data.choices[0].text || "");

    // Send the persona data
    const personaPrompt = getPersonaPrompt();
    const response2 = await openai.createCompletion({
      prompt: PROMPT_NEW_LINE + personaPrompt + PROMPT_SAFETY,
      echo: true,
      ...options
    });
    prompt_history += (response2.data.choices[0].text || "");

    // Send the lactate data
    const lactatePrompt = getLactatePrompt();
    const response3 = await openai.createCompletion({
      prompt: PROMPT_NEW_LINE + lactatePrompt + PROMPT_SAFETY,
      echo: true,
      ...options
    });
    prompt_history += (response3.data.choices[0].text || "");

    // Send the fitness data
    const fitnessDataPrompt = getFitnessDataPrompt();
    const response4 = await openai.createCompletion({
      prompt: PROMPT_NEW_LINE + fitnessDataPrompt + PROMPT_SAFETY,
      echo: true,
      ...options
    });
    prompt_history += (response4.data.choices[0].text || "");

    // Send the fitness goal
    const goalPrompt = getGoalPrompt();
    const response5 = await openai.createCompletion({
      prompt: PROMPT_NEW_LINE + goalPrompt + PROMPT_SAFETY,
      echo: true,
      ...options
    });
    prompt_history += (response5.data.choices[0].text || "");

    // Ask for the fitness plan
    const response6 = await openai.createCompletion({
      prompt: PROMPT_NEW_LINE + PROMPT_TRAINING_PLAN,
      echo: false, // do not echo previous conversation
      model: "text-davinci-003",
      temperature: 0.7, // get nicer answer
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      best_of: 1,
      max_tokens: 2048, // get longer answer
    });
    prompt_history += (response6.data.choices[0].text || "");

    setResult(response6.data.choices[0].text || "")
    setPromptHistory(prompt_history);
    console.log("full conversation:", prompt_history);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await openai.createCompletion({
      prompt: `${promptHistory} \n\n ${prompt} `,
      echo: false,
      ...options,
    });

    setResult(response.data.choices[0].text || "");
    setPromptHistory((prev) => `${prev} \n ${response.data.choices[0].text || ""}`);
    console.log("full conversation:", promptHistory);
    setIsLoading(false);
  };

  return {
    persona,
    prompt,
    setPrompt,
    result,
    setResult,
    setOptions,
    isLoading,
    onPersonaChange,
    handleSubmit,
  }
}