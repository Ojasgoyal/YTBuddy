import { useEffect, useState } from "react";
import axios from "axios";
import ConnectYouTubeCard from "./components/ConnectYouTubeCard";
import Dashboard from "./Dashboard";
import StudioLayout from "./StudioLayout";

function App() {
  const [connected, setConnected] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/status");
        setConnected(res.data.connected);
      } catch (err) {
        console.error(err);
        setConnected(false);
      }
    };

    checkAuth();
  }, []);

  if (connected === null) return null;

  if (!connected) return <ConnectYouTubeCard />;

  return (
    <StudioLayout>
      <Dashboard />
    </StudioLayout>
  );
}

export default App;
