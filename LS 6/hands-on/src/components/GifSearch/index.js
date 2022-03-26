import React, { useState } from 'react'

export default function GifSearch({urlLink, gifName, props}) {
    const [urlGif, setUrlGif] = useState(urlLink)
    const [status, setStatus] = useState(false)

    var gifTitle = gifName

    const handleSubmit = (event) => {
        event.preventDefault()
        setUrlGif(event.target[0].value)
        setStatus(true)
        event.target[0].value = ""
        console.log(props)
    }

    if(status) {
        gifTitle = ""
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center text-slate-600 text-lg space-x-4'>
                    <input type="text" placeholder="Masukkan url link gif disini" className='p-2 w-80'/>
                    <input type="submit" className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded hover:bg-blue-500 hover:text-white hover:border-transparent" />
                </div>
            </form>
            <div className='pb-6'>
                <img src={urlGif} className="mt-6 w-80"/>
                <h1 className='pt-4 text-lg'>{gifTitle}</h1>
            </div>
        </>
    )
}
