
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';

export const Landing = () => {
  const { setCurrentStep } = useStore();

  const handleStartJourney = () => {
    setCurrentStep('question-everything');
  };

  return (
    <div className="min-h-screen bg-black pt-safe-top pb-safe-bottom">
      {/* Hero Section */}
      <div className="relative">
        <Container className="py-12 lg:py-20">
          <div className="text-center">
            {/* Hero Question */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Are You the Hero in Your Life?
            </h1>
            
            {/* Sub-header */}
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-12 font-medium">
              Or have you given up, thinking success is only for a special few?
            </h2>
            
            {/* Hero Definition */}
            <div className="max-w-4xl mx-auto mb-12 text-left">
              <div className="border-t border-gray-600 mb-8"></div>
              
              <div className="space-y-4">
                <p className="text-gray-300 text-lg">
                  <span className="font-bold">noun</span> | he·ro | \ˈhir-ō
                </p>
                
                <p className="text-white text-lg leading-relaxed">
                  <span className="font-bold">Definition:</span> A person who takes control of their own destiny. Someone who makes conscious choices, 
                  takes responsibility for their outcomes, and refuses to be a victim of circumstances. Heroes don't wait for 
                  rescue—they rescue themselves.
                </p>
              </div>
              
              <div className="border-t border-gray-600 mt-8"></div>
            </div>

            {/* Secondary Question */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Will you live your life, rather than just watch it go by?
            </h2>

            {/* CTA Button */}
            <Button 
              onClick={handleStartJourney}
              size="lg"
              className="text-xl px-12 py-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Take the Hero's Journey
            </Button>
          </div>
        </Container>
      </div>


    </div>
  );
}; 