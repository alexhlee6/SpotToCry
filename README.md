# SpotToCry

### **[Live Link](http://spottocry.herokuapp.com)**

**SpotToCry** is a full-stack clone of popular music streaming service Spotify, which caters to users who need a place to shed some tears while being immersed in a melancholic mood. 

This application features uninterrupted listening of songs and playlists via an ever-present music player, playlist CRUD functionality, responsive search, favorited songs, and more. 

This project was built by applying the MERN stack and integrating Apollo GraphQL for data management.

*Note: SpotToCry was a one-week project completed as part of App Academy's MERN stack curriculum.*



## Technologies Used
* MongoDB 
* GraphQL 
* Heroku 
* React 
* Apollo 
* NodeJS 
* Express 
* AWS S3 

## MVP List 

### 1. Song/Playlist CRUD
* Users can create, edit, or delete playlists.
* Users can add songs to their own playlists and add other playlists to their library.

### 2. Search
* Users can search for songs, albums, and artists. 
* Users can search for other users.
* Users can select a genre or decade to filter their results.

### 3. Continuous Play 
* Users can continuously listen to audio while navigating the app.
* Song bar includes buttons to play/pause, skip to next/previous, and add current song to playlist. 

### 4. Following Users/Playlists
* Users can follow other users and/or their playlists. 

### 5. Artist/Song Info using Genius API
* Information about the artist, genre, and album are available on a song's show page.
* Users may view lyrics on a song's show page.

### 6. User Authentication 
* Login, signup, demo login.
* Auth and protected routes.
* Persistent auth token across refreshes.
* Users must be logged in to access CRUD playlist features and follow other users.

### 7. Hosting on Heroku

### 8. Uploading Images for Avatar and Playlist Thumbnails (Bonus)

## Work Breakdown

* ### Day 0 
   * Create Github repo with README - All
   * Create new MongoDB project and collections - All
   * Set up Express server - Seth 
* ### Day 1
   * Setup User Authentication, Login/Register forms - Tony
   * Setup Database/Mongoose Schemas, Root Queries, Configuring server - Seth 
   * Setup GraphQL Types, Basic Mutations and Static methods - Alex
   
* ### Day 2
   * Playlists - Tony
   * Search - Seth
   * Audio Player - Alex
   
* ### Day 3
   * Library/Following - Tony
   * Song show page using Genius API - Seth
   * Artist/Genre show page using Genius API - Alex
   
* ### Day 4
   * Styling Splash, Forms, Search - Tony
   * Styling Index, Song show - Seth
   * Styling Homepage, Artists/Genre show - Alex
   
* ### Day 5 
   * Image uploading for user avatar and custom playlist thumbnail
   * (Maybe) Queue next song
   * Styling finishing touches
   * Deploy to Heroku
   
