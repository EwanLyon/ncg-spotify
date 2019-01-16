"use strict";
'use-strict';
function getAuth() {
    nodecg.sendMessage('login', (err, authURL) => {
        if (err) {
            nodecg.log.warn(err.message);
            return;
        }
        if (authURL) {
            // window.open(authURL, '_blank');
            window.parent.location.replace(authURL);
        }
        else {
            nodecg.log.warn('Something went very wrong getting the auth url');
        }
    });
}
function getCurrentSong() {
    nodecg.sendMessage('fetchCurrentSong');
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdGlmeS1jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcG90aWZ5LWNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDO0FBRWIsU0FBUyxPQUFPO0lBQ1osTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDekMsSUFBSSxHQUFHLEVBQUU7WUFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsT0FBTztTQUNWO1FBRUQsSUFBSSxPQUFPLEVBQUU7WUFDVCxrQ0FBa0M7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO1NBQ3BFO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ25CLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsU0FBUyxZQUFZO0lBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2pFLFlBQVksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QyxJQUFJLGVBQWUsRUFBRTtJQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztLQUN2RDtTQUFNO1FBQ04sTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hEO0NBQ0QifQ==