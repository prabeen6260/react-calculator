import "./App.css";
import React, { useReducer, useEffect } from "react";

const ACTIONS = {
  ADD_DIGIT: "addDigit",
  CLEAR_DIGIT: "clearDigit",
  OPR_DIGIT: "operationDigit",
  CALCULATE: "calculate",
  ADD_DECIMAL: "addDecimal",
  MAX_DIGITS: 22,
};

function reducer(state, action) {
  if (
    state.inputData.length >= ACTIONS.MAX_DIGITS ||
    state.displayData.length >= ACTIONS.MAX_DIGITS
  ) {
    return {
      ...state,
      finalResult: "MAX-DIGITS REACHED",
      inputData: "",
      displayData: "",
    };
  }
  switch (action.type) {
    case ACTIONS.CLEAR_DIGIT:
      return {
        inputData: "",
        displayData: "",
        finalResult: "",
      };
    case ACTIONS.ADD_DIGIT:
      let condition2 = /[0-9]/g;
      if (condition2.test(action.payload)) {
        if (state.inputData[0] === "0") {
          return {
            ...state,
            inputData: action.payload,
            displayData: action.payload,
            finalResult: "",
          };
        } else {
          return {
            ...state,
            inputData: state.inputData + action.payload,
            displayData: state.displayData + action.payload,
            finalResult: "",
          };
        }
      }
    case ACTIONS.ADD_DECIMAL:
      if (!state.inputData.includes(".")) {
        return {
          ...state,
          inputData: state.inputData + action.payload,
          displayData: state.displayData + action.payload,
          finalResult: "",
        };
      } else {
        return {
          inputData: state.inputData,
          displayData: state.displayData,
        };
      }
    case ACTIONS.OPR_DIGIT:
      // Handle consecutive operators and negative numbers
      const lastChar = state.displayData.slice(-1);
      if (/[+/*]/g.test(lastChar) && action.payload === "-") {
        return {
          ...state,
          inputData: "",
          displayData: state.displayData + action.payload,
          finalResult: "",
        };
      } else if (isNaN(lastChar) && isNaN(action.payload)) {
        return {
          ...state,
          inputData: "",
          displayData: state.displayData.slice(0, -1) + action.payload,
          finalResult: "",
        };
      } else {
        return {
          ...state,
          inputData: "",
          displayData: state.displayData + action.payload,
          finalResult: "",
        };
      }
    case ACTIONS.CALCULATE:
      try {
        const answer = eval(state.displayData);
        const result = roundToDecimal(answer, 5);
        return {
          inputData: "",
          displayData: "",
          finalResult: state.displayData + " = " + result,
        };
      } catch (e) {
        console.error("Error:", e);
        return state;
      }
    default:
      return {
        ...state,
        inputData: "",
        displayData: "",
      };
  }
}

function roundToDecimal(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(number * factor) / factor;
}

const initialState = {
  inputData: "",
  displayData: "",
  finalResult: "",
};

const numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operatorKeys = ["/", "*", "-", "+"];
const decimalKey = ["."];
const equalsKey = ["="];
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (numKeys.includes(e.key)) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: e.key });
      } else if (operatorKeys.includes(e.key)) {
        dispatch({ type: ACTIONS.OPR_DIGIT, payload: e.key });
      } else if (decimalKey.includes(e.key)) {
        dispatch({ type: ACTIONS.ADD_DECIMAL, payload: e.key });
      } else if (equalsKey.includes(e.key)) {
        dispatch({ type: ACTIONS.CALCULATE, payload: e.key });
      } else if (e.key === "Backspace") {
        dispatch({ type: ACTIONS.CLEAR_DIGIT, payload: e.key });
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [dispatch]);
  return (
    <div className="main">
      <div className="box">
        <div id="display">
          {state.displayData}
          {state.finalResult}
        </div>
        <div id="input">{state.inputData}</div>
        <div className="btns">
          <button
            id="clear"
            onClick={() => dispatch({ type: ACTIONS.CLEAR_DIGIT })}
          >
            AC
          </button>
          <button
            id="divide"
            onClick={() => dispatch({ type: ACTIONS.OPR_DIGIT, payload: "/" })}
          >
            /
          </button>
          <button
            id="multiply"
            onClick={() => dispatch({ type: ACTIONS.OPR_DIGIT, payload: "*" })}
          >
            x
          </button>
          <br />
          <button
            id="seven"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "7" })}
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "8" })}
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "9" })}
          >
            9
          </button>
          <button
            id="subtract"
            onClick={() => dispatch({ type: ACTIONS.OPR_DIGIT, payload: "-" })}
          >
            -
          </button>
          <br />
          <button
            id="four"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "4" })}
          >
            4
          </button>
          <button
            id="five"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "5" })}
          >
            5
          </button>
          <button
            id="six"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "6" })}
          >
            6
          </button>
          <button
            id="add"
            onClick={() => dispatch({ type: ACTIONS.OPR_DIGIT, payload: "+" })}
          >
            +
          </button>
          <br />
          <button
            id="one"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "1" })}
          >
            1
          </button>
          <button
            id="two"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "2" })}
          >
            2
          </button>
          <button
            id="three"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "3" })}
          >
            3
          </button>
          <br />
          <button
            id="zero"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "0" })}
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() =>
              dispatch({ type: ACTIONS.ADD_DECIMAL, payload: "." })
            }
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => dispatch({ type: ACTIONS.CALCULATE })}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
