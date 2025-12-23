import React from 'react'

const Card = ({username}) => {
    // console.log(username);
    
  return (
    <>
    <div className='h-full w-fit flex gap-2 m-4 bg-amber-500 p-4 rounded-2xl'>
        <img src="https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg" alt="" className='h-[16rem] rounded-2xl' />
      <div className='flex flex-col m-3 text-zinc-50'>
        <h2>{username}</h2>
        <p className='my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequatur debitis eaque nostrum officia, expedita tempore neque placeat itaque, dolor sunt. Reprehenderit blanditiis facere sit unde voluptate nam nemo ut!</p>
      <button className='bg-amber-400 cursor-pointer rounded px-5 py-2 w-fit '>Invite</button>
      </div>
    </div>
    </>
  )
}

export default Card
