import { useStore } from './store/useStore';
import { Landing } from './pages/Landing';
import './styles/globals.css';

function App() {
  const { currentStep } = useStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <Landing />;
      case 'question-everything':
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Question Everything</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>;
      // Add other steps as we build them
      default:
        return <Landing />;
    }
  };

  return (
    <div className="App">
      {renderCurrentStep()}
    </div>
  );
}

export default App; 