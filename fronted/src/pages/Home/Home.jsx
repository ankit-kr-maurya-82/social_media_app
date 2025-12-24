import React from 'react'
import Card from '../../components/Card'
import dummyPosts from '../../components/dummyPosts'
import Box from '../../components/Box'


const Home = () => {
  return (
    <div className='max-w-xl mx-auto'>
       {/* <h1 className='text-2xl bg-yellow-500 text-amber-100 p-3 text-center'>Post</h1> */}
   
       <Box/>
     {dummyPosts.map((post)=> (
      <Card key={post._id} post={post} />
     ))} 
    </div>
  )
}

export default Home
