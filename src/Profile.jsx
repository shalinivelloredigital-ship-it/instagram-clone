import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/Profile')
      .then(res => {
        setProfile(res.data[0]); 
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function HandleOnchange(e){
    setProfile(prev =>({...prev,[e.target.name]:e.target.value}))
  }

const HandleUpadate = () => {
  axios.patch(`http://localhost:3000/Profile/${profile.id}`, profile)
    .then(() => console.log("Profile Updated"))
    .catch(err => console.log(err));
};

    

  return (
    <div>
      {profile ? (
        <div className='m-5'>
          <img src={profile.profilePic} className='profile rounded-circle my-2'/>
          <h5>{profile.username}</h5>
          <input type="text"
          value={profile.username}
          name='username'
          className='form-control my-4'
          onChange={HandleOnchange}
          />

          <input type="text"
          value={profile.profilePic}
          name='profilePic'
          className='form-control'
          onChange={HandleOnchange}
          />

          <button className="btn btn-primary my-4" 
          onClick={HandleUpadate}>Update</button>
          </div>
          
      ) : (
        <div>Profile Loading...</div>
      )}
    </div>
  );
}

export default Profile;
