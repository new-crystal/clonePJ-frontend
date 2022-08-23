import Router from "./shared/Router";
// import { socketContext, socket } from "./service/socket";

function App() {
  return (
    <div>
      {/* <socketContext.Provider value={socket}> */}
        <Router />
      {/* </socketContext.Provider> */}
    </div>
  );
}

export default App;
