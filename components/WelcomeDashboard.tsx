import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { LeafIcon } from './icons/LeafIcon';
import { SunIcon } from './icons/SunIcon';

const featuredGuides = [
    { title: 'Composting 101', icon: <LeafIcon className="w-6 h-6 text-yellow-600"/>, description: "Turn waste into 'black gold' for your soil." },
    { title: 'DIY Natural Pesticides', icon: <BookOpenIcon className="w-6 h-6 text-red-600"/>, description: "Protect crops without harmful chemicals." },
    { title: 'The Power of Crop Rotation', icon: <SunIcon className="w-6 h-6 text-green-600"/>, description: 'Boost yields and improve soil health naturally.' },
];

const quickTips = [
    { title: "Test Your Soil", content: "Before planting, conduct a soil test to understand its pH and nutrient levels. This allows you to amend the soil specifically for the crops you intend to grow, leading to better health and yield." },
    { title: "Mulch Generously", content: "Apply a thick layer of organic mulch around your plants. Mulching helps retain soil moisture, suppress weeds, regulate soil temperature, and add organic matter to the soil as it breaks down." },
    { title: "Use Companion Planting", content: "Some plants benefit from being grown near others. For example, planting marigolds can deter nematodes, and planting basil near tomatoes can repel tomato hornworms. Research companions for your specific crops." },
];

const AccordionItem: React.FC<{ title: string; content: string; isOpen: boolean; onClick: () => void; }> = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <h2>
                <button type="button" onClick={onClick} className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 hover:bg-green-50" aria-expanded={isOpen}>
                    <span>{title}</span>
                    <svg className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </h2>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-5 border-t-0 border-gray-200">
                    <p className="text-gray-600">{content}</p>
                </div>
            </div>
        </div>
    )
};

const WelcomeDashboard: React.FC<{onImageSelect: (file: File) => void; disabled: boolean}> = ({onImageSelect, disabled}) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const handleAccordionClick = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div className="space-y-8">
             {/* Hero Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-200 animate-fade-in-down">
                <h1 className="text-4xl font-bold text-brand-green mb-2">Welcome, Farmer!</h1>
                <p className="text-gray-600 mb-6 text-lg">Ready to analyze your crops? Let's get started.</p>
                <div className="max-w-xl mx-auto">
                    <ImageUploader onImageSelect={onImageSelect} disabled={disabled} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Guides Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in-left">
                    <h2 className="text-2xl font-bold text-brand-green mb-4">Featured Guides</h2>
                    <div className="space-y-4">
                        {featuredGuides.map((guide, index) => (
                             <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-brand-light-green transition-all duration-200">
                                <div className="flex-shrink-0 mr-4">{guide.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-brand-green">{guide.title}</h3>
                                    <p className="text-sm text-gray-600">{guide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tips Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in-right">
                    <h2 className="text-2xl font-bold text-brand-green mb-4">Quick Tips to Boost Yield</h2>
                     <div className="rounded-lg border border-gray-200">
                        {quickTips.map((tip, index) => (
                            <AccordionItem 
                                key={index}
                                title={tip.title}
                                content={tip.content}
                                isOpen={openAccordion === index}
                                onClick={() => handleAccordionClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-left {
                    0% { opacity: 0; transform: translateX(-20px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                 @keyframes fade-in-right {
                    0% { opacity: 0; transform: translateX(20px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
                .animate-fade-in-left { animation: fade-in-left 0.5s ease-out 0.2s forwards; opacity: 0; }
                .animate-fade-in-right { animation: fade-in-right 0.5s ease-out 0.4s forwards; opacity: 0; }
            `}</style>
        </div>
    )
};

export default WelcomeDashboard;
