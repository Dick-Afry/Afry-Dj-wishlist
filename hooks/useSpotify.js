/* eslint-disable no-undef */
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }
        }
        //console.log('useSpotify 20: session?.user?.accessToken: ' + session?.user?.accessToken)
        spotifyApi.setAccessToken(session?.user?.accessToken);



    }, [session]);
/*
    console.log('useSpotify 27: The credentials are ' + spotifyApi.getCredentials());
    console.log('The access token is ' + spotifyApi.getAccessToken());
    console.log('The refresh token is ' + spotifyApi.getRefreshToken());
    console.log('The redirectURI is ' + spotifyApi.getRedirectURI());
    console.log('The client ID is ' + spotifyApi.getClientId());
    console.log('The client secret is ' + spotifyApi.getClientSecret());
*/
    return spotifyApi;
}

export default useSpotify