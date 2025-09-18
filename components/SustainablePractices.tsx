import React, { useState } from 'react';
import type { Resource } from '../types';
import ResourceDetail from './ResourceDetail';

const resources: Resource[] = [
  {
    title: 'Composting 101: Black Gold for Your Crops',
    category: 'Soil Health',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    introduction: 'Turn kitchen scraps and farm waste into nutrient-rich compost. This "black gold" improves soil structure, conserves water, and drastically reduces the need for chemical fertilizers, creating a healthier ecosystem for your crops.',
    benefits: [
      'Enriches soil with vital nutrients and organic matter.',
      'Improves soil drainage in clay soils and water retention in sandy soils.',
      'Suppresses plant diseases and pests.',
      'Reduces methane emissions from landfills.'
    ],
    materials: ['A compost bin or designated pile area', 'Green materials (fruit/veg scraps, coffee grounds)', 'Brown materials (dry leaves, twigs, cardboard)', 'Water', 'A pitchfork or shovel for turning'],
    steps: [
      { title: 'Step 1: Choose Your Location', description: 'Pick a dry, shady spot near a water source for your compost pile or bin.' },
      { title: 'Step 2: Layer Your Materials', description: 'Start with a layer of brown materials, then alternate with layers of green materials. Aim for a ratio of about 3 parts brown to 1 part green.' },
      { title: 'Step 3: Add Water', description: 'Sprinkle water over the pile regularly so it has the consistency of a damp sponge. Avoid making it waterlogged.' },
      { title: 'Step 4: Turn the Pile', description: 'Every week or two, use a pitchfork to turn the pile. This aerates the mixture, which is crucial for the decomposition process.' },
      { title: 'Step 5: Harvest Your Compost', description: 'When the compost is dark, crumbly, and has an earthy smell (usually in 2-3 months), it’s ready to be used in your fields.' },
    ],
  },
    {
    title: 'DIY Natural Pesticides',
    category: 'Pest Management',
    color: 'bg-red-100',
    textColor: 'text-red-800',
    introduction: 'Create effective, non-toxic pest control solutions using common household ingredients. These natural alternatives protect your crops from pests without harming beneficial insects, your soil, or the environment.',
    benefits: [
      'Safe for pollinators like bees and butterflies.',
      'No harmful chemical residues on your food.',
      'Cost-effective and easy to make.',
      'Protects soil and water from chemical contamination.'
    ],
    materials: ['Neem oil', 'Garlic', 'Chili peppers', 'Mild liquid soap (castile soap)', 'Water', 'Spray bottle'],
    steps: [
      { title: 'Garlic-Mint Spray (for aphids, beetles)', description: 'Mince a few cloves of garlic and a handful of mint leaves. Steep in hot water overnight. Strain the mixture, add a teaspoon of soap, and pour into a spray bottle. Apply to affected plants.' },
      { title: 'Neem Oil Spray (broad-spectrum)', description: 'Mix 1-2 teaspoons of pure neem oil and 1/2 teaspoon of mild liquid soap with 1 liter of warm water. Shake well to emulsify. Spray on plant leaves (top and bottom) in the early morning or late evening.' },
      { title: 'Chili Pepper Spray (for spider mites, soft-bodied insects)', description: 'Blend 1/2 cup of fresh chili peppers with 1 cup of water, then add another liter of water. Let it sit for 24 hours, strain, add a squirt of soap, and spray carefully, avoiding contact with your skin and eyes.' },
    ],
  },
  {
    title: 'The Power of Crop Rotation',
    category: 'Yield Boosting',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    introduction: 'Crop rotation is the practice of planting different types of crops in the same area in sequenced seasons. It is a cornerstone of sustainable agriculture that naturally breaks disease cycles, deters pests, and improves soil fertility.',
    benefits: [
        'Reduces soil-borne diseases and pest infestations.',
        'Improves soil structure and fertility by alternating deep-rooted and shallow-rooted plants.',
        'Manages soil nutrient levels; for example, planting legumes replenishes nitrogen.',
        'Controls weeds by alternating crops with different planting times and growth habits.'
    ],
    steps: [
        { title: 'Step 1: Group Your Plants', description: 'Categorize your crops into families (e.g., legumes, root vegetables, leafy greens, fruit-bearing). Plants in the same family are often susceptible to the same pests and diseases.' },
        { title: 'Step 2: Create a Plan', description: 'Map out your garden beds. Plan a 3 to 4-year rotation cycle where you move each plant family to a different bed each year.' },
        { title: 'Step 3: Follow the Nutrient Cycle', description: 'A good rule of thumb is to follow heavy-feeding crops (like corn or tomatoes) with soil-building crops (like beans or peas), followed by light-feeding root crops (like carrots or onions).' },
        { title: 'Step 4: Keep Records', description: 'Maintain a simple journal or diagram of what you planted where each year. This will be invaluable for planning future rotations.' },
    ],
  },
    {
    title: 'Smart Water Conservation',
    category: 'Water Management',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    introduction: 'Implement efficient watering methods to reduce water usage, minimize soil erosion, and ensure your crops get the hydration they need, right where they need it—at the roots. Smart watering is key to resilience in a changing climate.',
    benefits: [
        'Significantly reduces water consumption and lowers water bills.',
        'Minimizes weed growth by keeping the soil surface between plants dry.',
        'Prevents fungal diseases that thrive on wet foliage.',
        'Delivers water directly to the root zone, promoting deeper root growth.'
    ],
    materials: ['Drip irrigation tubing or soaker hoses', 'Mulch (straw, wood chips, or compost)', 'Rain barrels', 'A timer for your irrigation system (optional)'],
    steps: [
        { title: 'Step 1: Water Deeply, Not Daily', description: 'Water your plants deeply but less frequently. This encourages roots to grow deeper into the soil where they are more protected from heat and drought.' },
        { title: 'Step 2: Use Drip Irrigation or Soaker Hoses', description: 'These systems deliver water slowly and directly to the base of the plants, minimizing evaporation and runoff.' },
        { title: 'Step 3: Apply a Thick Layer of Mulch', description: 'Cover the soil around your plants with a 2-3 inch layer of organic mulch. Mulch acts like a sponge, retaining moisture, suppressing weeds, and regulating soil temperature.' },
        { title: 'Step 4: Water in the Morning', description: 'Watering in the early morning is the most efficient time, as cooler temperatures and less wind mean less water is lost to evaporation.' },
    ],
  },
];

const ResourceCard: React.FC<{ resource: Resource; onSelect: (resource: Resource) => void }> = ({ resource, onSelect }) => (
  <button onClick={() => onSelect(resource)} className="text-left bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:-translate-y-1.5 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-brand-light-green">
    <div className="p-6">
      <span className={`inline-block px-3 py-1 text-xs font-semibold ${resource.textColor} ${resource.color} rounded-full mb-3`}>{resource.category}</span>
      <h3 className="text-xl font-bold text-brand-green mb-2">{resource.title}</h3>
      <p className="text-gray-600">{resource.introduction.substring(0, 100)}...</p>
    </div>
  </button>
);

const SustainablePractices: React.FC = () => {
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    if (selectedResource) {
        return <ResourceDetail resource={selectedResource} onBack={() => setSelectedResource(null)} />
    }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-green">Sustainable Farming Resources</h1>
        <p className="mt-2 text-lg text-gray-600">Grow smarter, not harder. Boost yields and protect the planet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} onSelect={setSelectedResource} />
        ))}
      </div>
    </div>
  );
};

export default SustainablePractices;