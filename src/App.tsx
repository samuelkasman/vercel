import "./App.scss";
import { Loader } from "./Loader";
import { Persona } from "./types";
import { amanda } from "./personas/amanda";
import amandaImg from "./img/amanda.png";
import { andreas } from "./personas/andreas";
import andreasImg from "./img/andreas.png";
import { alina } from "./personas/alina";
import alinaImg from "./img/alina.png";
import { axel } from "./personas/axel";
import axelImg from "./img/axel.png";
import creativedock from "./img/creativedock.png";
import trainer from "./img/trainer.png";
import { useApp } from "./useApp";

function App() {
  const {
    persona,
    result,
    prompt,
    setPrompt,
    isLoading,
    onPersonaChange,
    handleSubmit,
  } = useApp();

  return (
    <div className="wrapper">
      <div className="header">
        <img src={trainer} alt="trainer" />
        <img src={creativedock} alt="creativedock" />
      </div>

      <section>
        <div className="formWrapper">
          <div className="inputWrapper">
            <input
              className="hideInput"
              type="radio"
              id="amanda"
              name="persona"
              value="amanda"
              checked={persona === Persona.Amanda}
              onChange={onPersonaChange}
            />
            <label
              htmlFor="amanda"
              className={`inputLabel ${
                persona === Persona.Amanda ? "active" : ""
              } `}
            >
              <img src={amandaImg} alt="amanda" />
              <div className="persona name">{amanda.Person.Name}</div>
              <div className="persona stats">
                {amanda.Person.Age} - {amanda.Person.Height}cm -{" "}
                {amanda.Person.Weight}kg
              </div>
              <div className="persona dataSource">Smart watch data</div>
              <div className="persona goal">Wants to run a marathon</div>
            </label>
          </div>

          <div className="inputWrapper">
            <input
              className="hideInput"
              type="radio"
              id="andreas"
              name="persona"
              value="andreas"
              checked={persona === Persona.Andreas}
              onChange={onPersonaChange}
            />
            <label
              htmlFor="andreas"
              className={`inputLabel ${
                persona === Persona.Andreas ? "active" : ""
              } `}
            >
              <img src={andreasImg} alt="andreas" />
              <div className="persona name">{andreas.Person.Name}</div>
              <div className="persona stats">
                {andreas.Person.Age} - {andreas.Person.Height}cm -{" "}
                {andreas.Person.Weight}kg
              </div>
              <div className="persona dataSource">Smart scale data</div>
              <div className="persona goal">Wants to improve endurance</div>
            </label>
          </div>

          <div className="inputWrapper">
            <input
              className="hideInput"
              type="radio"
              id="alina"
              name="persona"
              value="alina"
              checked={persona === Persona.Alina}
              onChange={onPersonaChange}
            />
            <label
              htmlFor="alina"
              className={`inputLabel ${
                persona === Persona.Alina ? "active" : ""
              } `}
            >
              <img src={alinaImg} alt="alina" />
              <div className="persona name">{alina.Person.Name}</div>
              <div className="persona stats">
                {alina.Person.Age} - {alina.Person.Height}cm -{" "}
                {alina.Person.Weight}kg
              </div>
              <div className="persona dataSource">Medical data</div>
              <div className="persona goal">Wants to improve BMI</div>
            </label>
          </div>

          <div className="inputWrapper">
            <input
              className="hideInput"
              type="radio"
              id="axel"
              name="persona"
              value="axel"
              checked={persona === Persona.Axel}
              onChange={onPersonaChange}
            />
            <label
              htmlFor="axel"
              className={`inputLabel ${
                persona === Persona.Axel ? "active" : ""
              } `}
            >
              <img src={axelImg} alt="axel" />
              <div className="persona name">{axel.Person.Name}</div>
              <div className="persona stats">
                {axel.Person.Age} - {axel.Person.Height}cm -{" "}
                {axel.Person.Weight}kg
              </div>
              <div className="persona dataSource">Tracker app data</div>
              <div className="persona goal">Wants to gain muscle</div>
            </label>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="editor">
            <div className="content">
              <textarea
                className="result"
                placeholder=""
                value={result}
                readOnly
                // onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="sendMessageWrapper">
                <input
                  type="text"
                  className="message"
                  placeholder=""
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  disabled={isLoading}
                  className="submit"
                  onClick={handleSubmit}
                >
                  {isLoading ? <Loader /> : "Send"}
                </button>
              </div>
            </div>
          </div>

          {/* <div className="sidebar">
            <div className="content">
              <Sidebar options={options} onChange={handleOptionsChange} />
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default App;
