# SpotToCry :umbrella:


#### **[Live Link](http://spottocry.herokuapp.com)**

**SpotToCry** is a full-stack clone of popular music streaming service Spotify, which caters to users who need a place to shed some tears while being immersed in a melancholic mood. 

This application features uninterrupted listening of songs and playlists via an ever-present music player, playlist CRUD functionality, responsive search, favorited songs, and more. 

This project was built by applying the MERN stack and integrating Apollo GraphQL for data management.

*Note: SpotToCry was a one-week project completed as part of App Academy's MERN stack curriculum.*

### Technologies/Libraries Used
1. MongoDB
2. React.js
3. Apollo
4. GraphQL
4. Node.js
5. Express
6. Wikipedia API
7. Axios
8. HTML5 / CSS3 / SCSS

![Full-1](/client/public/assets/images/README/full-1.png?raw=true)


## Uninterrupted Listening 
I found that the most challenging part of this project was creating a music player that could stay fixed to the bottom of the page across the application and allow for uninterrupted listening regardless of the user's navigation through the site. 

This was a difficult problem to approach because my prior experience with React led me to believe I should have a parent component which responds to changes in the current playlist and provides that playlist as props to the `MusicPlayer` component. However, I realized that this would likely cause the entire music player element to unmount and remount upon a state change/re-render in this outer component, which would also create significant interference with the audio playback and volume settings.

My solution was to have a single audio player component which mounts once upon logging in and unmounts on logout. This component would directly respond to changes in the currently played music via a `currentMusic` query, and update its state accordingly. 

```javascript
// client/src/components/player/MusicPlayer.js

render() {
  // ...
  <Query query={CURRENT_MUSIC_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;
      
      if (data.currentMusic.musicType === "playlist") {
        return (
          <Query query={Queries.FETCH_PLAYLIST} variables={{ id: data.currentMusic.id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;

              if (this.state.id !== data.playlist._id) {
                let newList = [];
                let songs = data.playlist.songs;
                for (let i = 0; i < songs.length; i++) {
                  newList.push(songs[i]);
                }
                this.receiveNewPlaylist({
                  playlist: newList,
                  musicType: "playlist",
                  id: data.playlist._id
                });
              }  
              return null;
          </Query>
        )
      }
    }}
  </Query>
}            
```
I also saved the audio player element to the window as `window.player` so that the element was easily accessible from the many parts of this component that needed to change its properties. One example is the `receiveNewPlaylist` function:

```javascript
// client/src/components/player/MusicPlayer.js

receiveNewPlaylist({playlist, musicType, id}) {
  window.player.pause();
  window.player.src = playlist[0].songUrl;
  window.player.volume = this.state.volume;
  window.player.play();
  this.setState({ playlist, musicType, id, playing: true });
}
```

---

## Additional Music Player Features

Some other features I felt were necessary to add to the music player component included volume adjustment, displaying the current time and duration of the played song, and a drag-and-drop timeline to change the current time of the song. 

To have the current time and duration displayed next to the song title and a timeline used for seeking through the track, I added an event listener to the music player element on `componentDidMount`:

```javascript
// client/src/components/player/MusicPlayer.js

componentDidMount(){
  window.player = document.getElementById("player");
  window.player.addEventListener("timeupdate", function () {
    let currentTime;
    let duration;
    if (window.player.currentTime) {
      if (Math.floor(window.player.currentTime % 60) < 10) {
        currentTime = (
          `${Math.floor(window.player.currentTime / 60)}` + (
            `:0${Math.floor(window.player.currentTime % 60)}`
        ));
      } else {
        currentTime = (
          `${Math.floor(window.player.currentTime / 60)}` + (
            `:${Math.floor(window.player.currentTime % 60)}`
        ));
      }
    } else {
      currentTime = "0:00";
    }
    // (Similar logic here for changing duration into a more readable format...)
    
    document.getElementById('tracktime-1').innerHTML = (
      currentTime 
    );
    document.getElementById('tracktime-2').innerHTML = (
      duration
    );
    // On every timeupdate event, change the innerHTML of the tracktime elements to update the currentTime and duration displayed 
    document.getElementById("timeskip").value = (
      Math.floor(
        (window.player.currentTime / window.player.duration) * 100
      )
    );  // On timeupdate, also set the value of the range input to be the song's elapsed time divided by the duration
  });
}
```
To allow users to drag the `timeskip` input and change the `currentTime` of the song, I added an `onChange` event to the element which invokes the `changeCurrentTime` function: 

```javascript
// client/src/components/player/MusicPlayer.js

changeCurrentTime(e) {
  if (window.player) {
    let duration = window.player.duration;
    let inputVal = parseInt(e.currentTarget.value) / 100; 
    let newTime = duration * inputVal; 
    window.player.currentTime = newTime;
    this.setState({ timeInputVal: parseInt(e.currentTarget.value) });
  }
}
```

---

## Updating the Music Player from Unattached Components
To update the playlist from different components across the site, I devised a resolver function with writes the `currentMusic` to the cache directly.

```javascript
// client/src/resolvers.js

const resolvers = {
  Mutation: {
    // ...
    playGenreMutation: (_, args, {cache}) => {
      cache.writeData({ 
        data: { currentMusic: { id: args.id, musicType: "genre", __typename: "GenreType"} } 
      });
      return null;
    }
  }
}
```

So if a user were to click "play all" while on a `GenreShow` component, the `playGenreMutation` would be invoked passing in the genre's id, and the `musicType` would be set to "genre" so that the `MusicPlayer` component would know which query to use when retrieving all of the songs necessary to update the current playlist.

---

## Integrating Wikipedia API for Artist Description
In the `ArtistType`, I included a field for `description` which has a resolve function that makes an axios request to Wikipedia's API and parses the response to extract only the article's introduction. This information is displayed in the music player component when a user clicks a button to view more about the current song's artist.

```javascript
// server/schema/types/artist_type.js

const ArtistType = new GraphQLObjectType({
  name: "ArtistType",
  
  fields: () => ({
    // ...
    description: { 
      type: GraphQLString,
      resolve(parentValue) {
        return axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${parentValue.name}`)
          .then(res => {
            return Object.values(res.data.query.pages)[0].extract;
          })
      }
    }
  })
});
```
