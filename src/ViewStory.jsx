import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'

function ViewStory() {
    const {id} = useParams();
    const [story, setStory]=useState(null);
    const navigate = useNavigate();
     useEffect(()=>{
        // fetch the full story list to determine valid id range
        fetch(`http://localhost:3000/Story`)
          .then(res => res.json())
          .then(list => {
            const maxId = Array.isArray(list) ? list.length : 0;
            const numericId = Number(id);

            // If id is out of range, navigate home
            if (!numericId || numericId < 1 || numericId > maxId) {
              navigate('/');
              return;
            }

            // otherwise fetch the requested story
            return fetch(`http://localhost:3000/Story/${id}`)
              .then(res => {
                if (!res.ok) throw new Error('Story not found');
                return res.json();
              })
              .then(data => setStory(data))
              .catch(err => {
                console.log(err);
                navigate('/');
              });
          })
          .catch(err => {
            console.log(err);
            // fallback: try to fetch single story; if fails, go home
            fetch(`http://localhost:3000/Story/${id}`)
              .then(res => {
                if (!res.ok) throw new Error('Story not found');
                return res.json();
              })
              .then(data => setStory(data))
              .catch(() => navigate('/'));
          });
     },[id, navigate]);
  return (
    <div>
    {story ? <div className='d-flex justify-content-center align-items-center'>
      <Link to={`/story/${Number(id)-1}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
<img src={story.storyImage} alt="image" width="400px" height="700px"/>
<Link to={`/story/${Number(id)+1}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
    </div> :
    <div>Loading</div>
}
</div>

  )
}

export default ViewStory;