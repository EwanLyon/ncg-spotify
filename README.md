# ncg-spotify

<p align="center">
  <img src="https://raw.githubusercontent.com/EwanLyon/ncg-spotify/master/media/widget-screenshot.jpg">
</p>

A NodeCG bundle to access the current song playing on spotify.

## Requirements
- [NodeCG v1.x](https://github.com/nodecg/nodecg/releases)

## Installation
1. Clone (or download & extract) to `nodecg/bundles/ncg-spotify`
2. `cd nodecg/bundles/ncg-spotify` and run `npm install --production`
3. If [nodecg-cli](https://github.com/nodecg/nodecg-cli) is installed run `nodecg defaultconfig` else go to `nodecg/cfg` and create `ncg-spotify.json` and refer to [configschema.json](https://github.com/EwanLyon/ncg-spotify/blob/master/configschema.json)
4. Create a spotify app from https://developer.spotify.com/dashboard/applications
5. Click edit settings and set the redirect URI as `http://localhost:9090/bundles/ncg-spotify/spotify-callback/index.html`
6. Copy the `Client ID` and `Client Secret` to the ncg-spotify cfg in `nodecg/cfg/ncg-spotify.json` like the `defaultconfig.json` is
7. Run the nodecg server: `node index.js` (or `nodecg start` if you have [`nodecg-cli`](https://github.com/nodecg/nodecg-cli) installed) from the `nodecg` root directory
8. Click log in on the spotify connector panel

The token should refresh automatically but if something weird happens there is a refresh token button.

## Usage
`ncg-spotify` creates the replicant `currentSong`.
To access it make a replicant like `const song = nodecg.Replicant('currentSong', 'ncg-spotify');`

**`currentSong` properties**

 - `name` String - Name of the song
 - `artist` String - Name of the artists
 - `albumArt` String - URL of the album art, local files will not show album art
 - `playing` Boolean - True if the song is currently playing

### Example

    const songRep = nodecg.Replicant('currentSong', 'ncg-spotify');
    
    songRep.on('change', newVal => {
    	songNameElement.innerHTML = newVal.name;
    	artistElement.innerHTML = newVal.artist;
    	albumImageElement.src = newVal.albumArt;
    });
    
There is also a replicant `rawSongData` which is the value of all the data given when requesting the current song. Can be used for more advanced implementations.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
