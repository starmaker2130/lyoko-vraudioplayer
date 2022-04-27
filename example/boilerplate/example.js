// to run properly place this file inside the boilerplate directory
// make sure the latest vraudioplayer package is accessible from within the directory
// if not use npm install vraudioplayer to install it

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