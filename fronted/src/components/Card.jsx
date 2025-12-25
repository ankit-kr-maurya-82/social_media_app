import React, { useState } from 'react'

const Card = ({username, fullName, firstName, lastName, post, onLike, onRepost}) => {
    // console.log(username);
    const [liked, setLiked] = useState(post.isLiked);
    const [likes, setLikes] = useState(post.likesCount);

    const handleLike = () => {
      setLiked(!liked);
      setLikes(liked ? likes - 1: likes + 1);
    }
    
  return (
    <>
    <div className='border-b border-gray-200 mt-10 rounded-2xl p-4  transition ' >
        {/* User Info */}
      <div className='flex flex-col  items-left  gap-3 mb-2'>
        <div className='flex'>
          <img src={"https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg" || "/avatar.png"} 
        alt="avatar" 
        className='h-10 w-10 rounded-full object-cover' />
       <div className='ml-3 w-full px-2'>
         <h3>{post.fullName.firstName + ' '+ post.fullName.lastName}</h3>
        <h3
        className='font-semibold text-sm'
        >@{post.username}</h3>

       </div>
        </div>
        <p className='text-xs'>{post.content}</p>
        <img src="https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg" 
        alt="post" 
        className='max-h-80 w-full mb-3 rounded-xl object-cover' />
        <button 
        onClick={handleLike}
        className={`hover:text-red-500 cursor-pointer ${post.isLiked ? "text-red-500" : ""}`}
        >❤️{likes}</button>
      </div>
    </div>
    </>
  )
}



export default Card

{/* <img src="https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg" 
        alt="avatar" 
        className='h-10 w-10 rounded-full object-cover' /> */}