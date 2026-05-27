import Mapgl from "./Mapgl.tsx";
import { MapglContextProvider } from "./MapglContext.tsx";

function App() {
  return (
    <MapglContextProvider>
      <div>
        <div>
          <div style={{ height: "calc(100vh - 56px)" }}>
            <Mapgl />
          </div>
        </div>
      </div>
    </MapglContextProvider>
  );
}

export default App;