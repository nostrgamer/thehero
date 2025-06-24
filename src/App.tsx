import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Landing } from './pages/Landing';
import { TheScriptGiven } from './pages/TheScriptGiven';
import { TimeHasValue } from './pages/TimeHasValue';
import { HeroSeeksUnderstanding } from './pages/HeroSeeksUnderstanding';
import { SameRulesForEveryone } from './pages/SameRulesForEveryone';
import './styles/globals.css';

function App() {
  const { currentStep } = useStore();

  // Scroll to top whenever the step changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <Landing />;
      case 'question-everything':
        return <TheScriptGiven />;
      case 'time-has-value':
        return <TimeHasValue />;
      case 'seek-understanding':
        return <HeroSeeksUnderstanding />;
      case 'same-rules':
        return <SameRulesForEveryone />;
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