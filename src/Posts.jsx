import React, { useEffect , useState} from 'react'

function Posts() {

    const[posts , Setposts] = useState([]);
   
    useEffect(()=>{
        fetch('http://localhost:3000/Posts')
        .then((data)=>data.json())
        .then((data =>Setposts(data)))
        .catch((err =>console.log(err)))

    },[]);

  return (
    <div className="d-flex justify-content-center" >
        {posts.length>0 ?(
            <div>{posts.map((post)=>(
                <div key={post.id}>
                    <div className='d-flex'>
                        <img className="dp rounded-circle"src={post.profilePic} alt="profile pic" />
                        <h5>{post.username}</h5>

                    </div>
                    <img className='image' src={post.postImage}/>
                  <div>
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-chat"></i>
                    <i className="bi bi-send"></i>
                  </div>
                  <div>
                    <b>{post.likes}Likes</b>
                  </div>
                  {post.caption}
                </div>
            ))}</div>
        ):(
            <div>Loading Posts</div>

        )}
    </div>
  )
}

export default Posts