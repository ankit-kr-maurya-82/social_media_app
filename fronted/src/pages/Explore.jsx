import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./CSS/Explore.css";

const exploreData = [
  {
    id: 1,
    type: "image",
    src: "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg",
  },
  {
    id: 2,
    type: "video",
    src: "https://videos.pexels.com/video-files/2436088/2436088-hd_1920_1080_30fps.mp4",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  },
  {
    id: 4,
    type: "image",
    src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 5,
    type: "image",
    src: "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg",
  },
  {
    id: 6,
    type: "video",
    src: "https://videos.pexels.com/video-files/2436088/2436088-hd_1920_1080_30fps.mp4",
  },
  {
    id: 7,
    type: "image",
    src: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  },
  {
    id: 8,
    type: "image",
    src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];

const Explore = () => {
  const [activeMedia, setActiveMedia] = useState(null);

  return (
    <div className="explore-container">
      <div className="explore-grid">
        {exploreData.map((item) => (
          <div
            key={item.id}
            className="explore-item"
            onClick={() => setActiveMedia(item)}
          >
            {item.type === "image" ? (
              <img src={item.src} alt="explore" />
            ) : (
              <video src={item.src} muted />
            )}
          </div>
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {activeMedia && (
        <div
          className="explore-modal"
          onClick={() => setActiveMedia(null)}
        >
          <button className="explore-close">
            <FaTimes />
          </button>

          {activeMedia.type === "image" ? (
            <img
              src={activeMedia.src}
              alt="fullscreen"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={activeMedia.src}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
