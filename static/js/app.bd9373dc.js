(function(){"use strict";var t={5341:function(t,i,e){var n=e(9242),r=e(3396);function s(t,i,e,n,s,a){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(c)}var a={name:"App"},c=e(89);const o=(0,c.Z)(a,[["render",s]]);var u=o,l=e(678),d=e(7139),h=e.p+"static/img/disc.e30f81a9.png";const g=t=>((0,r.dD)("data-v-7fdb065b"),t=t(),(0,r.Cn)(),t),m={id:"box"},p={href:"https://github.com/C01day/music-player",class:"github-corner","aria-label":"View source on GitHub",target:"_blank"},f={width:"80",height:"80",viewBox:"0 0 250 250",style:{fill:"#FF0000",color:"#FFF",position:"absolute",top:"0",border:"0",right:"0"},"aria-hidden":"true"},y=g((()=>(0,r._)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"},null,-1))),b=g((()=>(0,r._)("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{"transform-origin":"130px 106px"},class:"octo-arm"},null,-1))),v=g((()=>(0,r._)("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",class:"octo-body"},null,-1))),S=[y,b,v],w={class:"audioPlayer"},P=g((()=>(0,r._)("span",null,null,-1))),C=g((()=>(0,r._)("span",null,null,-1))),_=g((()=>(0,r._)("span",null,null,-1))),k=[P,C,_],T=["onClick"],A={class:"title"},M={class:"artist"},j={class:"albumImage"},L={class:"albumDetails"},D={class:"playerButtons"},R={class:"timeAndProgress"},E={class:"currentTimeContainer",style:{"text-align":"center"}},x={class:"currentTime"},O={class:"totalTime"};function B(t,i,e,s,a,c){const o=(0,r.up)("v-icon");return(0,r.wg)(),(0,r.iD)("div",m,[(0,r._)("a",p,[((0,r.wg)(),(0,r.iD)("svg",f,S))]),(0,r._)("div",w,[(0,r._)("a",{class:(0,d.C_)(["nav-icon",{isActive:a.isPlaylistActive}]),onClick:i[0]||(i[0]=t=>a.isPlaylistActive=!a.isPlaylistActive),title:"Music List"},k,2),(0,r._)("div",{class:(0,d.C_)(["audioPlayerList",{isActive:a.isPlaylistActive}])},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.musicPlaylist,((t,i)=>((0,r.wg)(),(0,r.iD)("div",{class:(0,d.C_)(["item",{isActive:c.isCurrentSong(i)}]),onClick:t=>(c.changeSong(i),a.isPlaylistActive=!a.isPlaylistActive),key:i},[(0,r._)("p",A,(0,d.zw)(t.title),1),(0,r._)("p",M,(0,d.zw)(t.artist),1)],10,T)))),128))],2),(0,r._)("div",{class:(0,d.C_)(["audioPlayerUI",{isDisabled:a.isPlaylistActive}])},[(0,r._)("div",j,[(0,r.Wm)(n.uT,{name:"fade",mode:"out-in",type:"transition"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("div",{class:(0,d.C_)(["disc-back",a.currentlyPlaying?"":"paused"]),key:a.currentSong},[(0,r._)("img",{onLoad:i[1]||(i[1]=t=>c.onImageLoaded()),src:h,ondragstart:"return false;",class:"disc"},null,32)],2))])),_:1}),((0,r.wg)(),(0,r.iD)("div",{class:"loader",key:a.currentSong},"Loading..."))]),(0,r._)("div",L,[(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("p",{class:"title",key:a.currentSong},(0,d.zw)(a.musicPlaylist[a.currentSong].title),1))])),_:1}),(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("p",{class:"artist",key:a.currentSong},(0,d.zw)(a.musicPlaylist[a.currentSong].artist),1))])),_:1}),(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in",type:"transition"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("div",{class:"page-container",key:a.currentSong},[(0,r._)("div",{class:(0,d.C_)(["wave-container",a.currentlyPlaying?"":"paused"])},[((0,r.wg)(),(0,r.iD)(r.HY,null,(0,r.Ko)(20,(t=>(0,r._)("div",{key:t,class:"wave-bar"}))),64))],2)]))])),_:1})]),(0,r._)("div",D,[(0,r._)("a",{class:(0,d.C_)(["button",{isDisabled:0==a.currentSong}]),onClick:i[2]||(i[2]=t=>c.prevSong()),title:"Previous Song"},[(0,r.Wm)(o,{name:"bi-skip-start-fill",class:"icon",scale:"2"})],2),(0,r.Wm)(n.uT,{name:"fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("a",{class:"button play",onClick:i[3]||(i[3]=t=>c.playPauseAudio()),title:"Play/Pause Song",key:a.currentSong+a.currentlyPlaying},[((0,r.wg)(),(0,r.j4)(o,{name:a.currentlyStopped?"bi-play-circle-fill":a.currentlyPlaying?"hi-solid-pause":"bi-play-circle-fill",key:1,class:"icon",scale:"2",fill:"red"},null,8,["name"]))]))])),_:1}),(0,r._)("a",{class:(0,d.C_)(["button",{isDisabled:a.currentSong==a.musicPlaylist.length-1}]),onClick:i[4]||(i[4]=t=>c.nextSong()),title:"Next Song"},[(0,r.Wm)(o,{name:"bi-skip-end-fill",class:"icon",scale:"2"})],2)]),(0,r._)("div",R,[(0,r._)("div",E,[(0,r._)("span",x,(0,d.zw)(c.currentTimeShow),1),(0,r._)("span",O,(0,d.zw)(c.trackDurationShow),1)]),(0,r._)("div",{class:"currentProgressBar",ref:"progress",onClick:i[5]||(i[5]=(...t)=>c.clickProgress&&c.clickProgress(...t))},[(0,r._)("div",{class:"currentProgress",style:(0,d.j5)({width:a.currentProgressBar+"%"})},null,4)],512)])],2)])])}var F={name:"MusicPlayer",data(){return{audio:"",audioFile:"",imgLoaded:!1,currentlyPlaying:!1,currentlyStopped:!1,currentTime:0,checkingCurrentPositionInTrack:"",trackDuration:0,currentProgressBar:0,isPlaylistActive:!1,currentSong:0,musicPlaylist:[{title:"Bluish Light",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1941658812.mp3",image:"https://web.hycdn.cn/siren/pic/20220503/6fbb2ddca4efb6bb4ff4ead791fb447e.jpg"},{title:"Rapier",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1941656969.mp3",image:"https://web.hycdn.cn/siren/pic/20220502/b08a1ada5fa2a6937ae6c1208a40cb93.jpg"},{title:"March On!",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1936324213.mp3",image:"https://web.hycdn.cn/siren/pic/20220413/784addeeb3f6bd9cd001e3021f3483da.jpg"},{title:"Eternal Flame",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1927441611.mp3",image:"https://web.hycdn.cn/siren/pic/20220314/a79347b6d2e3a57874b552699ce9ee2c.jpg"},{title:"Radiant",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1890402858.mp3",image:"https://web.hycdn.cn/siren/pic/20211101/733831c7d034b83dc78f783f8748cc65.jpg"},{title:"Towards Her Light",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1876956006.mp3",image:"https://web.hycdn.cn/siren/pic/20210916/113f508e9ca2f66642cbb85e7a4699be.jpg"},{title:"Immutable",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1840976599.mp3",image:"https://web.hycdn.cn/siren/pic/20210501/01bdad2a0a6876eaee3c23bf0812a73a.png"},{title:"Stay Gold",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1488275299.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/430cb5399e272d97779cf5f13681628f.jpg"},{title:"Lullabye",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1491503292.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/5fb9a7a5d2045c5c6a16f2c4ed8e08f4.jpg"},{title:"Alive",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1473615924.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/7d9ab6167720f8f4b982c83fbe89ce0b.jpg"},{title:"Evolutionary Mechanization",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1473615377.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/80c0cbb9bec652d21e939586e19aa9ed.jpg"},{title:"Everything's Alright",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1460626792.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/fe18ca43cbf7e7fc3541081d7a62ccef.jpg"},{title:"Requiem",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1444493780.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/14db9942c28a5abba48b9dfe2d99e39a.jpg"},{title:"Renegade",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1444493657.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/40a13076601806e37c5394049cebc5b1.jpg"},{title:"故乡的风",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1431593851.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/c755e05031749ec0d7422078ae3189e7.jpg"},{title:"独行长路",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1427681638.mp3",image:"https://web.hycdn.cn/siren/pic/20210727/d01c9b65184c11ed6fe7b1019a023b16.jpg"},{title:"Speed of Light",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1403774122.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg"}]}},mounted:function(){this.changeSong(this.currentSong,!1),this.audio.loop=!1},filters:{fancyTimeFormat:function(t){return(t-(t%=60))/60+(9<t?":":":0")+t}},methods:{togglePlaylist:function(){this.isPlaylistActive=!this.isPlaylistActive},nextSong:function(){this.currentSong<this.musicPlaylist.length-1&&this.changeSong(this.currentSong+1)},prevSong:function(){this.currentSong>0&&this.changeSong(this.currentSong-1)},changeSong:function(t,i=!0){var e=this.currentlyPlaying;this.imageLoaded=!1,1==i&&this.stopAudio(),this.currentSong=t,this.audioFile=this.musicPlaylist[this.currentSong].url,this.audio=new Audio(this.audioFile);var n=this;this.audio.addEventListener("loadedmetadata",(function(){n.trackDuration=Math.round(this.duration)})),this.audio.addEventListener("ended",this.handleEnded),e&&this.playPauseAudio()},isCurrentSong:function(t){return this.currentSong==t},getCurrentSong:function(t){return this.musicPlaylist[t].url},playPauseAudio:function(){1==this.currentlyStopped&&this.currentSong+1==this.musicPlaylist.length&&(this.currentlyStopped=!1,this.currentSong=0,this.changeSong(this.currentSong,!1)),this.currentlyPlaying?this.stopAudio():this.playAudio()},playAudio:function(){this.getCurrentTimeEverySecond(),this.currentlyPlaying=!0,this.audio.play()},stopAudio:function(){this.audio.pause(),this.currentlyPlaying=!1,clearTimeout(this.checkingCurrentPositionInTrack)},handleEnded:function(){this.currentSong+1==this.musicPlaylist.length?(this.stopAudio(),this.currentlyPlaying=!1,this.currentlyStopped=!0):(this.currentSong++,this.changeSong(this.currentSong))},onImageLoaded:function(){this.imgLoaded=!0},getCurrentTimeEverySecond:function(){var t=this;this.checkingCurrentPositionInTrack=setTimeout(function(){t.currentTime=t.audio.currentTime,t.currentProgressBar=t.audio.currentTime/t.trackDuration*100,t.getCurrentTimeEverySecond()}.bind(this),1e3)},clickProgress:function(t){1==this.currentlyPlaying&&this.stopAudio(),this.updateBar(t.pageX)},updateBar:function(t){var i=this.$refs.progress,e=this.audio.duration,n=t-i.getBoundingClientRect().left,r=100*n/i.offsetWidth;r>100&&(r=100),r<0&&(r=0),this.audio.currentTime=e*r/100,this.currentTime=this.audio.currentTime,this.currentProgressBar=this.currentTime/this.trackDuration*100,this.playPauseAudio()}},watch:{currentTime:function(){this.currentTime=Math.round(this.currentTime)}},computed:{currentTimeShow(){var t=this.currentTime;return(t-(t%=60))/60+(9<t?":":":0")+t},trackDurationShow(){var t=this.trackDuration;return(t-(t%=60))/60+(9<t?":":":0")+t}},beforeUnmount:function(){this.audio.removeEventListener("ended",this.handleEnded),this.audio.removeEventListener("loadedmetadata",this.handleEnded),clearTimeout(this.checkingCurrentPositionInTrack)}};const I=(0,c.Z)(F,[["render",B],["__scopeId","data-v-7fdb065b"]]);var W=I;const z=[{path:"/",name:"MusicPlayer",component:W,meta:{title:"",content:{name:"referrer",content:"no-referrer"}}}],H=(0,l.p7)({history:(0,l.r5)(),routes:z});var Z=e(1858),G=e(1799),X=e(6564),K=e(1479);(0,Z.Go)(G.jod,G.LJI,G.bSD,G.OX6,X.Rl$,X.gAX,X.hpB,K.kbf);const U=(0,n.ri)(u);U.use(H),U.component("v-icon",Z.xt),U.mount("#app")}},i={};function e(n){var r=i[n];if(void 0!==r)return r.exports;var s=i[n]={exports:{}};return t[n](s,s.exports,e),s.exports}e.m=t,function(){var t=[];e.O=function(i,n,r,s){if(!n){var a=1/0;for(l=0;l<t.length;l++){n=t[l][0],r=t[l][1],s=t[l][2];for(var c=!0,o=0;o<n.length;o++)(!1&s||a>=s)&&Object.keys(e.O).every((function(t){return e.O[t](n[o])}))?n.splice(o--,1):(c=!1,s<a&&(a=s));if(c){t.splice(l--,1);var u=r();void 0!==u&&(i=u)}}return i}s=s||0;for(var l=t.length;l>0&&t[l-1][2]>s;l--)t[l]=t[l-1];t[l]=[n,r,s]}}(),function(){e.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(i,{a:i}),i}}(),function(){e.d=function(t,i){for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){e.p=""}(),function(){var t={143:0};e.O.j=function(i){return 0===t[i]};var i=function(i,n){var r,s,a=n[0],c=n[1],o=n[2],u=0;if(a.some((function(i){return 0!==t[i]}))){for(r in c)e.o(c,r)&&(e.m[r]=c[r]);if(o)var l=o(e)}for(i&&i(n);u<a.length;u++)s=a[u],e.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return e.O(l)},n=self["webpackChunkmusic_player"]=self["webpackChunkmusic_player"]||[];n.forEach(i.bind(null,0)),n.push=i.bind(null,n.push.bind(n))}();var n=e.O(void 0,[998],(function(){return e(5341)}));n=e.O(n)})();
//# sourceMappingURL=app.bd9373dc.js.map