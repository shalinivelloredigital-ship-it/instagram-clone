import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'

function ViewStory() {
    const {id, tot} = useParams();
    const [story, setStory]=useState(null);
    const navigate = useNavigate();
     useEffect(()=>{
        fetch(`http://localhost:3000/Story/${id}`)
        .then(data => data.json())
        .then(data => setStory(data))
        .catch(err =>(console.log(err)))
     },[id, tot]);

     if( Number(id) >Number(tot) || Number(id)<1 ){
      navigate('/');
     }
  return (
    <div>
    {story ? <div className='d-flex justify-content-center align-items-center'>
      <Link to={`/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
<img src={story.storyImage} alt="image" width="400px" height="700px"/>
<Link to={`/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
    </div> :
    <div>Loading</div>
}
</div>

  )
}

export default ViewStory;