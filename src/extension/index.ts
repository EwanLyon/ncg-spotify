'use strict';
// NodeCG
import { NodeCG } from '../../../../types/server'
import { ListenForCb } from '../../../../types/lib/nodecg-instance';

// Ours
const SpotifyWebApi = require('spotify-web-api-node');
import { CurrentSong } from '../types/schemas/currentSong';

const spotifyScopes = ['user-read-currently-playing'];
let updateInterval = 1000;	// 1 second

module.exports = (nodecg: NodeCG) => {
	// Spotify CFG
	const clientId: string = nodecg.bundleConfig.clientId;
	const clientSecret: string = nodecg.bundleConfig.clientSecret;

	const currentSongRep = nodecg.Replicant<CurrentSong>('currentSong');

	const redirectURI = `http://${nodecg.config.baseURL}/bundles/ncg-spotify/spotify-callback/index.html`;

	let automaticSongFetching: NodeJS.Timeout;
	let connectedToSpotify = false;

	const spotifyApi = new SpotifyWebApi;

	if (clientId != 'CLIENT-ID' && clientSecret != 'CLIENT-SECRET') {
		nodecg.log.info("Setting Spotify details");
		spotifyApi.setRedirectURI(redirectURI);
		spotifyApi.setClientId(clientId);
		spotifyApi.setClientSecret(clientSecret);
	} else {
		nodecg.log.warn('No ClientID or ClientSceret, spotify will not launch');
	}

	// Log spotify user in
	nodecg.listenFor('login', (_data: unknown, cb: ListenForCb) => {
		const authURL: string = spotifyApi.createAuthorizeURL(spotifyScopes);

		if (connectedToSpotify) {
			return;
		}

		if (cb && !cb.handled) {
			cb(null, authURL);
		}
	});

	// Retrieve an access token and a refresh token
	nodecg.listenFor('spotify:authenticated', (code: string) => {
		if (!code) {
			nodecg.log.error(
				'User authenticated through Spotify, but missing code',
			);
			return;
		}

		spotifyApi.authorizationCodeGrant(code).then(
			(data: any) => {
				nodecg.log.info('Spotify connection successful!');
				connectedToSpotify = true;

				// Set the access token on the API object to use it in later calls
				spotifyApi.setAccessToken(data.body['access_token']);
				spotifyApi.setRefreshToken(data.body['refresh_token']);

				// Refresh token before the last tenth is done (If 1 hour then 54 mins)
				setTimeout(() => {
					nodecg.sendMessage('refreshAccessToken');
				}, data.body['expires_in'] * 900);

				automaticSongFetching = setInterval(function () {
					nodecg.sendMessage('fetchCurrentSong');
				}, 1000);
			},
			(err: any) => {
				nodecg.log.error('Something went wrong!', err);
				connectedToSpotify = false;
			}
		);
	});

	nodecg.listenFor('refreshAccessToken', () => {
		spotifyApi.refreshAccessToken().then(
			(data: any) => {
				nodecg.log.info('The access token has been refreshed!');

				// Save the access token so that it's used in future calls
				spotifyApi.setAccessToken(data.body['access_token']);

				// Refresh token before the last tenth is done (If 1 hour then 54 mins)
				setTimeout(function () {
					nodecg.sendMessage('refreshAccessToken');
				}, data.body['expires_in'] * 900);
			},
			(err: any) => {
				nodecg.log.warn('Could not refresh access token', err);
			}
		);
	});

	nodecg.listenFor('fetchCurrentSong', () => {
		spotifyApi.getMyCurrentPlayingTrack({})
			.then((data: any) => {
				if (!data.body) {
					return;
				}
				// If song is same and playing then no difference
				if (currentSongRep.value.name == data.body['item.name'] &&
					currentSongRep.value.playing == data.body['is_playing']) {
					return; // Song has not changed
				}

				let albumArtURL: string;

				// No album art url if the file is local
				// Will get the highest quality image
				if (data.body['item'].is_local) {
					albumArtURL = '';
				} else {
					albumArtURL = data.body['item'].album.images[0].url;
				}

				// Artists are stored as an array of objects
				const artistsArray: string[] = [];
				data.body['item'].artists.forEach((artist: any) => {
					artistsArray.push(artist.name);
				});
				const artistString = artistsArray.join(', ');

				currentSongRep.value = {
					name: data.body['item'].name,
					artist: artistString || '',
					albumArt: albumArtURL,
					playing: data.body['is_playing'],
				};
			}, (err: any) => {
				if (err['statusCode'] == 429) {
					nodecg.log.warn(`Rate limit hit. Try again in ${err['Retry-After']}`, err);
					updateInterval = err['Retry-After'] * 1000;
				} else {
					nodecg.log.warn('Something went wrong!', err);
				}
			});
	});

	nodecg.listenFor('automateCurrentSong', (value: boolean) => {
		if (value) {
			// Update every second
			automaticSongFetching = setInterval(function () {
				nodecg.sendMessage('fetchCurrentSong');
			}, updateInterval);
		} else {
			nodecg.log.info('Automatic song updating stopped');
			clearInterval(automaticSongFetching);
		}
	});
};
