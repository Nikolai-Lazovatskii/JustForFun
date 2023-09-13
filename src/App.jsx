import ClipboardJS from "clipboard";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const symbols =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const [currentSymbols, setCurrentSymbols] = useState(
    Array(20).fill("#".repeat(20))
  );

  const mouseMoveHandler = () => {
    let newSymbols = currentSymbols.map(() => {
      let newRow = "";
      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        newRow += symbols[randomIndex];
      }
      return newRow;
    });
    setCurrentSymbols(newSymbols);
  };

  useEffect(() => {
    const clipboard = new ClipboardJS(".copyButton", {
      text: function () {
        return currentSymbols.join("\n");
      },
    });

    clipboard.on("success", function (e) {
      console.log("Successfully copied:", e.text);
      e.clearSelection();
    });

    clipboard.on("error", function (e) {
      console.error("Error^ problems with copied", e);
    });
    
    return () => {
      clipboard.destroy()
    }
  }, [currentSymbols]);

  return (
    <div onMouseMove={mouseMoveHandler}>
      <div className="textBox">
        {currentSymbols.map((row, index) => (
          <div key={index}>
            {row.split("").map((el, i) => (
              <span key={i}>{el}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="copyContainer">
        <button className="copyButton">copy</button>
      </div>
    </div>
  );
}

export default App;
