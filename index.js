var LyokoVRAudioPlayer = {
    type: "vraudio",
    socket : null,
    hello : function(){
        console.log("----------------------");
        console.log("Hello world! \n lyoko-vraudioplayer \n v. 1.0.0 ");
        console.log("----------------------");
    },
    buildCoreMarkup: function(trackNumber){
        var track = trackNumber;
        var result = `player.add("${track.cover}", "${track.audio}", {title: "${track.title}", author: "${track.author}", year: "${track.year}"});`;
        return result;

    },
    spawn : function(){
        var self = this;
        //self.socket = io.connect(location.host);
        var trackList = self.application.core.trackList;

        var core = "";
        for(var i=0; i<trackList.length; i++){
            core += self.buildCoreMarkup(trackList[i]);
        }

        var top = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>LyokoVRAudioPlayer| spawn| v. 2.0.0</title>
            <link rel=stylesheet type="text/css" href="../../css/XRMP.css" />
            <script src="../js/jquery-3.2.1.min.js"></script>
            <script src="../js/aframe103.min.js"></script>
            <script src="https://rawgit.com/mayognaise/aframe-gif-shader/master/dist/aframe-gif-shader.min.js"></script>
            <script src="../js/coreUX.js"></script> <!-- handles movement, styling, and interactivity of core ui components in the dom -->
            <script src="../js/LyokoVRAudioPlayer.js"></script> <!-- contains the class function for creating vr audio player objects -->
            <script>

                document.addEventListener("DOMContentLoaded", function(){
                    var player = new LyokoVRAudioPlayer();   //create an vr audio player object
                    player.build();`;

        var base = `coreEventListeners.launch([player]);    //  tell the core page launcher to start
                                                            //  playing audio once the app is launched by the user (on screen tap)

                });
            </script>
        </head>
        <body>
           <div id="launch-application-page" class="entry-layer overlay">
                <div id="instructions">
                    tap anywhere
                    <div id="logo"></div>
                    to launch
                </div>
            </div>
            <div id="main-app-container" class="viewer-layer">
            </div>
        </body>
        </html>`;

        //console.log(core);

        var finalDraft = top+core+base;
        // Change the content of the file as you want
        // or either set fileContent to null to create an empty file
        //var fileContent = base;

        // The absolute path of the new file with its name
        var filepath = "./room/vrsampleplaylist.html";

        var fs = require("fs");

        fs.writeFile(filepath, finalDraft, (err) => {
            if (err) throw err;
            console.log("\n\nSaving playlist as "vrsampleplaylist.html" in project "room" folder...");
            console.log("The file was succesfully saved!");
            console.log("-------------------------");
        });
    },
    assetsContainer: null,
    build : function(){
        console.log("spawning");
        var self = this;
        self.application.core.tether = $("#main-app-container");
        self.assetsContainer = $("#embedded-assets-container");
        self.application.core.build();
    },
    add : function(coverURL, audioURL, metadata){
        var self = this;
        var index;
        index = self.application.core.trackList.length;

        var track = {
            cover: coverURL,
            audio: audioURL,
            title: metadata.title,
            author: metadata.author,
            year: metadata.year,
            texture: `audio-cover-${index}`
        };

       // self.assetsContainer.append(`<img id="${track.texture}" src="${track.cover}" preload="true" />`);

        self.application.core.trackList.push(track);
        console.log("--------");
        console.log(`adding track ${track.title} to playlist...`);
        //console.log(track);
    },
    addFromList: function(collection){
        var self = this;
        var list = collection;

        for (var key in list) {
            // skip loop if the property is from prototype
            if (!list.hasOwnProperty(key)) continue;

            var obj = list[key];
            console.log("-------------");
            console.log(`adding track ${obj.metadata.title} to playlist...`);
            console.log(obj);
            self.add(obj.coverURL, obj.audioURL, obj.metadata);

            /* for (var prop in obj) {
                // skip loop if the property is from prototype
                if(!obj.hasOwnProperty(prop)) continue;

                // your code
                //alert(prop + " = " + obj[prop]);
                console.log(prop);
            }*/ //no longer needed after 0.13.11 used for development/debugging purposes
        }
    },
    showTrackList : function(){
        var self = this;
        self.application.core.trackList;
        for(var i=0; i<self.application.core.trackList.length; i++){
            console.log(self.application.core.trackList[i].title);
        }
    },
    playNextTrack : function(){
        var self = this;
        self.application.core.playNextTrack();
    },
    playPreviousTrack: function(){
        var self = this;
        self.application.core.playPreviousTrack();
    },
    stream: function(){
        var self = this;
        self.player = document.getElementById("html5-audio-player");
        self.source = document.getElementById("static-selector");

        $("#html5-audio-player").bind("ended", function(){
                // done playing
                if(self.index+1==self.trackList.length){
                    self.index=0;
                }
                else{
                    self.index = self.index+1;
                }
                console.log(`playing ${self.trackList[self.index].audio}`);

                document.querySelector("#song-title-container").setAttribute("value", self.trackList[self.index].title);
                document.querySelector("#meta-data-container").setAttribute("value", `author: ${self.trackList[self.index].author} \n\n year: ${self.trackList[self.index].year}`);

                document.querySelector("#audio-cover-artwork").setAttribute("material", `src:#${self.trackList[self.index].texture}; side: double;`);

                console.log(self.trackList[self.index].cover);

                self.source.setAttribute("src", self.trackList[self.index].audio);
                self.player.setAttribute("src", self.trackList[self.index].audio);
                self.play();
            });

        self.index=0;

        $("#play-next-track-button").click(function(){
            console.log("play the next song in the track list");
            self.playNextTrack();
        });

        $("#play-previous-track-button").click(function(){
            console.log("play the previous song in the track list");
            self.playPreviousTrack();
        });

        document.querySelector("#song-title-container").setAttribute("value", self.trackList[self.index].title);

        document.querySelector("#meta-data-container").setAttribute("value", `author: ${self.trackList[self.index].author} \n\n year: ${self.trackList[self.index].year}`);

        self.source.setAttribute("src", self.trackList[self.index].audio);
        self.player.setAttribute("src", self.trackList[self.index].audio);

        document.querySelector("#audio-cover-artwork").setAttribute("material", `src:#${self.trackList[self.index].texture}; side: double;`);

        self.play();
    },
    application : {
        focus: 0, // 0 = home; 1 = audio; 2 = visual; 3 = search
        renderer: [
            "AR",
            "VR",
        ],
        defaultAnimation: {
            addTrack: function(){
                $("#add-track-overlay").show().animate({
                    opacity: 1.0
                }, 1000);
            }
        },
        core: {
            playNextTrack: function(){
                var self = this;

                self.stop();
                // stop playing

                if(self.index+1==self.trackList.length){
                    self.index=0;
                }
                else{
                    self.index = self.index+1;
                }
                console.log(`playing ${self.trackList[self.index].audio}`);

                document.querySelector("#song-title-container").setAttribute("value", self.trackList[self.index].title);
                document.querySelector("#meta-data-container").setAttribute("value", `author: ${self.trackList[self.index].author} \n\n year: ${self.trackList[self.index].year}`);

                document.querySelector("#audio-cover-artwork").setAttribute("material", `src:#${self.trackList[self.index].texture}; side: double;`);

                console.log(self.trackList[self.index].texture);

                self.source.setAttribute("src", self.trackList[self.index].audio);
                self.player.setAttribute("src", self.trackList[self.index].audio);
                self.play();
            },
            playPreviousTrack: function(){
                var self = this;

                self.stop();
                // stop playing

                if(self.index-1==-1){
                    self.index=self.trackList.length-1;
                }
                else{
                    self.index = self.index-1;
                }
                console.log(`playing ${self.trackList[self.index].audio}`);

                document.querySelector("#song-title-container").setAttribute("value", self.trackList[self.index].title);
                document.querySelector("#meta-data-container").setAttribute("value", `author: ${self.trackList[self.index].author} \n\n year: ${self.trackList[self.index].year}`);

                document.querySelector("#audio-cover-artwork").setAttribute("material", `src:#${self.trackList[self.index].texture}; side: double;`);

                console.log(self.trackList[self.index].texture);

                self.source.setAttribute("src", self.trackList[self.index].audio);
                self.player.setAttribute("src", self.trackList[self.index].audio);
                self.play();
            },
            index: -1,
            trackList: [],
            spawn: function(){
                console.log("only available in npm package for security reasons");
            },
            player: null,
            play: function(){
                var self = this;

                if(self.player==null){
                    console.log("load a player first");
                }
                else{
                    self.player.play();
                }
            },
            pause: function(){
                var self = this;

                if(self.player==null){
                    console.log("nothing to pause. load a player first");
                }
                else{
                    self.player.pause();
                }
            },
            stop: function(){
                var self = this;

                if(self.player==null){
                    console.log("nothing to stop. load a player first");
                }
                else{
                    self.player.pause();
                }
            },
            source: null,
            stream: function(){
                var self = this;

                self.player = document.getElementById("html5-audio-player");
                self.source = document.getElementById("static-selector");

                $("#html5-audio-player").bind("ended", function(){
                // done playing
                    console.log(`playing ${self.trackList[self.index+1].audio}`);

                    document.querySelector("#song-title-container").setAttribute("value", self.trackList[self.index+1].title);
                    document.querySelector("#meta-data-container").setAttribute("value", `author: ${self.trackList[self.index+1].author} \n\n year: ${self.trackList[self.index+1].year}`);

                    self.source.setAttribute("src", self.trackList[self.index+1].audio);
                    self.player.setAttribute("src", self.trackList[self.index+1].audio);
                    self.play();
                    self.index++;
                });

                self.index=0;
                document.querySelector("#song-title-container").setAttribute("value", self.trackList[self.index].title);

                document.querySelector("#meta-data-container").setAttribute("value", `author: ${self.trackList[self.index].author} \n\n year: ${self.trackList[self.index].year}`);

                self.source.setAttribute("src", self.trackList[self.index].audio);
                self.player.setAttribute("src", self.trackList[self.index].audio);

                self.play();
            },
            tether: null,
            makeTextureLoader: function(index){
                var target = index;
                $("#embedded-assets-container").append(`<img id="${target.texture}" src="${target.cover}" preload="true" />`);
            },
            build: function(){
                var self = this;

                self.tether.append(`<a-scene embedded>
                        <a-assets id="embedded-assets-container">
                        <img id="floor-texture" src="../media/texture/grid_pattern.png" preload="true" />
                        <img id="starter" src="../media/img/hov-md.png" preload="true" />
                        <a-asset-item id="crate-obj" src="../media/model/omega.obj"></a-asset-item>
                        <a-asset-item id="crate-mtl" src="../media/model/omega.mtl"></a-asset-item>
                    </a-assets>

                    <a-entity geometry="primitive: plane; width: 2; height: 2;" rotation="0 -180 180" material="side: double; color: red;" position="0  1 -1.5" animation="position: rotation; delay: 3500; dur:2000; to="-110 -180 180" animation__2="property: position; delay: 3500; dur:2000; to: 0 0 -0.5">
                        <a-text id="meta-data-container" rotation="0 0 0" position="0 0 0.5" align="center" value="this is where \n\n the song meta data will go \n\n against  a backdrop \n\n of the album cover" font="https://cdn.aframe.io/fonts/mozillavr.fnt"></a-text>
                    </a-entity>

                    <a-entity geometry="primitive: plane; width: 2; height: 2;" rotation="180 90 0" material="side: double; color: yellow;" position="1 1 -2.5" animation__3="property: rotation; delay: 3500; dur: 2000; to: 290 90 0" animation__4="property: position; delay: 3500; dur:2000; to: 2 0 -2.5">
                        <a-text rotation="0 0 0" position="0 0 0.5" align="center" color="black" value="track list" font="https://cdn.aframe.io/fonts/mozillavr.fnt"></a-text>
                    </a-entity>

                    <a-entity geometry="primitive: plane; width: 2; height: 2;" rotation="0 90 180" material="side: double; color: blue;" position="-1 1 -2.5" animation__5="property: rotation; delay: 3500;dur:2000; to: -110 90 180" animation__6="property: position; delay: 3500; dur:2000; to: -2 0 -2.5">
                        <a-text rotation="0 0 0" position="0 0 0.5" align="center" value="edit" font="https://cdn.aframe.io/fonts/mozillavr.fnt"></a-text></a-entity>

                    <a-entity geometry="primitive: plane; width: 2; height: 2;" rotation="0 0 0" material="side: double; color: aquamarine;" position="0 1 -2.5" animation__7="property: rotation; delay: 3500; dur:2000; to: -110 0 0" animation__8="property: position; delay: 3500; dur:2000; to:0 0 -4.5">
                    </a-entity>

                    <a-entity geometry="primitive: plane; width: 3; height: 0.75;" position="0 4 -2" material="side: double; color: white; opacity: 0" animation__9="property: material.opacity; delay: 3500;dur:2500; easing:linear; to: 0.5">
                        <a-text id="song-title-container" rotation="0 0 0" position="0 0.2 0" align="center" value="song title" font="https://cdn.aframe.io/fonts/mozillavr.fnt" material="opacity: 0;" animation__10="property: material.opacity; delay: 3500; dur:2500; easing: linear; to: 0.5">
                        </a-text>
                    </a-entity>

                    <a-entity geometry="primitive: plane; width: 6; height: 3;" position="0 2 -4.25" material="side: double; color: white; opacity: 0" animation__11="property: material.opacity; delay: 3500; dur:2500; easing: linear; to: 0.5">
                        <a-entity geometry="primitive: plane; width: 2; height: 2;" position="-1.5 0 0.1" material="side: double; color: black; opacity: 0"  text="align: center; value: House of Venus\n\n (c) 2019; color: white; width: 5; font: https://cdn.aframe.io/fonts/mozillavr.fnt" animation__12="property: material.opacity; delay: 3500; dur: 2500; easing: linear; to: 0.5">
                        </a-entity>
                        <a-entity geometry="primitive: plane; width: 2; height: 2;" position="1.5 0 0.1" material="side: double; color: black; opacity: 0" text="align: center; value: VR Audio Player\n\nv. 1.0.0; color: white; width: 5; font: https://cdn.aframe.io/fonts/mozillavr.fnt" animation__13="property: material.opacity; delay: 3500; dur:2500; easing: linear; to: 0.5">
                        </a-entity>
                    </a-entity>

                    <a-entity id="audio-cover-artwork" rotation="0 0 0" scale="0.1 0.1 0.1" position="0 2 -2" geometry="primitive: plane; width: 1; height: 1;" material="side: double; src: #starter;" animation__14="property: rotation; dur:20000; easing: linear; to: 0 360 0; loop: true;" animation="property: scale; delay: 3500; dur: 2500; easing: linear; to: 3 3 3">
                    </a-entity>

                    <a-entity geometry="primitive: plane; width: 100; height: 100;" rotation="-90 0 0" material="src: #floor-texture; repeat: 100 100; opacity: 1.0;" animation__15="property: material.opacity; delay: 3000; dur: 2000; to: 0">
                    </a-entity>

                    <a-entity position="2 0 2" rotation="0 45 0">
                        <a-camera look-controls wasd-controls userHeight="1.8"></a-camera>
                    </a-entity>
                    <a-sky color="skyblue"></a-sky>
                </a-scene>
<input type="button" id="play-previous-track-button" class="skip-track-button" value ="<" />
    <input type="button" id="play-next-track-button" class="skip-track-button" value =">" />
    <div style="position: absolute; width: 300px; height: 55px; border-radius: 25px; display: block; bottom: 5%; left: 50%; margin-left: -150px; z-index: 100; background-color: rgba(255, 255, 255, 0.7); cursor: pointer;">
    <audio id="html5-audio-player" controls>
      <source id="static-selector" src="" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>
</div>`);
                //self.loadCoverTextures();
        }
        }
    },
    view : "scroll", // scroll is the default, list is the secondary option, tertiary mode is the alternative AR or VR view
    XRSetting : "flat" // flat is default, ar is secondary, vr is tertiary
}

// expose log to other modules
module.exports = LyokoVRAudioPlayer;
