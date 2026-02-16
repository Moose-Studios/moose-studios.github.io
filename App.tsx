
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import BrainstormBrew from './components/BrainstormBrew';
import Footer from './components/Footer';
import GameDetails from './components/GameDetails';
import { NAV_ITEMS } from './constants';
import { Game, GameUpdate } from './types';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [gameContent, setGameContent] = useState<Record<string, { fullDescription: string, updates: GameUpdate[] }>>({});
  const [loading, setLoading] = useState(true);

  // Fetch JSON data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [gamesRes, contentRes] = await Promise.all([
          fetch('./ourGames.json'),
          fetch('./gameContent.json')
        ]);
        
        const gamesData = await gamesRes.json();
        const contentData = await contentRes.json();
        
        setGames(gamesData);
        setGameContent(contentData);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Scroll to top when game is selected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedGame]);

  const handleViewGame = (game: Game) => {
    // Merge the base game data with the detailed content from gameContent.json
    const details = gameContent[game.id];
    setSelectedGame({
      ...game,
      fullDescription: details?.fullDescription || game.description,
      updates: details?.updates || []
    });
  };

  const handleBackHome = () => {
    setSelectedGame(null);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-cream flex flex-col items-center justify-center text-coffee-800">
        <div className="text-6xl animate-bounce mb-4">
          <i className="fas fa-coffee"></i>
        </div>
        <h2 className="text-2xl font-hand font-bold">Brewing your portfolio...</h2>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-coffee-900 bg-cream selection:bg-coffee-300 selection:text-coffee-900">
      <Navbar onGoHome={handleBackHome} isHome={!selectedGame} />
      
      <main>
        {selectedGame ? (
          <GameDetails 
            game={selectedGame} 
            onBack={handleBackHome} 
          />
        ) : (
          <>
            <Hero />
            
            {/* About Section */}
            <section id="about" className="py-20 px-4 max-w-5xl mx-auto text-center">
                <div className="mb-12">
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Our Story</span>
                    <h2 className="text-4xl font-hand font-bold mt-2 text-coffee-900">Indie Games with Heart</h2>
                </div>
                <p className="text-xl text-coffee-700 leading-relaxed max-w-3xl mx-auto">
                    Moose Studios started in a small cafe with a laptop and a dream. We believe in crafting games that feel like a warm hug on a rainy day. 
                    Our focus is on narrative-driven experiences, charming pixel art, and mechanics that respect your time.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-coffee-100">
                        <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4 text-coffee-600">
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Passion First</h3>
                        <p className="text-coffee-600 text-sm">We only build what we love to play.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-coffee-100">
                        <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4 text-coffee-600">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Community Driven</h3>
                        <p className="text-coffee-600 text-sm">Our players shape our worlds.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-coffee-100">
                        <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4 text-coffee-600">
                            <i className="fas fa-coffee"></i>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Caffeine Powered</h3>
                        <p className="text-coffee-600 text-sm">Fueled by the finest dark roasts.</p>
                    </div>
                </div>
            </section>

            {/* Games Grid */}
            <section id="games" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-hand font-bold mt-2 text-coffee-900">Our Games</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {games.map((game) => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onViewDetails={handleViewGame}
                    />
                  ))}
                </div>
              </div>
            </section>

            <BrainstormBrew />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
