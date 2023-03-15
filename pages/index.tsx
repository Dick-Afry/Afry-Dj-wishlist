/* eslint-disable react/react-in-jsx-scope */
import type { NextPage } from 'next'
import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'


const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Test</h1>
      <main className='flex'>
        <Sidebar/>
        <Center />
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    
    </div>
  )
}

export default Home

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}