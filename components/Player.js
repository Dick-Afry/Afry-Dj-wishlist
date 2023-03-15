import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { debounce } from 'lodash'
import useSongInfo from '../hooks/useSongInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import {
    ArrowsRightLeftIcon,
    PauseIcon,
    PlayIcon,
    ChevronDoubleUpIcon,
    ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";


function Player() {
    const spotifyApi = useSpotify();
    const {data : session, status } = useSession();

    //låt och spelare:
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {console.log(err)});
        }, 500), []);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume],);


  return (
    <div className='h-20 bg-gradient-to-b from-black to-gray-900 text-white text-xs px-2 py-5 grid grid-cols-3'>
        <div className='flex items-center space-x-4'>
            <img className='inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt='' />
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>

        <div className='py-5 flex items-center justify-evenly'>
            <ArrowsRightLeftIcon className='button' />

            {isPlaying ? (
                <PauseIcon onClick={handlePlayPause} className='button' />
            ) : (
                <PlayIcon onClick={handlePlayPause} className='button' />
            )}
        </div>

        <div className='flex items-center space-x-2 justify-end'>
                <ChevronDoubleDownIcon 
                    onClick={() => volume > 0 && setVolume(volume-10)}
                    className='button'/>
                <input 
                    type='range' 
                    value={volume} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    min={0} max={100} />
                <ChevronDoubleUpIcon 
                    onClick={() => volume < 100 && setVolume(volume+10)}
                    className='button'/>
        </div>

    </div>
  )
}

export default Player