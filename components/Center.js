import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import { addedTrackIdState } from '../atoms/searchListAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs';
import Search from '../components/Search'


function Center() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const addedTrackId = useRecoilValue(addedTrackIdState);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
    }).catch((err) => console.log('Center 17: Spellistan laddades inte..: ', err));
  }, [spotifyApi, playlistId, addedTrackId]);

  return (
    <div className='flex-grow text-gray-500 h-screen overflow-y-scroll scrollbar-hide'>
        <header className='absolute top-5 right-8'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 rounded-full blur'></div>
            <div className='relative flex items-center space-x-1 cursor-pointer text-white bg-black rounded-full px-2 py-2'>
                <img className='rounded-full w-8 h-8' src={session?.user?.image} alt='' />
                <h2>{session?.user?.name}</h2>
                <EllipsisVerticalIcon className='h-5 w-5 text-purple-700'/>
            </div>
          </div>
        </header>
        <div className='grid grid-cols-2'>
          <div className='flex items-start space-x-6 p-6 flex-grow h-screen overflow-y-auto scrollbar-hide'>
            <Search />
          </div>
          <div className='h-screen overflow-y-auto scrollbar-hide'>
            <section className='flex items-end space-x-6 p-6'>
              <img className='h-44 w-44 shadow-2xl rounded-lg opacity-90' src={playlist?.images?.[0]?.url} alt='' />
              <div>
                <p>PLAYLIST:</p>
                <h2 className='animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-2xl font-black font-bold'>{playlist?.name}</h2>
              </div>
              
            </section>
            <Songs/>
          </div>
        </div>
      </div>
  )
}

export default Center