import './index.css';
import { useActivityFeed } from './hooks/useActivityFeed';

function App() {
  useActivityFeed();

  return (
    <div className="min-h-screen bg-bg text-text-primary font-mono flex items-center justify-center">
      <h1 className="text-accent text-2xl font-bold">OpenCourier</h1>
    </div>
  );
}

export default App;
