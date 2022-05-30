(function(){"use strict";var t={8960:function(t,i,e){var n=e(9242),r=e(3396);function s(t,i,e,n,s,a){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(c)}var a={name:"App"},c=e(89);const o=(0,c.Z)(a,[["render",s]]);var u=o,l=e(678),d=e(7139),h=e.p+"static/img/disc.e30f81a9.png";const g=t=>((0,r.dD)("data-v-b81a0c04"),t=t(),(0,r.Cn)(),t),m={id:"box"},p={class:"audioPlayer"},f=g((()=>(0,r._)("span",null,null,-1))),y=g((()=>(0,r._)("span",null,null,-1))),v=g((()=>(0,r._)("span",null,null,-1))),b=[f,y,v],S=["onClick"],P={class:"title"},w={class:"artist"},_={class:"albumImage"},k={class:"albumDetails"},T={class:"playerButtons"},C={class:"timeAndProgress"},A={class:"currentTimeContainer",style:{"text-align":"center"}},D={class:"currentTime"},j={class:"totalTime"};function M(t,i,e,s,a,c){const o=(0,r.up)("v-icon");return(0,r.wg)(),(0,r.iD)("div",m,[(0,r._)("div",p,[(0,r._)("a",{class:(0,d.C_)(["nav-icon",{isActive:a.isPlaylistActive}]),onClick:i[0]||(i[0]=t=>a.isPlaylistActive=!a.isPlaylistActive),title:"Music List"},b,2),(0,r._)("div",{class:(0,d.C_)(["audioPlayerList",{isActive:a.isPlaylistActive}])},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.musicPlaylist,((t,i)=>((0,r.wg)(),(0,r.iD)("div",{class:(0,d.C_)(["item",{isActive:c.isCurrentSong(i)}]),onClick:t=>(c.changeSong(i),a.isPlaylistActive=!a.isPlaylistActive),key:i},[(0,r._)("p",P,(0,d.zw)(t.title),1),(0,r._)("p",w,(0,d.zw)(t.artist),1)],10,S)))),128))],2),(0,r._)("div",{class:(0,d.C_)(["audioPlayerUI",{isDisabled:a.isPlaylistActive}])},[(0,r._)("div",_,[(0,r.Wm)(n.uT,{name:"fade",mode:"out-in",type:"transition"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("div",{class:(0,d.C_)(["disc-back",a.currentlyPlaying?"":"paused"]),key:a.currentSong},[(0,r._)("img",{onLoad:i[1]||(i[1]=t=>c.onImageLoaded()),src:h,ondragstart:"return false;",class:"disc"},null,32)],2))])),_:1}),((0,r.wg)(),(0,r.iD)("div",{class:"loader",key:a.currentSong},"Loading..."))]),(0,r._)("div",k,[(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("p",{class:"title",key:a.currentSong},(0,d.zw)(a.musicPlaylist[a.currentSong].title),1))])),_:1}),(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("p",{class:"artist",key:a.currentSong},(0,d.zw)(a.musicPlaylist[a.currentSong].artist),1))])),_:1}),(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in",type:"transition"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.iD)("div",{class:"page-container",key:a.currentSong},[(0,r._)("div",{class:(0,d.C_)(["wave-container",a.currentlyPlaying?"":"paused"])},[((0,r.wg)(),(0,r.iD)(r.HY,null,(0,r.Ko)(20,(t=>(0,r._)("div",{key:t,class:"wave-bar"}))),64))],2)]))])),_:1})]),(0,r._)("div",T,[(0,r._)("a",{class:(0,d.C_)(["button",{isDisabled:0==a.currentSong}]),onClick:i[2]||(i[2]=t=>c.prevSong()),title:"Previous Song"},[(0,r.Wm)(o,{name:"bi-skip-start-fill",class:"icon",scale:"2"})],2),(0,r._)("a",{class:"button play",onClick:i[3]||(i[3]=t=>c.playAudio()),title:"Play/Pause Song"},[(0,r.Wm)(n.uT,{name:"slide-fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.j4)(o,{name:a.currentlyStopped?"bi-play-circle-fill":a.currentlyPlaying?"hi-solid-pause":"bi-play-circle-fill",key:1,class:"icon",scale:"2",fill:"red"},null,8,["name"]))])),_:1})]),(0,r._)("a",{class:(0,d.C_)(["button",{isDisabled:a.currentSong==a.musicPlaylist.length-1}]),onClick:i[4]||(i[4]=t=>c.nextSong()),title:"Next Song"},[(0,r.Wm)(o,{name:"bi-skip-end-fill",class:"icon",scale:"2"})],2)]),(0,r._)("div",C,[(0,r._)("div",A,[(0,r._)("span",D,(0,d.zw)(c.currentTimeShow),1),(0,r._)("span",j,(0,d.zw)(c.trackDurationShow),1)]),(0,r._)("div",{class:"currentProgressBar",ref:"progress",onClick:i[5]||(i[5]=(...t)=>c.clickProgress&&c.clickProgress(...t))},[(0,r._)("div",{class:"currentProgress",style:(0,d.j5)({width:a.currentProgressBar+"%"})},null,4)],512)])],2)])])}var L={name:"MusicPlayer",data(){return{audio:"",audioFile:"",imgLoaded:!1,currentlyPlaying:!1,currentlyStopped:!1,currentTime:0,checkingCurrentPositionInTrack:"",trackDuration:0,currentProgressBar:0,isPlaylistActive:!1,currentSong:0,musicPlaylist:[{title:"Eternal Flame",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1927441611.mp3",image:"https://web.hycdn.cn/siren/pic/20220314/a79347b6d2e3a57874b552699ce9ee2c.jpg"},{title:"Radiant",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1890402858.mp3",image:"https://web.hycdn.cn/siren/pic/20211101/733831c7d034b83dc78f783f8748cc65.jpg"},{title:"Immutable",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1840976599.mp3",image:"https://web.hycdn.cn/siren/pic/20210501/01bdad2a0a6876eaee3c23bf0812a73a.png"},{title:"Stay Gold",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1488275299.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/430cb5399e272d97779cf5f13681628f.jpg"},{title:"Lullabye",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1491503292.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/5fb9a7a5d2045c5c6a16f2c4ed8e08f4.jpg"},{title:"Alive",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1473615924.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/7d9ab6167720f8f4b982c83fbe89ce0b.jpg"},{title:"Evolutionary Mechanization",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1473615377.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/80c0cbb9bec652d21e939586e19aa9ed.jpg"},{title:"独行长路",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1427681638.mp3",image:"https://web.hycdn.cn/siren/pic/20210727/d01c9b65184c11ed6fe7b1019a023b16.jpg"},{title:"Speed of Light",artist:"塞壬唱片-MSR",url:"http://music.163.com/song/media/outer/url?id=1403774122.mp3",image:"https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg"}]}},mounted:function(){this.changeSong(),this.audio.loop=!1},filters:{fancyTimeFormat:function(t){return(t-(t%=60))/60+(9<t?":":":0")+t}},methods:{togglePlaylist:function(){this.isPlaylistActive=!this.isPlaylistActive},nextSong:function(){this.currentSong<this.musicPlaylist.length-1&&this.changeSong(this.currentSong+1)},prevSong:function(){this.currentSong>0&&this.changeSong(this.currentSong-1)},changeSong:function(t){var i=this.currentlyPlaying;this.imageLoaded=!1,void 0!==t&&(this.stopAudio(),this.currentSong=t),this.audioFile=this.musicPlaylist[this.currentSong].url,this.audio=new Audio(this.audioFile);var e=this;this.audio.addEventListener("loadedmetadata",(function(){e.trackDuration=Math.round(this.duration)})),this.audio.addEventListener("ended",this.handleEnded),i&&this.playAudio()},isCurrentSong:function(t){return this.currentSong==t},getCurrentSong:function(t){return this.musicPlaylist[t].url},playAudio:function(){1==this.currentlyStopped&&this.currentSong+1==this.musicPlaylist.length&&(this.currentSong=0,this.changeSong()),this.currentlyPlaying?this.stopAudio():(this.getCurrentTimeEverySecond(),this.currentlyPlaying=!0,this.audio.play()),this.currentlyStopped=!1},stopAudio:function(){this.audio.pause(),this.currentlyPlaying=!1,this.pausedMusic()},handleEnded:function(){this.currentSong+1==this.musicPlaylist.length?(this.stopAudio(),this.currentlyPlaying=!1,this.currentlyStopped=!0):(this.currentlyPlaying=!1,this.currentSong++,this.changeSong(),this.playAudio())},onImageLoaded:function(){this.imgLoaded=!0},getCurrentTimeEverySecond:function(){var t=this;this.checkingCurrentPositionInTrack=setTimeout(function(){t.currentTime=t.audio.currentTime,t.currentProgressBar=t.audio.currentTime/t.trackDuration*100,t.getCurrentTimeEverySecond()}.bind(this),1e3)},pausedMusic:function(){clearTimeout(this.checkingCurrentPositionInTrack)},clickProgress:function(t){this.stopAudio(),this.updateBar(t.pageX)},updateBar:function(t){var i=this.$refs.progress,e=this.audio.duration,n=t-i.getBoundingClientRect().left,r=100*n/i.offsetWidth;r>100&&(r=100),r<0&&(r=0),this.audio.currentTime=e*r/100,this.currentTime=this.audio.currentTime,this.currentProgressBar=this.currentTime/this.trackDuration*100,this.playAudio()}},watch:{currentTime:function(){this.currentTime=Math.round(this.currentTime)}},computed:{currentTimeShow(){var t=this.currentTime;return(t-(t%=60))/60+(9<t?":":":0")+t},trackDurationShow(){var t=this.trackDuration;return(t-(t%=60))/60+(9<t?":":":0")+t}},beforeUnmount:function(){this.audio.removeEventListener("ended",this.handleEnded),this.audio.removeEventListener("loadedmetadata",this.handleEnded),clearTimeout(this.checkingCurrentPositionInTrack)}};const E=(0,c.Z)(L,[["render",M],["__scopeId","data-v-b81a0c04"]]);var O=E;const R=[{path:"/",name:"MusicPlayer",component:O,meta:{title:"",content:{name:"referrer",content:"no-referrer"}}}],I=(0,l.p7)({history:(0,l.r5)(),routes:R});var x=e(1858),B=e(1799),W=e(6564),z=e(1479);(0,x.Go)(B.jod,B.LJI,B.bSD,B.OX6,W.Rl$,W.gAX,W.hpB,z.kbf);const F=(0,n.ri)(u);F.use(I),F.component("v-icon",x.xt),F.mount("#app")}},i={};function e(n){var r=i[n];if(void 0!==r)return r.exports;var s=i[n]={exports:{}};return t[n](s,s.exports,e),s.exports}e.m=t,function(){var t=[];e.O=function(i,n,r,s){if(!n){var a=1/0;for(l=0;l<t.length;l++){n=t[l][0],r=t[l][1],s=t[l][2];for(var c=!0,o=0;o<n.length;o++)(!1&s||a>=s)&&Object.keys(e.O).every((function(t){return e.O[t](n[o])}))?n.splice(o--,1):(c=!1,s<a&&(a=s));if(c){t.splice(l--,1);var u=r();void 0!==u&&(i=u)}}return i}s=s||0;for(var l=t.length;l>0&&t[l-1][2]>s;l--)t[l]=t[l-1];t[l]=[n,r,s]}}(),function(){e.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(i,{a:i}),i}}(),function(){e.d=function(t,i){for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){e.p=""}(),function(){var t={143:0};e.O.j=function(i){return 0===t[i]};var i=function(i,n){var r,s,a=n[0],c=n[1],o=n[2],u=0;if(a.some((function(i){return 0!==t[i]}))){for(r in c)e.o(c,r)&&(e.m[r]=c[r]);if(o)var l=o(e)}for(i&&i(n);u<a.length;u++)s=a[u],e.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return e.O(l)},n=self["webpackChunkmusic_player"]=self["webpackChunkmusic_player"]||[];n.forEach(i.bind(null,0)),n.push=i.bind(null,n.push.bind(n))}();var n=e.O(void 0,[998],(function(){return e(8960)}));n=e.O(n)})();
//# sourceMappingURL=app.c0bac28f.js.map