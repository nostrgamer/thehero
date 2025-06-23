import React from 'react';
import { useStore } from './store/useStore';
import { Landing } from './pages/Landing';
import { TheScriptGiven } from './pages/TheScriptGiven';
import { TimeHasValue } from './pages/TimeHasValue';
import './styles/globals.css';

function App() {
  const { currentStep } = useStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <Landing />;
      case 'question-everything':
        return <TheScriptGiven />;
      case 'time-has-value':
        return <TimeHasValue />;
      case 'seek-understanding':
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-4xl">A Hero Seeks Understanding - Coming Soon</h1>
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