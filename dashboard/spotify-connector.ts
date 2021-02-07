import {CurrentSong} from '../src/types/schemas/currentSong';
const currentSongRep = nodecg.Replicant<CurrentSong>('currentSong');

const logInBtn = document.getElementById("logIn")!;
const songUpdateBtn = document.getElementById("songUpdate")!;
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
function updateSong() {
	console.log('Updating Song');
	nodecg.sendMessage('fetchCurrentSong');
}

/** Requests a new refresh token */
function refreshToken() {
	console.log('Refreshing Token');
	nodecg.sendMessage('refreshAccessToken');
}

currentSongRep.on('change', newVal => {
	(document.getElementById('songPlaying') as HTMLSpanElement).innerHTML = newVal.playing ? "Playing" : "Paused";
	(document.getElementById('songName') as HTMLSpanElement).innerHTML = newVal.name;
	(document.getElementById('songArtist') as HTMLSpanElement).innerHTML = newVal.artist;
	(document.getElementById('albumArt') as HTMLImageElement).src = newVal.albumArt;
});

logInBtn.onclick = getAuth;
songUpdateBtn.onclick = updateSong;
refreshTokenBtn.onclick = refreshToken;
