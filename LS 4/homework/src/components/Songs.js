import { useEffect, useState } from "react";
import data from "../data/data";
import { milisToMinutesAndSeconds } from "../data/timeConverter";

function Songs() {
    return (
        <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>1</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>2</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>3</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>4</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>5</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>6</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>7</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>8</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>9</p>
                    <img src={data.album.images[0].url} className="h-10 w-10"/> 
                    <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">{data.album.name}</p>
                        <p className="w-40">{data.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-40 hidden md:inline truncate">{data.album.name}</p>
                    <p>{milisToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
            </div>
        </div>
    )
}

export default Songs;