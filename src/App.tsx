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
import onrunning from "./img/onrunning.jpeg";
import { useApp } from "./useApp";

function App() {
  const {
    persona,
    chat,
    setPrompt,
    message,
    setMessage,
    isLoading,
    onPersonaChange,
    handleSubmit,
  } = useApp();

  return (
    <div className="wrapper">
      <div className="header">
        <img src={onrunning} alt="trainer" />
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
              disabled={isLoading}
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
            {persona === Persona.Amanda && (
              <div className={`overlay ${isLoading ? "isLoading" : ""}`}>
                <Loader />
              </div>
            )}
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
              disabled={isLoading}
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
            {persona === Persona.Andreas && (
              <div className={`overlay ${isLoading ? "isLoading" : ""}`}>
                <Loader />
              </div>
            )}
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
              disabled={isLoading}
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
            {persona === Persona.Alina && (
              <div className={`overlay ${isLoading ? "isLoading" : ""}`}>
                <Loader />
              </div>
            )}
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
              disabled={isLoading}
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
            {persona === Persona.Axel && (
              <div className={`overlay ${isLoading ? "isLoading" : ""}`}>
                <Loader />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="section-2">
        <div className="container">
          <div className="editor">
            <div className="content">
              {/* <textarea
                className="result"
                placeholder=""
                value={result}
                readOnly
              /> */}

              <div className="chat">
                {chat.map((message: string, index: number) => (
                  <div key={index} className="chatMessage">
                    <div className="chatImage">
                      {index % 2 === 0 ? (
                        <>
                          <img src={onrunning} alt="trainer" />
                        </>
                      ) : (
                        <>
                          {persona === Persona.Amanda && (
                            <img src={amandaImg} alt="amanda" />
                          )}
                          {persona === Persona.Andreas && (
                            <img src={andreasImg} alt="andreas" />
                          )}
                          {persona === Persona.Alina && (
                            <img src={alinaImg} alt="alina" />
                          )}
                          {persona === Persona.Axel && (
                            <img src={axelImg} alt="amanda" />
                          )}
                        </>
                      )}
                    </div>
                    <div className="chatText">{message}</div>
                  </div>
                ))}
                <div id="chat-bottom"></div>
              </div>

              <div className="sendMessageWrapper">
                <input
                  type="text"
                  className="message"
                  placeholder="Refine your training program by chatting with the trainer here"
                  value={message}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    setMessage(e.target.value);
                  }}
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
