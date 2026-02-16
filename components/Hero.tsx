import React from 'react';

const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-coffee-100">
      {/* Abstract Coffee Stain Background Shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-coffee-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-coffee-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center">
            <div className="bg-coffee-950 p-6 rounded-full shadow-2xl border-4 border-coffee-400">
                <i className="fas fa-mug-hot text-6xl text-coffee-100"></i>
            </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-coffee-950 mb-4 tracking-tight drop-shadow-sm font-hand">
          Moose Studios
        </h1>
        <p className="text-xl md:text-2xl text-coffee-700 font-light mb-8 max-w-2xl mx-auto">
          Brewing pixel-perfect adventures with a dash of caffeine and a whole lot of heart.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#games"
            onClick={(e) => handleScrollTo(e, '#games')}
            className="px-8 py-4 bg-coffee-800 text-coffee-50 rounded-full font-bold text-lg hover:bg-coffee-900 transition-all transform hover:-translate-y-1 shadow-lg border-2 border-coffee-800 cursor-pointer"
          >
            Play Our Games
          </a>
          <a
            href="#brew"
            onClick={(e) => handleScrollTo(e, '#brew')}
            className="px-8 py-4 bg-transparent text-coffee-900 border-2 border-coffee-900 rounded-full font-bold text-lg hover:bg-coffee-900 hover:text-white transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            Brainstorm Brew
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;