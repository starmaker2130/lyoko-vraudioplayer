# LyokoVRAudioPlayer

_for kiesse and melissa_

an audio player for distributed immersive applications built in Lyoko

The **_LyokoVRAudioPlayer_** generates an audio player that users can experience in virtual reality through a pARk browser on most mobile, laptop, desktop, or tablet devices. Experiences are produced using Three.js/AFrame to achieve a secure, cross-platform standard for sharing audio on the Immersive Web.

Developers can implement the module in both modular server-side and non-modular client-side applications with just a few lines of JavaScript code.

## Examples:

* Build and Share Your Own VR Music Playlist

## Usage:

[Server-side](#server-side)

[Client-side](#client-side)

### Server-Side
 1. install using npm
```javascript
npm install lyoko-vraudioplayer
```
 2. import lyoko-vraudioplayer (using the 'require' method is recommended; some Node releases do not have the newest ES6 features enabled by default)

 3. add audio files to your playlist then build it

 (a) using add method
```javascript
var myPlayer = require('lyoko-vraudioplayer');

myPlayer.add('../media/img/You.png', '../media/audio/You.mp3' , { title: 'you', author: 'Unibe@t', year: 2016});

myPlayer.add('../media/img/ReadyOrNot.png', '../media/audio/ReadyOrNot.mp3' , { title: 'Ready or Not', author: 'ConsciousThoughts', year: 2016});

myPlayer.add('../media/img/HighedUp.png', '../media/audio/HighedUp.mp3' , { title: 'HIGHED UP', author: 'SOUDIERE ft. kloudbug', year: 2016});

myPlayer.add('../media/img/ServinFeens.png', '../media/audio/ServinFeens.mp3', { title: 'SERVIN FEENS', author: 'mythic', year: 2016});

myPlayer.add('../media/img/0001.png', '../media/audio/WaterToWine.mp3' , { title: 'Water to Wine', author: 'KAYTRANADA ft. Kali Uchis', year: 2016});

myPlayer.spawn();
```
 (b) using addFromList method


an object or array of objects in the following format can be processed by the module to generate same outcome as above

```javascript
var myPlayer = require('lyoko-vraudioplayer');

var collection = {
    'you': {
        coverURL: '../media/img/You.png',
        audioURL: '../media/audio/You.mp3',
        metadata: {
            title: 'you',
            author: 'Unibe@t',
            year: 2016
        }
    },
    'Ready or Not': {
        coverURL: '../media/img/ReadyOrNot.png',
        audioURL: '../media/audio/ReadyOrNot.mp3',
        metadata: {
            title: 'Ready or Not',
            author: 'ConsciousThoughts',
            year: 2016
        }
    },
    'Highed Up': {
        coverURL: '../media/img/HighedUp.png',
        audioURL: '../media/audio/HighedUp.mp3',
        metadata: {
            title: 'HIGHED UP',
            author: 'SOUDIERE ft. kloudbug',
            year: 2016
        }
    },
    'SERVIN FEENS': {
        coverURL: '../media/img/ServinFeens.png',
        audioURL: '../media/audio/ServinFeens.mp3',
        metadata: {
            title: 'SERVIN FEENS',
            author: 'mythic',
            year: 2016
        }
    },
    'Water to Wine': {
        coverURL: '../media/img/00001.png',
        audioURL: '../media/audio/WaterToWine.mp3',
        metadata: {
            title: 'Water to Wine',
            author: 'KAYTRANADA ft. Kali Uchis',
            year: 2016
        }
    }
};

myPlayer.addFromList(collection);

myPlayer.spawn();
```

### Client-Side

1. download the boilerplate or make your own test directory
2. create a test.js file:

```javascript
var myPlayer = new LyokoVRAudioPlayer();
myPlayer.build();

myPlayer.add('../media/img/You.png', '../media/audio/You.mp3' , { title: 'you', author: 'Unibe@t', year: 2016});

myPlayer.add('../media/img/ReadyOrNot.png', '../media/audio/ReadyOrNot.mp3' , { title: 'Ready or Not', author: 'ConsciousThoughts', year: 2016});

myPlayer.add('../media/img/HighedUp.png', '../media/audio/HighedUp.mp3' , { title: 'HIGHED UP', author: 'SOUDIERE ft. kloudbug', year: 2016});

myPlayer.add('../media/img/ServinFeens.png', '../media/audio/ServinFeens.mp3', { title: 'SERVIN FEENS', author: 'mythic', year: 2016});

myPlayer.add('../media/img/0001.png', '../media/audio/WaterToWine.mp3' , { title: 'Water to Wine', author: 'KAYTRANADA ft. Kali Uchis', year: 2016});

coreEventListeners.launch([myPlayer]);
```

3. run "node test.js" to render the player

### Full API


| property       | type   | description |
| ------------- |:-------------:| -----:|
| type          | string       | the object type of the Player |
| socket        | object        |  the web socket connection the Player uses for IP communication |
| hello         | method        | the initiator method|
| buildCoreMarkup | method        | builds the core visual components of the Player|
| spawn         | method        | adds the Player to the Environment|
| assetsContainer | object        | the Player's immersive asset manager |
| build         | method        | builds the core behavioral components of the Player|
| add           | method        | adds a user-defined Track |
| addFromList   | method        | compiles a Playlist from a user-defined Collection |
| showTrackList | method        | shows the currently compiled Playlist |
| playNextTrack | method        | plays the next Track in the Playlist |
| playPreviousTrack | method  |  plays the previous Track in the Playlist |
| stream        | method        | streams the Player content |
| application   | object        | the application programming interface for the Player |
| view          | string        | short paragraph descriptor of type property |
| XRSetting     | string        | the current Format or View of the Player |
