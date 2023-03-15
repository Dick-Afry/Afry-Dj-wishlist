/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import useSpotify from '../hooks/useSpotify';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'; 
//import { Song } from '../components/Song';
import { millisToMinSec } from '../lib/millisToMinSec'

import { useRecoilState, useRecoilValue } from 'recoil';
import { addedTrackIdState } from '../atoms/searchListAtom';
import { playlistState } from '../atoms/playlistAtom';
import {
    ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

//arrow-right-circle

function Search() {
    // const [searchList, setSearchList] = useRecoilState(searchListState);

    const [searchList, setSearchList] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState();
    const spotifyApi = useSpotify();
    let searchText = null;
    
    const getSearchTrack = event => {
        //setSearchTerm(event.target.value);
        spotifyApi.searchTracks(event.target.value).then(function(data) {
            setSearchList(data.body);
            console.log(data.body);
        }, function(err) {
            console.error(err);
        });
    };

  return (
    <div>
        <p className='text-white'>Search</p>
        <input type='search' placeholder={'search text'} value={searchTerm} onChange={getSearchTrack}/>
        
        <div>
              {searchList?.tracks?.items.map((track, i) => (
                    <SearchedSong key={track.id} track={track} order={i} />

            ))} 
        </div>
    </div>
  )
}

function SearchedSong({order, track}) {
    
    const spotifyApi = useSpotify();
//    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
//    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [addedTrackId, setAddedTrackId] = useRecoilState(addedTrackIdState);
    const playlist = useRecoilValue(playlistState);

    // .addTracksToPlaylist(host.spotifyId, host.playlistId, ["spotify:track:" + songId])

    const addTrackToPlaylist = () => {
        console.log('Track URI: ', track.uri);
        console.log('Playlist ID: ', playlist.id);
        console.log('Playlist ID: ', playlist.owner.id);

        spotifyApi.addTracksToPlaylist(playlist?.id, [String(track.uri)]).then(function(data) {
            console.log('Added tracks to playlist!');
            setAddedTrackId(track.id);
          }, function(err) {
            console.log('Something went wrong!');
            //console.log('Something went wrong!', err);
          });
    };
    /*
    spotifyApi.addTracksToPlaylist('5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });*/

    return (
        <div className='grid grid-cols-3 px-5 py-2 hover:bg-gray-900 text-xs'>
        <div className='flex items-center space-x-4'>
            <p>{order + 1}</p>
            <img className='h-8 w-8' src={track.album.images[0].url} alt='' />
            <div>
                <p className='text-white'>{track.name}</p>
                <p>{track.artists[0].name}</p>
            </div>
        </div>
        <div>
            <p>{track.album.name}</p>
            <p>{millisToMinSec(track.duration_ms)}</p>
            
        </div>
        <div className='flex shrink-0'>
            <ArrowRightCircleIcon className='button items-end fill-green-600' onClick={addTrackToPlaylist}/>
            
        </div>
    </div>
    );
}


export default Search