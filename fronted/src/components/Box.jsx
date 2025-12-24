import { useState } from "react";

const Box = () => {
    const MAX_CHARS = 280;
    const [text, setText] = useState("")
    return(
        <div className="border-b p-4 border-gray-200">
            <div className="flex gap-3">
                <img src="https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            </div>
            <textarea 
            value={text}
            onChange={(e) => {
                setText(e.target.value)
            }}
            placeholder="What's happening?"
            className="w-full outline-none resize-none text-sm"
            rows={3}/>
            <div className="text-right">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-full">Post</button>
            </div>
        </div>
    )
}

export default Box;