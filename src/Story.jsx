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

  const tot = stories.length;   // FIXED

  return (
    <div className='story d-flex column-gap-2'>
      {stories.length > 0 ? (
        stories.map((items) => (
          <div
            key={items.id}
            className='mx-1'
            onClick={() => navigate(`/story/${items.id}/${tot}`)} // FIXED
          >
            <div className='gradient-border'>
              <img
                src={items.profilePic}
                alt="dp"
                className='story-dp rounded-circle'
              /> 
            </div>
            <p className='text-truncate' style={{width:"50px"}}>
              {items.username}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Stories;
