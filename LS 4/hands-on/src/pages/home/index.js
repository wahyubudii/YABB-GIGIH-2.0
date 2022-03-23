import { useState } from "react"

export default function Task() {
    const [urlGif, setUrlGif] = useState("https://i.giphy.com/media/Vh8pbGX3SGRwFDh3V0/source.gif")

    return (
        <div>
            <input type="text" placeholder="Tulis disini" className="text-slate-600 text-lg p-2" onChange={(e) => {setUrlGif(e.target.value)}}></input>
            <span>
                <button className="py-2 px-3 m-4 bg-slate-50 text-slate-600 text-lg" type="button">Cari!</button>
            </span>
            <img src={urlGif} className="pb-4" alt="linknya invalid"/>
        </div>
    )
}