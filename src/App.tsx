import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { useSessionTimeout } from './hooks/useSessionTimeout';
import { Landing } from './pages/Landing';
import { TheScriptGiven } from './pages/TheScriptGiven';
import { TimeHasValue } from './pages/TimeHasValue';
import { HeroSeeksUnderstanding } from './pages/HeroSeeksUnderstanding';
import { SameRulesForEveryone } from './pages/SameRulesForEveryone';
import { HerosTriumph } from './pages/HerosTriumph';
import './styles/globals.css';

function App() {
  const { currentStep } = useStore();
  
  // Initialize session timeout management
  useSessionTimeout();

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
      case 'hero-triumph':
        return <HerosTriumph />;
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