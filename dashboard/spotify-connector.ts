import {CurrentSong} from '../src/types/schemas/currentSong';
const currentSongRep = nodecg.Replicant<CurrentSong>('currentSong');

const logInBtn = document.getElementById("logIn")!;
const refreshTokenBtn = document.getElementById("refreshBtn")!;

const spotifyCallback = localStorage.getItem('spotify-callback');
localStorage.removeItem('spotify-callback');

if (spotifyCallback) {
	const params = new URLSearchParams(spotifyCallback);
	if (params.get('error')) {
		nodecg.log.error('Error after spotify callback');
	} else {
		const code = params.get('code');
		nodecg.sendMessage('spotify:authenticated', code);
	}
}

/** Starts the login for spotify, opens auth url */
function getAuth() {
	console.log('Logging in');
	nodecg.sendMessage('login', (err, authURL) => {
		if (err) {
			nodecg.log.warn(err.message);
			return;
		}

		if (authURL) {
			window.parent.location.replace(authURL);
		} else {
			nodecg.log.warn('Something went very wrong getting the auth url');
		}
	});
}

/** Requests a new refresh token */
function refreshToken() {
	console.log('Refreshing Token');
	nodecg.sendMessage('refreshAccessToken');
}

currentSongRep.on('change', newVal => {
	document.getElementById('songPlaying')!.innerHTML = newVal.playing ? "Playing" : "Paused";
	document.getElementById('songName')!.innerHTML = newVal.name;
	document.getElementById('songArtist')!.innerHTML = newVal.artist;
	(<HTMLImageElement>document.getElementById('albumArt'))!.src = newVal.albumArt;
});

logInBtn.addEventListener('onclick', getAuth);
refreshTokenBtn.addEventListener('onclick', refreshToken);
