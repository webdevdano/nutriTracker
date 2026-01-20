'use client';

import { useState } from 'react';
import { getNutrientsByCategory, getAllNutrientsAlphabetically, type NutrientInfo } from '@/lib/nutrient-data';

type Superfood = {
  name: string;
  emoji: string;
  description: string;
  nutrients: string[];
  benefits: string[];
  serving: string;
};

const SUPERFOODS: Superfood[] = [
  {
    name: "Spinach",
    emoji: "🥬",
    description: "Nutrient-dense leafy green powerhouse",
    nutrients: ["Iron", "Calcium", "Vitamin A", "Vitamin K", "Vitamin C", "Folate", "Magnesium"],
    benefits: ["Supports bone health", "Boosts immune system", "Improves eye health", "Rich in antioxidants"],
    serving: "1 cup cooked (180g)"
  },
  {
    name: "Salmon",
    emoji: "🐟",
    description: "Omega-3 rich fatty fish",
    nutrients: ["Protein", "Omega-3 Fatty Acids", "Vitamin D", "Vitamin B12", "Selenium", "Niacin"],
    benefits: ["Heart health", "Brain function", "Reduces inflammation", "High-quality protein"],
    serving: "3 oz (85g)"
  },
  {
    name: "Blueberries",
    emoji: "🫐",
    description: "Antioxidant-packed superfruit",
    nutrients: ["Vitamin C", "Vitamin K", "Fiber", "Manganese"],
    benefits: ["Brain health", "Anti-aging", "Supports heart health", "May improve memory"],
    serving: "1 cup (148g)"
  },
  {
    name: "Sweet Potato",
    emoji: "🍠",
    description: "Complex carb loaded with vitamins",
    nutrients: ["Vitamin A", "Vitamin C", "Fiber", "Potassium", "Manganese", "Vitamin B6"],
    benefits: ["Eye health", "Immune support", "Digestive health", "Stable energy"],
    serving: "1 medium (150g)"
  },
  {
    name: "Almonds",
    emoji: "🌰",
    description: "Heart-healthy nut with healthy fats",
    nutrients: ["Vitamin E", "Magnesium", "Fiber", "Protein", "Calcium", "Zinc"],
    benefits: ["Heart health", "Weight management", "Blood sugar control", "Brain function"],
    serving: "1 oz / 23 almonds (28g)"
  },
  {
    name: "Greek Yogurt",
    emoji: "🥛",
    description: "Protein-rich probiotic food",
    nutrients: ["Protein", "Calcium", "Vitamin B12", "Probiotics", "Phosphorus", "Selenium"],
    benefits: ["Gut health", "Bone strength", "Muscle building", "Immune support"],
    serving: "1 cup (245g)"
  },
  {
    name: "Quinoa",
    emoji: "🌾",
    description: "Complete protein grain alternative",
    nutrients: ["Protein", "Fiber", "Magnesium", "Iron", "Zinc", "Folate", "Manganese"],
    benefits: ["Complete protein", "Gluten-free", "Rich in minerals", "Supports digestion"],
    serving: "1 cup cooked (185g)"
  },
  {
    name: "Kale",
    emoji: "🥗",
    description: "Superfood leafy green champion",
    nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Calcium", "Iron", "Folate"],
    benefits: ["Bone health", "Anti-inflammatory", "Detoxification", "Cancer prevention"],
    serving: "1 cup raw (67g)"
  },
  {
    name: "Eggs",
    emoji: "🥚",
    description: "Complete protein with essential nutrients",
    nutrients: ["Protein", "Vitamin B12", "Vitamin D", "Selenium", "Choline", "Riboflavin"],
    benefits: ["Muscle building", "Brain health", "Eye health", "Nutrient-dense"],
    serving: "1 large egg (50g)"
  },
  {
    name: "Avocado",
    emoji: "🥑",
    description: "Healthy fat powerhouse",
    nutrients: ["Healthy Fats", "Fiber", "Potassium", "Vitamin E", "Vitamin K", "Folate"],
    benefits: ["Heart health", "Nutrient absorption", "Satiety", "Skin health"],
    serving: "1/2 avocado (100g)"
  },
  {
    name: "Broccoli",
    emoji: "🥦",
    description: "Cruciferous vegetable with cancer-fighting compounds",
    nutrients: ["Vitamin C", "Vitamin K", "Folate", "Fiber", "Potassium", "Iron"],
    benefits: ["Cancer prevention", "Bone health", "Digestive health", "Immune support"],
    serving: "1 cup chopped (91g)"
  },
  {
    name: "Chia Seeds",
    emoji: "🌱",
    description: "Tiny seeds packed with omega-3s",
    nutrients: ["Omega-3 Fatty Acids", "Fiber", "Protein", "Calcium", "Magnesium", "Phosphorus"],
    benefits: ["Heart health", "Digestive health", "Bone strength", "Blood sugar control"],
    serving: "2 tbsp (28g)"
  }
];

export default function LearnPage() {
  const [view, setView] = useState<'category' | 'alphabetical' | 'superfoods'>('category');
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientInfo | null>(null);
  const [selectedSuperfoodIndex, setSelectedSuperfoodIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const nutrientsByCategory = getNutrientsByCategory();
  const allNutrients = getAllNutrientsAlphabetically();

  // Filter nutrients based on search
  const filteredNutrients = searchQuery
    ? allNutrients.filter(n => 
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allNutrients;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Learn About Nutrients</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Comprehensive guide to macronutrients, vitamins, and minerals
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search nutrients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
      </div>

      {/* View Toggle */}
      {!searchQuery && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setView('category')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === 'category'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setView('alphabetical')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === 'alphabetical'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            A-Z Directory
          </button>
          <button
            onClick={() => setView('superfoods')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === 'superfoods'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            🌟 Superfoods
          </button>
        </div>
      )}

      {/* Content */}
      {searchQuery ? (
        // Search Results
        <div className="space-y-4">
          {filteredNutrients.length === 0 ? (
            <p className="text-sm text-zinc-500">No nutrients found matching &ldquo;{searchQuery}&rdquo;</p>
          ) : (
            filteredNutrients.map((nutrient) => (
              <NutrientCard
                key={nutrient.name}
                nutrient={nutrient}
                onClick={() => setSelectedNutrient(nutrient)}
              />
            ))
          )}
        </div>
      ) : view === 'category' ? (
        // Category View
        <div className="space-y-8">
          {Object.entries(nutrientsByCategory).map(([category, nutrients]) => (
            <div key={category}>
              <h2 className="mb-4 text-xl font-semibold tracking-tight">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nutrients.map((nutrient) => (
                  <NutrientCard
                    key={nutrient.name}
                    nutrient={nutrient}
                    onClick={() => setSelectedNutrient(nutrient)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : view === 'superfoods' ? (
        // Superfoods View
        <div>
          <div className="mb-6 rounded-xl bg-linear-to-r from-green-50 to-blue-50 p-6 dark:from-green-950/30 dark:to-blue-950/30">
            <h2 className="mb-2 text-2xl font-bold">🌟 Superfoods</h2>
            <p className="text-zinc-700 dark:text-zinc-300">
              Foods packed with multiple essential nutrients to supercharge your health
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPERFOODS.map((superfood, index) => (
              <SuperfoodCard
                key={superfood.name}
                superfood={superfood}
                onClick={() => setSelectedSuperfoodIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        // Alphabetical View
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allNutrients.map((nutrient) => (
            <NutrientCard
              key={nutrient.name}
              nutrient={nutrient}
              onClick={() => setSelectedNutrient(nutrient)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedNutrient && (
        <NutrientModal
          nutrient={selectedNutrient}
          onClose={() => setSelectedNutrient(null)}
        />
      )}

      {/* Superfood Modal */}
      {selectedSuperfoodIndex !== null && (
        <SuperfoodModal
          superfoods={SUPERFOODS}
          initialIndex={selectedSuperfoodIndex}
          onClose={() => setSelectedSuperfoodIndex(null)}
        />
      )}
    </div>
  );
}

function SuperfoodCard({ superfood, onClick }: { superfood: Superfood; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-zinc-200 p-5 text-left transition-all hover:border-green-300 hover:shadow-lg dark:border-zinc-800 dark:hover:border-green-700"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-3xl">{superfood.emoji}</span>
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
          {superfood.nutrients.length} nutrients
        </span>
      </div>
      <h3 className="mb-1 font-semibold group-hover:text-green-700 dark:group-hover:text-green-400">
        {superfood.name}
      </h3>
      <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
        {superfood.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {superfood.nutrients.slice(0, 3).map((nutrient, i) => (
          <span
            key={i}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {nutrient}
          </span>
        ))}
        {superfood.nutrients.length > 3 && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            +{superfood.nutrients.length - 3} more
          </span>
        )}
      </div>
    </button>
  );
}

function SuperfoodModal({ superfoods, initialIndex, onClose }: { superfoods: Superfood[]; initialIndex: number; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [quantity, setQuantity] = useState(1);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  
  const superfood = superfoods[currentIndex];
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? superfoods.length - 1 : prev - 1));
    setQuantity(1);
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === superfoods.length - 1 ? 0 : prev + 1));
    setQuantity(1);
  };
  
  const handleAddToGroceryList = async () => {
    try {
      const response = await fetch('/api/grocery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_name: superfood.name,
          quantity: quantity,
          category: 'Superfood'
        })
      });
      
      if (response.ok) {
        setShowAddSuccess(true);
        setTimeout(() => setShowAddSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error adding to grocery list:', error);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div className="relative flex w-full max-w-6xl items-center justify-center gap-4">
        {/* Navigation Arrows - Outside Card */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Previous superfood"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div 
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-6xl">{superfood.emoji}</span>
            <div>
              <h2 className="text-3xl font-bold">{superfood.name}</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {superfood.description}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                {currentIndex + 1} of {superfoods.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Serving Size */}
        <div className="mb-6 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
          <p className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-300">Serving Size:</span>{' '}
            <span className="text-blue-800 dark:text-blue-200">{superfood.serving}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Nutrients */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Key Nutrients</h3>
            <div className="flex flex-wrap gap-2">
              {superfood.nutrients.map((nutrient, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800 dark:bg-green-950 dark:text-green-200"
                >
                  {nutrient}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Health Benefits</h3>
            <ul className="space-y-2">
              {superfood.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Add to Grocery List Section */}
        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-lg bg-zinc-100 px-3 py-1.5 text-lg font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 rounded-lg border border-zinc-300 px-3 py-1.5 text-center dark:border-zinc-700 dark:bg-zinc-800"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-lg bg-zinc-100 px-3 py-1.5 text-lg font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  +
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToGroceryList}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Grocery List
            </button>
          </div>
          
          {showAddSuccess && (
            <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-200">
              ✓ {superfood.name} added to grocery list!
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        aria-label="Next superfood"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      </div>
    </div>
  );
}

function NutrientCard({ nutrient, onClick }: { nutrient: NutrientInfo; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-zinc-200 p-4 text-left transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-semibold group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
          {nutrient.name}
        </h3>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {nutrient.category === 'Macronutrients' ? 'Macro' : nutrient.category === 'Vitamins' ? 'Vitamin' : 'Mineral'}
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {nutrient.description}
      </p>
    </button>
  );
}

function NutrientModal({ nutrient, onClose }: { nutrient: NutrientInfo; onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{nutrient.name}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {nutrient.category}
              {nutrient.dailyValue && ` • Daily Value: ${nutrient.dailyValue}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-zinc-700 dark:text-zinc-300">{nutrient.description}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Benefits */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Health Benefits</h3>
              <ul className="space-y-2">
                {nutrient.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Food Sources */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Food Sources</h3>
              <div className="flex flex-wrap gap-2">
                {nutrient.sources.map((source, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Absorption Tips */}
            {nutrient.absorptionTips && nutrient.absorptionTips.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold">Absorption Tips</h3>
                <ul className="space-y-2">
                  {nutrient.absorptionTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Overdose Risks */}
            {nutrient.overdoseRisks && nutrient.overdoseRisks.length > 0 && (
              <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                <h3 className="mb-3 text-lg font-semibold text-red-900 dark:text-red-400">
                  ⚠️ Risks of Taking Too Much
                </h3>
                <ul className="space-y-2">
                  {nutrient.overdoseRisks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                      <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
