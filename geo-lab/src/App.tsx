import Mapgl from "./Mapgl.tsx";
import ButtonChangeTheme from "./ButtonChangeTheme.tsx";
import { MapglContextProvider } from "./MapglContext.tsx";
import { useState } from "react";

function App() {
  const [showAccidents, setShowAccidents] = useState(false);
  const [showHeatLayer, setShowHeatLayer] = useState(false);

  return (
    <MapglContextProvider>
      <div>
        <div className="buttons">
            <div className="button-items">
              <ButtonChangeTheme />
            </div>
            <div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showAccidents}
                    onChange={() => setShowAccidents(value => !value)}
                  />
                  Points
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showHeatLayer}
                    onChange={() => setShowHeatLayer(value => !value)}
                  />
                  Heatmap
                </label>
              </div>
            </div>
        </div>
        <div>
          <div style={{ height: "calc(100vh - 56px)" }}>
            <Mapgl showAccidents={showAccidents} showHeatLayer={showHeatLayer}/>
          </div>
        </div>
      </div>
    </MapglContextProvider>
  );
}

export default App;