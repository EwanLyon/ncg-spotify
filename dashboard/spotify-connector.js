const currentSongRep = nodecg.Replicant('currentSong');
const logInBtn = document.getElementById("logIn");
const refreshTokenBtn = document.getElementById("refreshBtn");
const spotifyCallback = localStorage.getItem('spotify-callback');
localStorage.removeItem('spotify-callback');
if (spotifyCallback) {
    const params = new URLSearchParams(spotifyCallback);
    if (params.get('error')) {
        nodecg.log.error('Error after spotify callback');
    }
    else {
        const code = params.get('code');
        nodecg.sendMessage('spotify:authenticated', code);
    }
}
/** Starts the login for spotify, opens auth url */
function getAuth() {
    nodecg.sendMessage('login', (err, authURL) => {
        if (err) {
            nodecg.log.warn(err.message);
            return;
        }
        if (authURL) {
            window.parent.location.replace(authURL);
        }
        else {
            nodecg.log.warn('Something went very wrong getting the auth url');
        }
    });
}
/** Requests a new refresh token */
function refreshToken() {
    nodecg.sendMessage('refreshAccessToken');
}
currentSongRep.on('change', newVal => {
    document.getElementById('songPlaying').innerHTML = newVal.playing ? "Playing" : "Paused";
    document.getElementById('songName').innerHTML = newVal.name;
    document.getElementById('songArtist').innerHTML = newVal.artist;
    document.getElementById('albumArt').src = newVal.albumArt;
});
logInBtn.addEventListener('onclick', getAuth);
refreshTokenBtn.addEventListener('onclick', refreshToken);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdGlmeS1jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcG90aWZ5LWNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFjLGFBQWEsQ0FBQyxDQUFDO0FBRXBFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFFLENBQUM7QUFDbkQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUUsQ0FBQztBQUUvRCxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDakUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVDLElBQUksZUFBZSxFQUFFO0lBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3BELElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDTixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEQ7Q0FDRDtBQUVELG1EQUFtRDtBQUNuRCxTQUFTLE9BQU87SUFDZixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUM1QyxJQUFJLEdBQUcsRUFBRTtZQUNSLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QixPQUFPO1NBQ1A7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNsRTtJQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELG1DQUFtQztBQUNuQyxTQUFTLFlBQVk7SUFDcEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxjQUFjLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtJQUNwQyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBRSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMxRixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBRSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzdELFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFFLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDOUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNoRixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyJ9