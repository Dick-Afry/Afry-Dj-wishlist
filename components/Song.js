/* eslint-disable react/prop-types */
import React from 'react'
import useSpotify from '../hooks/useSpotify'
import millisToMinSec from '../lib/millisToMinSec'

function Song({order, track}) {
    const spotifyApi = useSpotify();

    return (
        <div className='grid grid-cols-2 px-5 py-2 hover:bg-gray-900'>
        <div className='flex items-center space-x-4'>
            <p>{order + 1}</p>
            <img className='h-8 w-8' src={track.track.album.images[0].url} alt='' />
            <div>
                <p className='text-white'>{track.track.name}</p>
                <p>{track.track.artists[0].name}</p>
            </div>
        </div>
        <div>
            <p>{track.track.album.name}</p>
            <p>{millisToMinSec(track.track.duration_ms)}</p>
        </div>
    </div>
    );
}

export default Song