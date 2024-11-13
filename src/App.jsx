import { useEffect, useState } from "react";
import "./App.css";
import UniversalInputFC from "./UniversalInputFC";

const App = () => {
  const [firstValue, setFirstValue] = useState(
    localStorage.getItem("firstInput") || ""
  );
  const [secondValue, setSecondValue] = useState(
    localStorage.getItem("secondInput") || ""
  );
  const [thirdValue, setThirdValue] = useState(
    localStorage.getItem("thirdInput") || ""
  );
  const [fourValue, setFourValue] = useState(
    localStorage.getItem("fourInput") || ""
  );
  const [fiveValue, setFiveValue] = useState(
    localStorage.getItem("fiveInput") || ""
  );

  const states = [
    { state: firstValue, title: "firstInput", setState: setFirstValue },
    { state: secondValue, title: "secondInput", setState: setSecondValue },
    { state: thirdValue, title: "thirdInput", setState: setThirdValue },
    { state: fourValue, title: "fourhInput", setState: setFourValue },
    { state: fiveValue, title: "fiveInput", setState: setFiveValue },
  ];

  useEffect(() => {
    const onChange = (e) => {
      const state = states.find((state) => state.title === e.key);
      state.setState(e.newValue)
    };
    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return (
    <div className="main">
      <h1 className="title">THIS IS NOT A TEST TASK</h1>
      {/* <div className="inputItems">
        <UniversalInput
          type="number"
          disabled={false}
          value={firstValue}
          onChange={(e) => setFirstValue(e?.target?.value)}
          placeholder="Number type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        <UniversalInput
          disabled={false}
          value={secondValue}
          onChange={(e) => setSecondValue(e?.target?.value)}
          placeholder="Text type"
          style={{ width: "100%" }}
          className="inputItem"
        />

        <UniversalInput
          multiline={true}
          disabled={false}
          value={thirdValue}
          onChange={(e) => setThirdValue(e?.target?.value)}
          placeholder="Text multiline type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        
        <UniversalInput
          disabled={false}
          value={fourValue}
          onChange={(e) => setFourValue(e?.target?.value)}
          mask="111-111"
          placeholder="With mask"
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
          className="inputItem"
        />
        <UniversalInput
          disabled={false}
          value={fiveValue}
          onChange={(e) => setFiveValue(e?.target?.value)}
          options={[
            { value: "first element", label: "first element" },
            { value: "second element", label: "second element" },
            { value: "third element", label: "third element" },
          ]}
          placeholder="Another type"
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
          className="inputItem"
        />
      </div> */}

      <div className="inputItems">
        <UniversalInputFC
          type="number"
          disabled={false}
          value={firstValue}
          onChange={(value) => {
            setFirstValue(value);
            localStorage.setItem("firstInput", value);
          }}
          placeholder="Number type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        <UniversalInputFC
          disabled={false}
          value={secondValue}
          onChange={(value) => {
            setSecondValue(value);
            localStorage.setItem("secondInput", value);
          }}
          placeholder="Text type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        <UniversalInputFC
          multiline={true}
          disabled={false}
          value={thirdValue}
          onChange={(value) => {
            setThirdValue(value);
            localStorage.setItem("thirdInput", value);
          }}
          placeholder="Text multiline type"
          style={{ width: "100%" }}
          className="inputItem"
        />

        <UniversalInputFC
          disabled={false}
          value={fourValue}
          onChange={(value) => {
            setFourValue(value);
            localStorage.setItem("fourInput", value);
          }}
          mask={"111-111"}
          placeholder="With mask"
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
          className="inputItem"
        />

        <UniversalInputFC
          disabled={false}
          value={fiveValue}
          onChange={(value) => {
            setFiveValue(value);
            localStorage.setItem("fiveInput", value);
          }}
          options={[
            { value: "first element", label: "first element" },
            { value: "second element", label: "second element" },
            { value: "third element", label: "third element" },
          ]}
          placeholder="Another type"
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
          className="inputItem"
        />
      </div>
    </div>
  );
};

export default App;
