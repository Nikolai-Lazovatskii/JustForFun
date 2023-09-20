import ClipboardJS from "clipboard";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  // Define the set of characters to be used
  const symbols =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  // Initialize state for the matrix of symbols, filling it with '#'
  const [currentSymbols, setCurrentSymbols] = useState(
    Array(20).fill("#".repeat(20))
  );

  // Handler for the mouse move event to update the symbols
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
    // Initialize clipboard to handle copy functionality
    const clipboard = new ClipboardJS(".copyButton", {
      text: function () {
        return currentSymbols.join("\n");
      },
    });

    // Log success message when copy is successful
    clipboard.on("success", function (e) {
      console.log("Successfully copied:", e.text);
      e.clearSelection();
    });

    // Log error message when copy fails
    clipboard.on("error", function (e) {
      console.error("Error^ problems with copied", e);
    });
    
    // Cleanup clipboard listener when component is unmounted
    return () => {
      clipboard.destroy()
    }
  }, [currentSymbols]);

  return (
    <div onMouseMove={mouseMoveHandler}>
      <div className="textBox">
        {/* Map through current symbols and display them */}
        {currentSymbols.map((row, index) => (
          <div key={index}>
            {row.split("").map((el, i) => (
              <span key={i}>{el}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="copyContainer">
        {/* Button to trigger copy functionality */}
        <button className="copyButton">copy</button>
      </div>
    </div>
  );
}

export default App;

