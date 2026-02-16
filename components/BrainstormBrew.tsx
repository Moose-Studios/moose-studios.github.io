import React, { useState } from 'react';
import { generateGameConcept } from '../services/geminiService';
import { BrainstormResult } from '../types';

const BrainstormBrew: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrainstormResult | null>(null);
  const [formData, setFormData] = useState({
    genre: 'Platformer',
    mood: 'Cozy',
    elements: 'Coffee, Rain, Jazz'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const data = await generateGameConcept(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to brew idea. Check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="brew" className="py-24 bg-coffee-900 text-coffee-50 relative overflow-hidden">
       {/* Background Patterns */}
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#a8826b 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-hand mb-4 text-amber-500">
            <i className="fas fa-sparkles mr-3"></i>
            Brainstorm Brew
          </h2>
          <p className="text-coffee-200 text-lg max-w-2xl mx-auto">
            Stuck on a creative block? Let our AI Barista (powered by Gemini) brew up a fresh game concept for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Input Form */}
          <div className="bg-coffee-800 p-8 rounded-3xl shadow-2xl border border-coffee-700">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-coffee-200 font-bold mb-2">Game Genre</label>
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value})}
                  className="w-full bg-coffee-900 border-2 border-coffee-600 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                >
                  <option>Platformer</option>
                  <option>RPG</option>
                  <option>Simulation</option>
                  <option>Puzzle</option>
                  <option>Visual Novel</option>
                  <option>Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-coffee-200 font-bold mb-2">Mood / Vibe</label>
                <select
                  value={formData.mood}
                  onChange={(e) => setFormData({...formData, mood: e.target.value})}
                  className="w-full bg-coffee-900 border-2 border-coffee-600 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                >
                  <option>Cozy</option>
                  <option>Spooky</option>
                  <option>Chaotic</option>
                  <option>Melancholic</option>
                  <option>Energetic</option>
                </select>
              </div>

              <div>
                <label className="block text-coffee-200 font-bold mb-2">Key Ingredients (Keywords)</label>
                <input
                  type="text"
                  value={formData.elements}
                  onChange={(e) => setFormData({...formData, elements: e.target.value})}
                  className="w-full bg-coffee-900 border-2 border-coffee-600 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="e.g., Robots, Magic, Tacos"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
                    loading 
                    ? 'bg-coffee-700 text-coffee-400 cursor-wait' 
                    : 'bg-amber-500 text-coffee-900 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                }`}
              >
                {loading ? (
                  <span><i className="fas fa-spinner fa-spin mr-2"></i> Brewing...</span>
                ) : (
                  <span><i className="fas fa-mug-hot mr-2"></i> Brew Idea</span>
                )}
              </button>
            </form>
          </div>

          {/* Result Display */}
          <div className="relative min-h-[400px] flex flex-col justify-center">
             {!result && !loading && (
                 <div className="text-center text-coffee-400 opacity-50 border-2 border-dashed border-coffee-700 rounded-3xl p-12 h-full flex flex-col justify-center items-center">
                     <i className="fas fa-lightbulb text-6xl mb-4"></i>
                     <p className="text-xl">Your fresh idea will appear here.</p>
                 </div>
             )}

             {loading && (
                <div className="flex flex-col items-center justify-center h-full text-amber-500">
                    <div className="text-6xl mb-6 animate-bounce">
                        <i className="fas fa-coffee"></i>
                    </div>
                    <p className="text-2xl font-hand animate-pulse">The barista is thinking...</p>
                </div>
             )}

             {result && !loading && (
                 <div className="bg-coffee-100 text-coffee-900 rounded-3xl p-8 shadow-2xl relative animate-fade-in-up">
                     <div className="absolute -top-6 -right-6 bg-amber-500 text-coffee-900 p-4 rounded-full shadow-lg transform rotate-12">
                         <i className="fas fa-star text-2xl"></i>
                     </div>
                     
                     <h3 className="text-3xl font-bold mb-2 font-hand text-coffee-800">{result.title}</h3>
                     <p className="text-coffee-600 italic mb-6 border-b border-coffee-300 pb-4">{result.tagline}</p>
                     
                     <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-coffee-800 uppercase text-xs tracking-wider mb-1">Concept</h4>
                            <p className="leading-relaxed">{result.concept}</p>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-coffee-800 uppercase text-xs tracking-wider mb-2">Core Mechanics</h4>
                            <ul className="space-y-2">
                                {result.mechanics.map((mech, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <i className="fas fa-check-circle text-amber-600 mt-1 mr-2"></i>
                                        <span>{mech}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                     </div>
                 </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrainstormBrew;
