import { useStore } from '../../store/useStore';

export const StartOverLink = () => {
  const { userData, currentStep, resetProgress } = useStore();
  
  // Only show if user has made progress and is not on landing page
  const shouldShow = userData.completedSteps.length > 0 && currentStep !== 'landing';
  
  if (!shouldShow) return null;

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? This will reset all your progress.')) {
      resetProgress();
    }
  };

  return (
    <div className="text-center py-4">
      <button
        onClick={handleStartOver}
        className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
      >
        Start Over
      </button>
    </div>
  );
}; 