import React from 'react';
import type { Resource } from '../types';

const ResourceDetail: React.FC<{ resource: Resource; onBack: () => void }> = ({ resource, onBack }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
        <button onClick={onBack} className="flex items-center text-brand-green font-semibold mb-6 hover:text-brand-light-green transition-colors group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Resources
        </button>

      <div className="mb-6 pb-4 border-b">
        <span className={`inline-block px-3 py-1 text-sm font-semibold ${resource.textColor} ${resource.color} rounded-full mb-3`}>{resource.category}</span>
        <h1 className="text-4xl font-bold text-brand-green">{resource.title}</h1>
      </div>

      <div className="prose max-w-none text-gray-700">
        <p className="lead text-lg">{resource.introduction}</p>
        
        <h3 className="text-2xl font-bold text-brand-green mt-8 mb-4">Key Benefits</h3>
        <ul className="space-y-2">
            {resource.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{benefit}</span>
                </li>
            ))}
        </ul>

        {resource.materials && (
             <>
                <h3 className="text-2xl font-bold text-brand-green mt-8 mb-4">What You'll Need</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {resource.materials.map((material, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                            {material}
                        </div>
                    ))}
                </div>
            </>
        )}

        <h3 className="text-2xl font-bold text-brand-green mt-8 mb-4">Step-by-Step Guide</h3>
        <div className="space-y-6">
            {resource.steps.map((step, index) => (
                <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl mr-5">
                        {index + 1}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-brand-green">{step.title}</h4>
                        <p>{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
       <style>{`
            @keyframes fade-in {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default ResourceDetail;
