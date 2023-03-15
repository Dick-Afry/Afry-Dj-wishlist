import React, { useEffect, useState } from 'react';
import {
    HomeModernIcon,
    MagnifyingGlassCircleIcon,
    BuildingLibraryIcon,
    PlusCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom'


function Sidebar() {
    const spotifyApi = useSpotify();

    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log('Sidebar 22: Val av playlist: ', playlistId)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }

    }, [session, spotifyApi]);
    
  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide pb-28'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeModernIcon className="h-5 w-5" />
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white' onClick={() => signOut()}>
                <XCircleIcon className="h-5 w-5" />
                <p>Sign Out</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassCircleIcon className="h-5 w-5" />
                <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <BuildingLibraryIcon className="h-5 w-5" />
                <p>Library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>
            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="h-5 w-5" />
                <p>Add Playlist</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>

            {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white max-w-xs'>{playlist.name }</p>
                )
            )};
        </div>
    </div>
  )
}

export default Sidebar