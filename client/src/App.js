import { useEffect, useState } from "react";
import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import AppLoader from "./components/AppLoader";

function App() {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    fakeDataFetch();
  }, []);

  return (
    <>
      <div className="App">{isloading ? <AppLoader /> : <MainRoutes />}</div>
    </>
  );
}

export default App;
