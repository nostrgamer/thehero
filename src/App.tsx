import React from 'react';
import { useStore } from './store/useStore';
import { Landing } from './pages/Landing';
import { TheScriptGiven } from './pages/TheScriptGiven';
import './styles/globals.css';

function App() {
  const { currentStep } = useStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <Landing />;
      case 'question-everything':
        return <TheScriptGiven />;
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