export default function Task({linkSource}) {
    const gif = linkSource;
    return (
        <div>
            <input type="text" placeholder="Tulis disini" className="text-slate-600 text-lg p-2"></input>
            <span>
                <button class="py-2 px-3 m-4 bg-slate-50 text-slate-600 text-lg" type="button">Cari!</button>
            </span>
            <img src={gif} className="pb-4"/>
        </div>
    )
}