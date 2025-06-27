import { useState } from 'react';
import { Reference } from '../../types';

interface ReferencesProps {
  references: Reference[];
  className?: string;
}

export const References = ({ references, className = '' }: ReferencesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!references || references.length === 0) {
    return null;
  }

  const getTypeIcon = (type: Reference['type']) => {
    switch (type) {
      case 'study': return '📊';
      case 'data': return '📈';
      case 'article': return '📰';
      case 'calculation': return '🧮';
      case 'source': return '📚';
      default: return '🔗';
    }
  };

  const getTypeBadgeColor = (type: Reference['type']) => {
    switch (type) {
      case 'study': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'data': return 'bg-green-100 text-green-800 border-green-200';
      case 'article': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'calculation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'source': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`mt-12 border-t border-gray-600/30 pt-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left mb-4 hover:opacity-80 transition-opacity"
        >
          <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
            📚 References & Supporting Data
            <span className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
              {references.length}
            </span>
          </h3>
          <div className="text-gray-400 text-xl">
            {isExpanded ? '−' : '+'}
          </div>
        </button>

        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top duration-200">
            {references.map((reference) => (
              <div
                key={reference.id}
                className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 hover:border-gray-500/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0 mt-1">
                    {getTypeIcon(reference.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-semibold text-gray-200 leading-tight">
                        {reference.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border flex-shrink-0 ${getTypeBadgeColor(reference.type)}`}>
                        {reference.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                      {reference.description}
                    </p>
                    {reference.url && !reference.url.startsWith('#') && (
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        View Source
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 