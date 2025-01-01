import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importing toast function

// Import the CSS for React Toastify
import 'react-toastify/dist/ReactToastify.css'; 

const ShareButton = ({ url, title }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShare = (platform) => {
    const shareData = {
      url: url,
      title: title,
    };

    // Platform-specific sharing logic
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`);
        break;
      case 'native':
        if (navigator.share) {
          navigator.share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
          // If native sharing is not available, copy the link to the clipboard
          navigator.clipboard.writeText(url)
            .then(() => {
              toast.success('Link copied to clipboard!'); // Show toast notification
            })
            .catch((error) => console.error('Error copying link to clipboard:', error));
        }
        break;
      default:
        console.error('Unsupported platform');
        break;
    }

    setShowMenu(false); // Close the menu after sharing
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="bg-[white] text-black px-4 py-2 rounded mt-2 border-black hover:bg-[#f5f5f5] transition-all duration-[.3s] "
      >
        Share
      </button>
      {showMenu && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg z-10">
          <ul className="list-none p-0 m-0 text-black font-light">
            <li className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer" onClick={() => handleShare('facebook')}>
              Facebook
            </li>
            <li className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer" onClick={() => handleShare('twitter')}>
              Twitter
            </li>
            <li className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer" onClick={() => handleShare('linkedin')}>
              LinkedIn
            </li>
            <li className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer" onClick={() => handleShare('whatsapp')}>
              WhatsApp
            </li>
            <li className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer" onClick={() => handleShare('native')}>
              Native Share / Copy Link
            </li>
          </ul>
        </div>
      )}

      {/* Add the ToastContainer to render the toast notifications */}

    </div>
  );
};

export default ShareButton;
