import React from 'react';
import MenuContainer from './containers/MenuContainer'
import './App.css';

function App() {
  let mainContainer;

  const resizeGrid = () => {
    try {
      const containerWidth = window.getComputedStyle(mainContainer).getPropertyValue("width").slice(0, -2);
      const scaleFactor = parseInt(containerWidth) / 600;
      const gameGrid = document.querySelector("#game-grid");
      const gameContainer = document.querySelector("#game-container");
      if (scaleFactor < 1) {
        gameGrid.style.transform = `scale(${scaleFactor})`;
        gameContainer.style.gridTemplateRows = `${containerWidth}px 1fr`;
        gameContainer.style.marginLeft = "";
      } else {
        gameGrid.style.transform = "";
        gameContainer.style.marginLeft = `${(containerWidth - 600) / 2}px`;
        gameContainer.style.gridTemplateRows = "600px 1fr";
      }
    } catch(e) {}
  }

  window.onresize = () => {
    // resize the game grid
    resizeGrid();
    
  }
  return (

    <main id="main_container" ref={div => mainContainer = div}>
      {/* Psuedocoo */}
      <MenuContainer resizeGrid={resizeGrid} />
      <div id="cow-container">
        <img id="cow" className="cow-animation" src="cow.png" alt="cow" draggable="false"></img>
        <img id="speech-bubble" className="cow-animation" src="speech_bubble.png" alt="speech" draggable="false"></img>
        <p className="cow-speech" id="setup"></p>
        <p className="cow-speech" id="punchline"></p>
      </div>


    </main>

  );
}

export default App;
