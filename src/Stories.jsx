import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/Story')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="d-flex gap-3 p-3">
      {stories.map(story => (
        <div
          key={story.id}
          style={{ cursor: 'pointer', textAlign: 'center' }}
          onClick={() => navigate(`/story/${story.id}`)}
        >
          <img
            src={story.profilePic}
            alt={story.username}
            style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #f1356d' }}
          />
          <p style={{ fontSize: '12px', marginTop: '5px' }}>{story.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Stories;
