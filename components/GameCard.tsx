import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onViewDetails: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-coffee-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-coffee-900/10 group-hover:bg-transparent transition-colors z-10"></div>
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-coffee-100/90 backdrop-blur-md text-coffee-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {game.releaseDate}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2">
            <h3 className="text-2xl font-bold text-coffee-900 font-hand">{game.title}</h3>
            <p className="text-sm text-coffee-500 font-medium italic">{game.genre}</p>
        </div>
        
        <p className="text-coffee-700 mb-6 flex-1 leading-relaxed">
          {game.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {game.tags.map(tag => (
              <span key={tag} className="text-xs bg-coffee-50 text-coffee-600 px-2 py-1 rounded border border-coffee-200">
                #{tag}
              </span>
            ))}
          </div>
          
          <button
            onClick={() => onViewDetails(game)}
            className="block w-full text-center py-3 rounded-xl font-bold transition-all bg-coffee-800 text-white hover:bg-coffee-950 shadow-md active:scale-95"
          >
            View Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
