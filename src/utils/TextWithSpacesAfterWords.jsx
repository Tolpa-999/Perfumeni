import React from 'react';

const TextWithSpacesAfterWords = ({ text }) => {
  // Split the text into words
  const words = text.split(' ');
  
  // Group words into chunks of 30
  const groupedWords = [];
  for (let i = 0; i < words.length; i += 50) {
    groupedWords.push(words.slice(i, i + 50).join(' '));
  }

  return (
    <div className="text-left">
      {groupedWords.map((chunk, index) => (
        <p key={index} className="mb-8">
          {chunk}
        </p>
      ))}
    </div>
  );
};

export default TextWithSpacesAfterWords;
