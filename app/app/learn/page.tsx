'use client';

import { useState } from 'react';
import { getNutrientsByCategory, getAllNutrientsAlphabetically, type NutrientInfo } from '@/lib/nutrient-data';

export default function LearnPage() {
  const [view, setView] = useState<'category' | 'alphabetical'>('category');
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientInfo | null>(null);
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
        </div>
      )}

      {/* Content */}
      {searchQuery ? (
        // Search Results
        <div className="space-y-4">
          {filteredNutrients.length === 0 ? (
            <p className="text-sm text-zinc-500">No nutrients found matching "{searchQuery}"</p>
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
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
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

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold">Health Benefits</h3>
          <ul className="space-y-2">
            {nutrient.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>
    </div>
  );
}
