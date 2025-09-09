import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Real Soccer</h1>
      <p className="text-lg mb-4">
        Welcome to Real Soccer, your ultimate destination for all things soccer! Whether you're a die-hard fan, a player, or just love the beautiful game, we've got you covered.
      </p>
      <p className="mb-4">
        Our platform offers:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Live fixtures and match updates</li>
        <li>Player and team statistics</li>
        <li>News and articles from the soccer world</li>
        <li>Online store for soccer gear and merchandise</li>
        <li>Community features and forums</li>
      </ul>
      <p>
        Join us in celebrating the passion of soccer!
      </p>
    </div>
  );
};

export default AboutPage;
