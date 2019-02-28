"use strict";
'use-strict';
Object.defineProperty(exports, "__esModule", { value: true });
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const currentSongRep = nodecg.Replicant('currentSong');
const SpotifyWebApi = require('spotify-web-api-node');
const clientId = nodecg.bundleConfig.clientId;
const clientSecret = nodecg.bundleConfig.clientSecret;
const spotifyScopes = ['user-read-currently-playing'];
const redirectURI = `http://${nodecg.config.baseURL}/bundles/ncg-spotify/spotify-callback/index.html`;
let automaticSongFetching;
let connectedToSpotify = false;
const spotifyApi = new SpotifyWebApi;
if (clientId != "CLIENT-ID" && clientSecret != "CLIENT-SECRET") {
    spotifyApi.setRedirectURI(redirectURI);
    spotifyApi.setClientId(clientId);
    spotifyApi.setClientSecret(clientSecret);
}
else {
    nodecg.log.warn('No ClientID or ClientSceret, spotify will not launch');
}
// Log spotify user in
nodecg.listenFor('login', (_data, cb) => {
    let authURL = spotifyApi.createAuthorizeURL(spotifyScopes);
    if (connectedToSpotify) {
        return;
    }
    if (cb && !cb.handled) {
        cb(null, authURL);
    }
});
// Retrieve an access token and a refresh token
nodecg.listenFor('spotify:authenticated', (code) => {
    if (!code) {
        nodecg.log.error('User authenticated through Spotify, but missing code');
        return;
    }
    spotifyApi.authorizationCodeGrant(code).then((data) => {
        nodecg.log.info('Spotify connection successful!');
        connectedToSpotify = true;
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        // Refresh token before the last tenth is done (If 1 hour then 54 mins)
        setTimeout(() => {
            nodecg.sendMessage('refreshAccessToken');
        }, data.body['expires_in'] * 900);
        automaticSongFetching = setInterval(function () { nodecg.sendMessage('fetchCurrentSong'); }, 1000);
    }, (err) => {
        nodecg.log.error('Something went wrong!', err);
        connectedToSpotify = false;
    });
});
nodecg.listenFor('refreshAccessToken', () => {
    spotifyApi.refreshAccessToken().then((data) => {
        nodecg.log.info('The access token has been refreshed!');
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        // Refresh token before the last tenth is done (If 1 hour then 54 mins)
        setTimeout(function () {
            nodecg.sendMessage('refreshAccessToken');
        }, data.body['expires_in'] * 900);
    }, (err) => {
        nodecg.log.warn('Could not refresh access token', err);
    });
});
nodecg.listenFor('fetchCurrentSong', () => {
    spotifyApi.getMyCurrentPlayingTrack({})
        .then((data) => {
        if (currentSongRep.value.name == data.body.item.name) {
            return; // Song has not changed
        }
        let albumArtURL;
        // No album art url if the file is local
        if (data.body.item.is_local) {
            albumArtURL = '';
        }
        else {
            albumArtURL = data.body.item.album.images[0].url;
        }
        // Artists are stored as an array of objects
        let artistsArray = [];
        data.body.item.artists.forEach((artist) => {
            artistsArray.push(artist.name);
        });
        let artistString = artistsArray.join(', ');
        currentSongRep.value = {
            name: data.body.item.name,
            artist: artistString || '',
            albumArt: albumArtURL,
            playing: data.body.is_playing
        };
    }, (err) => {
        nodecg.log.warn('Something went wrong!', err);
    });
});
nodecg.listenFor('automateCurrentSong', (value) => {
    if (value) {
        // Update every second
        automaticSongFetching = setInterval(function () { nodecg.sendMessage('fetchCurrentSong'); }, 1000);
    }
    else {
        nodecg.log.info('Automatic song updating stopped');
        clearInterval(automaticSongFetching);
    }
});
//# sourceMappingURL=spotify.js.map