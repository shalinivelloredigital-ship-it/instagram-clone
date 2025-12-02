import React, { useEffect, useState } from 'react'

function Suggestions() {

 const[profile, setProfile]=useState(null);
 const[suggestion, setSuggestions]= useState([]);

 useEffect(()=>{
  fetch('http://localhost:3000/Profile')
  .then(data =>data.json())
  .then(data =>setProfile(data))
  .catch(err => console.log(err))

  fetch('http://localhost:3000/Suggestion')
  .then(data =>data.json())
  .then(data =>setSuggestions(data))
  .catch(err => console.log(err))

 },[])


  return (
  <div className='position-fixed'>
    <div className="Suggestion m-4">
    {profile ?
      <div className='d-flex'>
          <img className="dp rounded-circle"src={profile[0].profilePic} alt="profile pic" />
          <h5>{profile[0].username}</h5>
          <p className='ms-auto text-primary'><small>Switch</small></p>
        </div>
                    :
                    <div>Loading</div>}
                    <div className='d-flex'>
                      <p>Suggested for you</p>
                      <b className='ms-auto'>See All</b>
                    </div>
                    {suggestion.length>0 ?(
            <div>{suggestion.map((item)=>(
                <div className="m-2"key={item.id}>
                    <div className='d-flex'>
                        <img className="dp rounded-circle"src={item.profilePic} alt="profile pic" />
                        <h5>{item.username}</h5>
                        <p className='text-primary ms-auto'>Follow</p>

                    </div>
                </div>
            ))}</div>
        ):(
            <div>Loading</div>

        )}
    </div>

                    
  </div>
  )
}

export default Suggestions