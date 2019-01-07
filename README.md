# VRAudioPlayer

_for kiesse and melissa_

an audio player for web VR experiences and distributed applications

The **_VRAudioPlayer_** generates an audio player that users can experience in virtual reality through a web browser on most mobile, laptop, desktop, or tablet devices. Experiences are produced using Three.js/AFrame to achieve a secure, cross-platform standard for sharing audio on the Immersive Web.

Developers can implement the module in both modular server-side and non-modular client-side applications with just a few lines of JavaScript code.

## Examples:

* Build and Share Your Own VR Music Playlist

## Usage:

[Server-side](#server-side)

[Client-side](#client-side)

### Server-Side
 1. install using npm
```javascript
npm install vraudioplayer
```
 2. import vraudioplayer (using the 'require' method is recommended; some Node releases do not have the newest ES6 features enabled by default)
 
 3. add audio files to your playlist then build it

 (a) using add method
```javascript
var myPlayer = require('vraudioplayer');

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
var myPlayer = require('vraudioplayer');

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
2. move to the app.js or index.js level of the directory and create a test.js file
3. implement as follows:

```javascript
var myPlayer = new VRAudioPlayer();
myPlayer.build();

myPlayer.add('../media/img/You.png', '../media/audio/You.mp3' , { title: 'you', author: 'Unibe@t', year: 2016});

myPlayer.add('../media/img/ReadyOrNot.png', '../media/audio/ReadyOrNot.mp3' , { title: 'Ready or Not', author: 'ConsciousThoughts', year: 2016});

myPlayer.add('../media/img/HighedUp.png', '../media/audio/HighedUp.mp3' , { title: 'HIGHED UP', author: 'SOUDIERE ft. kloudbug', year: 2016});

myPlayer.add('../media/img/ServinFeens.png', '../media/audio/ServinFeens.mp3', { title: 'SERVIN FEENS', author: 'mythic', year: 2016});

myPlayer.add('../media/img/0001.png', '../media/audio/WaterToWine.mp3' , { title: 'Water to Wine', author: 'KAYTRANADA ft. Kali Uchis', year: 2016});

coreEventListeners.launch([myPlayer]);
```

### Full API


| property       | type   | description |
| ------------- |:-------------:| -----:|
| type          | string       | short paragraph descriptor of type property |
| socket        | object        |  short paragraph descriptor of socket object |
| hello         | method        | short paragraph descriptor of hello method|
| buildCoreMarkup | method        | short paragraph descriptor of buildCoreMarkup method|
| spawn         | method        | short paragraph descriptor of spawn method|
| assetsContainer | object        | short paragraph descriptor of assetContainer object |
| build         | method        | short paragraph descriptor of build method |
| add           | method        | short paragraph descriptor of add method |
| addFromList   | method        | short paragraph descriptor of addFromList method |
| showTrackList | method        | short paragraph descriptor of showTrackList method |
| playNextTrack | method        | short paragraph descriptor of playNextTrack method |
| playPreviousTrack | method  |  short paragraph descriptor of playPreviousTrack method |
| stream        | method        | short paragraph descriptor of type method |
| application   | object        | short paragraph descriptor of type object |
| view          | string        | short paragraph descriptor of type property |
| XRSetting     | string        | short paragraph descriptor of type property |
    
