"use strict";
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
/** Requests new song data */
function getCurrentSong() {
    nodecg.sendMessage('fetchCurrentSong');
}
/** Requests a new refresh token */
function refreshToken() {
    nodecg.sendMessage('refreshAccessToken');
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdGlmeS1jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcG90aWZ5LWNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbURBQW1EO0FBQ25ELFNBQVMsT0FBTztJQUNmLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQzVDLElBQUksR0FBRyxFQUFFO1lBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE9BQU87U0FDUDtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsNkJBQTZCO0FBQzdCLFNBQVMsY0FBYztJQUN0QixNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVELG1DQUFtQztBQUNuQyxTQUFTLFlBQVk7SUFDcEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDakUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVDLElBQUksZUFBZSxFQUFFO0lBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3BELElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDTixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEQ7Q0FDRCJ9