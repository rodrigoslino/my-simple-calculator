import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import { ActionType } from "./types";

function App() {
  const [state] = React.useContext(Context);

  const [pageLoaded, setPageLoaded] = useState(false);

  type ButtonProps = {
    children: React.ReactNode;
    type: keyof typeof ActionType;
    value?: string;
    className?: string;
  };

  const Button = ({ type, value, className, children }: ButtonProps) => {
    const [, dispatch] = React.useContext(Context);
    const actionPayload = (value && value.toString()) || children?.toString();

    const handleClick = () =>
      dispatch && dispatch({ type: ActionType[type], payload: actionPayload });

    return (
      <button className={className} onClick={handleClick}>
        {children}
      </button>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);
  ``;

  return (
    <div id="parent">
      <div className={pageLoaded ? "box-animate box" : "box"}>
        <div id="display-calculation">{(state && state.expression) || "0"}</div>
        <div id="display-second-line">
          <div id="display-equals">=</div>
          <div id="display-result">{state && state.display?.slice(0, 12)}</div>
        </div>
        <div id="buttons">
          <Button className="ce-character" type="CLEAR_ENTRY">
            CE
          </Button>
          <Button type="CLEAR">C</Button>
          <Button type="PERCENTAGE">%</Button>
          <Button className="button-right" type="OPERATOR" value="/">
            &divide;
          </Button>
          <Button type="NUMBER">7</Button>
          <Button type="NUMBER">8</Button>
          <Button type="NUMBER">9</Button>
          <Button className="button-right" type="OPERATOR" value="*">
            &times;
          </Button>

          <Button type="NUMBER">4</Button>
          <Button type="NUMBER">5</Button>
          <Button type="NUMBER">6</Button>

          <Button className="button-right" type="OPERATOR" value="-">
            &minus;
          </Button>

          <Button type="NUMBER">1</Button>
          <Button type="NUMBER">2</Button>
          <Button type="NUMBER">3</Button>
          <Button className="button-right" type="OPERATOR" value="+">
            +
          </Button>

          <Button type="SIGN">+/&minus;</Button>
          <Button type="NUMBER">0</Button>
          <Button type="DECIMAL">,</Button>
          <Button className="button-equals" type="OPERATOR" value="=">
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
