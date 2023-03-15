/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'; 
//import { Song } from '../components/Song';
import { millisToMinSec } from '../lib/millisToMinSec'
import useSpotify from '../hooks/useSpotify'

function Songs() {
    const playlist = useRecoilValue(playlistState);

  return (
    <div className='px-6 flex flex-col space-y-1 text-gray-500 pb-28 text-xs'>
        {playlist?.tracks.items.map((track, i) => (
            <Song key={track.track.id} track={track} order={i} />
/*            <div className='grid grid-cols-2 px-5 py-2 hover:bg-gray-900'>
                <div className='flex items-center space-x-4'>
                    <p>{i + 1}</p>
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
            </div>*/
            ))}
    </div>
  );
}


function Song({order, track}) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        })
    };

    return (
        <div className='grid grid-cols-2 px-5 py-2 hover:bg-gray-900' onClick={playSong}>
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

export default Songs;