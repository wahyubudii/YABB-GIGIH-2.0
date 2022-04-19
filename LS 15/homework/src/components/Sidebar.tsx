import React, { useEffect, useState } from 'react'
import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon, HeartIcon} from '@heroicons/react/outline'
import axios from 'axios'
import { BASE_URL, PLAYLIST, USER, CURRENT_USER, TRACKS } from '../config/urlApi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../app/store'

function Sidebar() {
    const { token } = useSelector((state: RootState) => state.token)
    const [userDetails, setUserDetails] = useState<any>([])
    const [playlists, setPlaylist] = useState([])

    useEffect(() => {
        if (token) {
            getUserDetails(token)
            getPlaylist(token)
        }
    }, [])

    const getUserDetails = async (token) => {
        try {
          const { data } = await axios.get(`${CURRENT_USER}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          setUserDetails(data)
        } catch (error) {
          console.log(error)
        }
    }

    const getPlaylist = async (token) => {
        try {
            const { data } = await axios.get(BASE_URL + USER + `/${userDetails.id}` + PLAYLIST, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPlaylist(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4'>

                <Link to="/home">
                    <button className='flex items-center space-x-2 hover:text-white'>
                        <HomeIcon className='h-5 w-5'/>
                        <p>Home</p>
                    </button>
                </Link>

                <button className='flex items-center space-x-2 hover:text-white' >
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5'/>
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                <Link to="/create-playlist">
                    <button className='flex items-center space-x-2 hover:text-white'>
                        <PlusCircleIcon className='h-5 w-5'/>
                        <p>Create Playlist</p>
                    </button>
                </Link>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5'/>
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5'/>
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {/* Playlist */}
                {/* {playlists.map((playlist, index) => {
                    return (
                        <p className='hover:text-white'>{playlist.items[index].name}</p>
                    )
                })} */}
                <p className='hover:text-white'>⭐ 2016 Playlist Top</p>
                <p className='hover:text-white'>❤️ 2017 Playlist Top</p>
                <p className='hover:text-white'>🎈 2018 Playlist Top</p>
                <p className='hover:text-white'>👍 2019 Playlist Top</p>
                <p className='hover:text-white'>🎶 2020 Playlist Top</p>
                <p className='hover:text-white'>😶‍🌫️ 2021 Playlist Top</p>
                <p className='hover:text-white'>🤍 2022 Playlist Top</p>
            </div>
        </div>
    )
}

export default Sidebar