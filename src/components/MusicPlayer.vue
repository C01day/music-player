<template>
<div id="box">
	<GithubCorner class="github-corner-out"></GithubCorner>
	<div class="audioPlayer">
		<GithubCorner class="github-corner-in"></GithubCorner>
		<a class="nav-icon" @click="isPlaylistActive=!isPlaylistActive,isUserActive=false" :class="{'isActive': isPlaylistActive}" title="Music List">
				<span></span>
				<span></span>
				<span></span>
		</a>
		<div class="audioPlayerList" :class="{'isActive': isPlaylistActive}">
			<div class="item" v-for="(item,index) in musicPlaylist" :class="{ 'isActive':isCurrentSong(index) }" @click="changeSong(index),isPlaylistActive=!isPlaylistActive" :key="index">
				<p class="title">{{ item.title }}</p>
				<p class="artist">{{ item.artist }}</p>
			</div>
		</div>
		<div class="audioPlayerUI" :class="[{'isDisabled': isPlaylistActive},{'isUserDisabled': isUserActive}]">
			<div class="albumImage">
				<transition name="fade" mode="out-in" type='transition' appear>
					<div :class="['disc-back', currentlyPlaying ? '' : 'paused']" :key="currentSong">
						<img src="../assets/img/disc.png" ondragstart="return false;" class="disc">
						<img v-if="posterLoad" :src="musicPlaylist[currentSong].image" ondragstart="return false;" class="poster">
					</div>
				</transition>
				<!-- <div class="loader" :key="currentSong">Loading...</div> -->
			</div>
			<div class="albumDetails">
				<transition name="slide-fade" mode="out-in" appear>
					<p class="title" :key="currentSong">{{ musicPlaylist[currentSong].title }}</p>
				</transition>
				<transition name="slide-fade" mode="out-in" appear>
					<p class="artist" :key="currentSong">{{ musicPlaylist[currentSong].artist }}</p>
				</transition>
				<transition name="slide-fade" mode="out-in" type='transition' appear>
					<div class="page-container" :key="currentSong">
						<div :class="['wave-container', currentlyPlaying ? '' : 'paused']">
							<div v-for="index in 20" :key="index" class="wave-bar"></div>
						</div>
						<div class="lyric-container-wrapper" v-if="lyricComplete">
							<div :class="['lyric-container', currentlyPlaying ? '' : 'paused']" :style="{ transform: 'translateY(' + lyricHeight[Math.max(lyricIndex, 0)] + 'px)'}">
								<div v-for="(item, index) in lyric" :key="index" :class="['lyric-item', {'isActive': (index==lyricIndex)}]">{{item.text}}</div>
							</div>
						</div>
					</div>
				</transition>
			</div>

			<div class="playerButtons">
				<a class="button" @click="prevSong()" title="Previous Song"><v-icon name="bi-skip-start-fill" class="icon" scale="2" /></a>
				<transition name="fade" mode="out-in" appear>
					<a class="button play" @click="playPauseAudio()" title="Play/Pause Song" :key="currentSong + currentlyPlaying">
						<v-icon :name="currentlyPlaying ? 'hi-solid-pause' : 'bi-play-circle-fill' " :key="1" class="icon" scale="2" fill="red"/>
					</a>
				</transition>
				<a class="button" @click="nextSong()" title="Next Song"><v-icon name="bi-skip-end-fill" class="icon" scale="2" /></a>
				<transition name="mode-slide-fade" mode="out-in">
					<a class="button" id="mode" @click="nextMode()" :title="Mode[modeIndex].title" :key="modeIndex"><v-icon :name="Mode[modeIndex].icon" class="icon" scale="1.2" /></a>
				</transition>
			</div>

			<div class="timeAndProgress">
				<div class="currentTimeContainer">
					<span class="currentTime">{{ currentTimeShow }}</span>
					<span class="totalTime"> {{ trackDurationShow }}</span>
				</div>

				<div class="currentProgressBar" ref="progress" @click="clickProgress">
					<div class="currentProgress" :style="{ width: currentProgressBar + '%' }"></div>
				</div>
			</div>
		</div>
		<a class="user-icon" @click="isUserActive=!isUserActive,isPlaylistActive=false" :class="{'isActive': isUserActive}" title="Music List">
			<span></span>
			<span></span>
			<span></span>
		</a>
		<div class="userList" :class="{'isActive': isUserActive}">
			<img src="../assets/img/disc.png" ondragstart="return false;" class="avatar">
			<el-input v-model="username" placeholder="Please input username" clearable />
			<el-input v-model="password" type="password" placeholder="Please input password" show-password/>
			<el-button-group>
				<el-button color="red" plain>Register</el-button>
				<el-button color="rgba(0, 0, 0, 0.75)">Login</el-button>
			</el-button-group>
		</div>
	</div>
</div>
</template>

<script>
import GithubCorner from './GithubCorner.vue'
export default {
	name: "MusicPlayer",
	components: {
		GithubCorner,
	},
	data() {
		return {
				username:"",
				password: "",
				audio: "",
				lyric: [],
				lyricIndex: -1,
				lyricHeight: [],
				lyricHeightTotalBefore: 0,
				lyricComplete: false,
				posterLoad: false,
				currentlyPlaying: false,
				isPlaylistActive: false,
				isUserActive: false,
				modeIndex: 0,
				currentSong: 0,
				currentTime: 0,
				trackDuration: 0,
				currentProgressBar: 0,
				checkingCurrentPositionInTrack: "",
				// itemRefs: [],
				musicPlaylist: [
					{
						id: "2006550948",
						title: "Flame Shadow",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20221215/fb2e10e1dc62ae835f472c6ac27258b8.jpg",
					},
					{
						id: "1993340899",
						title: "Sentenced",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20221102/b332ec19df34c372e56e2c9a7c8588ac.jpg",
					},
					{
						id: "1990154664",
						title: "Running In The Dark",
						artist: "塞壬唱片-MSR",
						image: "https://p1.music.126.net/xxQXfMnMlJyMlydzVsRcag==/109951167974724190.jpg",
					},
					{
						id: "1988460950",
						title: "Rekindle",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20221012/2f8846f585301f0cd6892db6bf1f3769.jpg",
					},
					{
						id: "1978870845",
						title: "Ensheath",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220907/f4fbe128f184c617df3c597bcefb6687.jpg",
					},
					{
						id: "1975296386",
						title: "Operation Ashring",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220826/5dff26633eccf4654a47098f0f45387f.jpg",
					},
					{
						id: "1971052096",
						title: "Undertopia",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220811/3de44c2c9bd878319779fd5c6f870bab.jpg",
					},
					{
						id: "1948689820",
						title: "Operation Deepness",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220520/e5cc4eff1a6b7ebd69072470238b5fe2.jpg",
					},
					{
						id: "1941658812",
						title: "Bluish Light",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220503/6fbb2ddca4efb6bb4ff4ead791fb447e.jpg",
					},
					{
						id: "1941656969",
						title: "Rapier",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220502/b08a1ada5fa2a6937ae6c1208a40cb93.jpg",
					},
					{
						id: "1941653825",
						title: "Awaken",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220501/7c4d1d285ef83744b167bbdadb29d239.jpg",
					},
					{
						id: "1936324213",
						title: "March On!",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220413/784addeeb3f6bd9cd001e3021f3483da.jpg",
					},
					{
						id: "1927441611",
						title: "Eternal Flame",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220314/a79347b6d2e3a57874b552699ce9ee2c.jpg",
					},
					{
						id: "1922637266",
						title: "Operation Dawnseeker",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20220225/78ad118924912a39738aaeaf252be1a6.jpg",
					},
					{
						id: "1893260974",
						title: "Operation Lead Seal",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20211109/e72022facca61c0ddfb0ab82c8e515b7.jpg",
					},
					{
						id: "1890402858",
						title: "Radiant",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20211101/733831c7d034b83dc78f783f8748cc65.jpg",
					},
					{
						id: "1876956006",
						title: "Towards Her Light",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210916/113f508e9ca2f66642cbb85e7a4699be.jpg",
					},
					{
						id: "1840976599",
						title: "Immutable",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210501/01bdad2a0a6876eaee3c23bf0812a73a.png",
					},
					{
						id: "1832392174",
						title: "Operation Blade",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210325/923286f4ab26284016de9ed03150fad7.jpg",
					},
					{
						id: "1491503292",
						title: "Lullabye",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/5fb9a7a5d2045c5c6a16f2c4ed8e08f4.jpg",
					},
					{
						id: "1488275299",
						title: "Stay Gold",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/430cb5399e272d97779cf5f13681628f.jpg",
					},
					{
						id: "1473615924",
						title: "Alive",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/7d9ab6167720f8f4b982c83fbe89ce0b.jpg",
					},
					{
						id: "1473615377",
						title: "Evolutionary Mechanization",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/80c0cbb9bec652d21e939586e19aa9ed.jpg",
					},
					{
						id: "1460626792",
						title: "Everything's Alright",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/fe18ca43cbf7e7fc3541081d7a62ccef.jpg",
					},
					{
						id: "1444493780",
						title: "Requiem",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/14db9942c28a5abba48b9dfe2d99e39a.jpg",
					},
					{
						id: "1444493657",
						title: "Renegade",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/40a13076601806e37c5394049cebc5b1.jpg",
					},
					{
						id: "1431593851",
						title: "故乡的风",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/c755e05031749ec0d7422078ae3189e7.jpg",
					},
					{
						id: "1427681638",
						title: "独行长路",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210727/d01c9b65184c11ed6fe7b1019a023b16.jpg",
					},
					{
						id: "1403774122",
						title: "Speed of Light",
						artist: "塞壬唱片-MSR",
						image: "https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg",
					},
					// {
					// 	id: "464674427",
					// 	title: "Symphony",
					// 	artist: "Zara Larsson / Clean Bandit",
					// },
					{
						id: "1927389937",
						title: "Bones",
						artist: "Imagine Dragons",
					},
					{
						id: "28068202",
						title: "Carol of the Bells",
						artist: "Pentatonix",
					},
				],
				Mode: [
					{
						title: "顺序播放/Order Play",
						icon: "ri-order-play-fill"
					},
					{
						title: "随机播放/Shuffle Play",
						icon: "ri-shuffle-fill"
					},
					{
						title: "单曲循环/Single Cycle",
						icon: "ri-repeat-one-fill"
					},
				],
		};
	},
	methods: {
		timeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		},
		timeMillisecond: function(s) {
			const splitTime = s.split(":").map((item) => Number(item));
			return splitTime[0] * 60 + splitTime[1];
		},
		formatLyric: async function(url) {
			var that = this;
			this.lyricComplete = false;
			await this.jsonp(url).then(response => {
				if(response.nolyric) lyric = [];
				else if(response.lyric){
					var lyric = response.lyric;
					lyric = lyric.split("\n");
					lyric = lyric.map((item) => {
						var splitLyric = item.split("]");
						var result = {
							time: that.timeMillisecond(splitLyric[0].slice(1)),
							text: splitLyric[1]
						}
						return result;
					});
					if(lyric[0].text == "") lyric = lyric.slice(1);
				}
				that.lyric = lyric;
				that.lyricIndex = -1;
				that.lyricHeightTotalBefore = 0;
				that.lyricComplete = true;
					// console.log("lyric formated")
			});
			await this.updateHeight();
			// return this.axios.get(url).then(response => response.data);
		},
		// 大于i的最小index
		binarySearch: function(L, R) {
			while(L < R){
				var mid = Math.floor((L + R) / 2);
				if(Number(this.lyric[mid].time) <= Number(this.audio.currentTime)) {
					L = mid + 1;
				} else {
					R = mid;
				}
			}
			if(Number(this.lyric[L].time) <= Number(this.audio.currentTime)) return L;
			return L - 1;
		},
		nextMode: function() {
			this.modeIndex = (this.modeIndex + 1) % this.Mode.length;
		},
		nextIndex: function() {
			switch (this.modeIndex) {
				case 0:
					this.currentSong = (this.currentSong + 1) % this.musicPlaylist.length;
					break;
				case 1:
					this.currentSong = Math.floor(Math.random() * this.musicPlaylist.length);
					break;
			}
			return this.currentSong;
		},
		prevIndex: function() {
			switch (this.modeIndex) {
				case 0:
					this.currentSong = (this.currentSong - 1 + this.musicPlaylist.length) % this.musicPlaylist.length;
					break;
				case 1:
					this.currentSong = Math.floor(Math.random() * this.musicPlaylist.length);
					break;
			}
			return this.currentSong;
		},
		nextSong: function() {
			this.changeSong(this.nextIndex());
		},
		prevSong: function() {
			this.changeSong(this.prevIndex());
		},
		changeSong: async function(index, pausePrev = true) {
			var that = this;
			var wasPlaying = this.currentlyPlaying;
			if (pausePrev == true) {
				this.stopAudio();
			}
			this.currentSong = index;
			await new Promise((resolve, reject) => {
				// console.log("get music")
				var audioFile = "http://music.163.com/song/media/outer/url?id=" + 
								that.musicPlaylist[that.currentSong].id + ".mp3";
				that.audio = new Audio(audioFile);
				resolve();
			})
			
			await new Promise((resolve, reject) => {
				// console.log("get lyric")
				var lyricFile = "http://music.163.com/api/song/media?id=" + 
								that.musicPlaylist[that.currentSong].id;
				that.formatLyric(lyricFile);
				resolve();
			})

			this.posterLoad = false;
			if(this.musicPlaylist[this.currentSong].image !== undefined) this.posterLoad = true;

			this.audio.addEventListener("loadedmetadata", this.getTrackDuration);
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playPauseAudio();
			}
		},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		playPauseAudio: function() {
			if (!this.currentlyPlaying) {
				this.playAudio();
			} else {
				this.stopAudio();
			}
		},
		playAudio: function() {
			this.getCurrentTimeEverySecond();
			this.currentlyPlaying = true;
			this.audio.play();
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			clearTimeout(this.checkingCurrentPositionInTrack);
		},
		getTrackDuration: function() {
			this.trackDuration = Math.round(this.audio.duration);
		},
		handleEnded: function() {
			this.changeSong(this.nextIndex());
		},
		getCurrentTimeEverySecond: function() {
			var that = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					that.currentTime = that.audio.currentTime;
					that.currentProgressBar =
						that.audio.currentTime / that.trackDuration * 100;
					that.getCurrentTimeEverySecond();
				}.bind(this),
				1000
			);
		},
		clickProgress: function(event){
			if(this.currentlyPlaying == true){
				this.stopAudio();
			}
			this.updateBar(event.pageX);
		},
		updateBar: function(x){
			var progress = this.$refs.progress;
			var maxduration = this.audio.duration;
			var position = x - progress.getBoundingClientRect().left;
			var percentage = (100 * position) / progress.offsetWidth;
			if (percentage > 100) {
				percentage = 100;
			}
			if (percentage < 0) {
				percentage = 0;
			}
			this.audio.currentTime = (maxduration * percentage) / 100;
			this.currentTime = this.audio.currentTime;
			this.currentProgressBar = this.currentTime / this.trackDuration * 100;
			if(this.lyric.length!=0){
				this.lyricIndex = this.binarySearch(0, this.lyric.length - 1);
			}
			this.playPauseAudio();
		},
		// setItemRef(element) {
		// 	this.itemRefs.push(element);
		// },
		updateHeight: function() {
			// console.log("update height")
			var that = this;
			return new Promise((resolve, reject) => {
				var lyricElement = document.querySelectorAll(".lyric-item");
					// setTimeout(
					// 	function() {
					// 		that.updateHeight();
					// 	}.bind(that),
					// 1000
					// );
				var lyricWrapper = document.querySelector(".lyric-container-wrapper");
				that.lyricHeight = [];
				for(var i = 0; i < that.lyric.length; i++){
					if(i == 0){
						that.lyricHeight.push(lyricWrapper.getBoundingClientRect().height*0.42);
						continue;
					}
					that.lyricHeight.push(that.lyricHeight[i-1] -
					lyricElement[i-1].getBoundingClientRect().height);
				}
				console.log("lyricHeight:"+that.lyricHeight[that.lyricHeight.length-1])
				resolve();
			})
		},
	},
	mounted() {
		this.changeSong(this.currentSong, false);
		this.audio.loop = false;
	},
	// beforeUpdate() {
    // 	this.itemRefs = [];
  	// },
	updated() {
		if(this.lyric.length!=0 && this.lyricHeightTotalBefore != this.lyricHeight[this.lyricHeight.length-1]){
			this.lyricHeightTotalBefore = this.lyricHeight[this.lyricHeight.length-1]
			this.$nextTick(function(){
				this.updateHeight();
			})
		}
  	},
	watch: {
		currentTime: function() {
			if(this.lyricIndex + 1 <= this.lyric.length - 1 && 
			this.currentTime >= this.lyric[this.lyricIndex + 1].time){
				this.lyricIndex++;
				console.log(this.lyricIndex);
			}
			this.currentTime = Math.round(this.currentTime);
		},
		// lyric: function() {
		// 	var that = this;
		// 	this.$nextTick(function(){
		// 		that.updateHeight();
		// 	})
		// },
	},
	computed: {
		currentTimeShow() {
			return this.timeFormat(this.currentTime);
		},
		trackDurationShow() {
			return this.timeFormat(this.trackDuration);
		},
	},
	beforeUnmount: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.getTrackDuration);

		clearTimeout(this.checkingCurrentPositionInTrack);
	}
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&family=Montserrat&family=Raleway&display=swap');
@font-face
	font-family Bender
	src url(../assets/fonts/Bender.woff)
@font-face
	font-family Geometos
	src url(../assets/fonts/Geometos.woff)
* 
	box-sizing border-box
.animated 
	animation-duration 0.5s
.github-corner-out
	display none
.github-corner-in
	display inline-block
#box
	margin 0 auto
	width 100%
	height 100vh
	padding 0.5rem
	.audioPlayer
		background-color #FFF
		position relative
		width 100%
		max-width 800px
		min-height 25rem
		overflow hidden
		padding 1.5rem
		margin auto 0
		border 1px solid #eaeaea
		border-radius 0.5rem
		transition all ease .3s 
		user-select none
		left 50%
		top 50%
		transform translate(-50%,-50%)
		&:hover
			border 1px solid transparent 
			transform translate(-50%, -51%)
			box-shadow 0 2px 16px 0 rgba(27, 35, 47, .2)
		.nav-icon 
			width 15px
			height 12px
			position absolute
			top 1.125rem
			left 1.5rem
			transform rotate(0deg)
			transition 0.25s ease-in-out
			cursor pointer
			span 
				display block
				position absolute
				height 1.8px
				width 100%
				background rgba(0, 0, 0, 0.75)
				border-radius 6px
				opacity 1
				left 0
				transform rotate(0deg)
				transition 0.5s ease-in-out
				&:nth-child(1) 
					top 0px
				&:nth-child(2) 
					top 5px
				&:nth-child(3) 
					top 10px
			&.isActive 
				span 
					&:nth-child(1) 
						top 5px
						transform rotate(135deg)
					&:nth-child(2) 
						opacity 0
						left -60px
					&:nth-child(3) 
						top 5px
						transform rotate(-135deg)
		.user-icon
			width 15px
			height 12px
			position absolute
			top 1.125rem
			right 1.5rem
			transform rotate(0deg)
			transition 0.25s ease-in-out
			cursor pointer
			span
				display block
				position absolute
				height 1.8px
				width 100%
				background rgba(0, 0, 0, 0.75)
				border-radius 6px
				opacity 1
				left 0
				transform rotate(0deg)
				transition 0.5s ease-in-out
				&:nth-child(1)
					top 0px
				&:nth-child(2)
					top 5px
				&:nth-child(3)
					top 10px
			&.isActive
				span
					&:nth-child(1)
						top 5px
						transform rotate(135deg)
					&:nth-child(2)
						opacity 0
						left 60px
					&:nth-child(3)
						top 5px
						transform rotate(-135deg)
		.audioPlayerList 
			color rgba(0, 0, 0, 0.75)
			width 17rem
			height 90%
			transition 0.5s
			transform translateX(-200%)
			position absolute
			margin-top 1.5rem
			overflow scroll
			z-index 10
			will-change transform
			&.isActive 
				transform translateX(0)
			.item 
				margin-bottom 1.5rem
				border-left 0.1rem solid transparent
				transition 0.2s
				&:hover 
					padding-left 0.5rem
					cursor pointer
				.title 
					color rgba(0, 0, 0, 1)
					font-family 'Montserrat'
					font-size 1.2rem
					margin 0.2rem 0
				.artist 
					color rgba(0, 0, 0, 0.5)
					font-family 'Montserrat'
					font-size 0.8rem
					margin 0.2rem 0
				&.isActive 
					border-left-color black
					padding-left 1rem
					.title
						color red
		.userList
			color rgba(0, 0, 0, 0.75)
			width 17rem
			height 90%
			transition 0.5s
			transform translateX(200%)
			position absolute
			top 1.125rem
			right 1.5rem
			margin-top 1.5rem
			overflow scroll
			z-index 10
			will-change transform
			display flex
			flex-direction column
			align-items center
			&.isActive
				transform translateX(0)
			.avatar
				width 8rem
				height 8rem
				z-index 10
				object-fit cover
				object-position 50% 50%
				border-radius 50%
				margin 0.8rem auto
			.el-button-group
				width 13rem
				margin-top 1rem
				.el-button
					width 50%
					height 2.4rem
					font-size 1rem
					font-family 'Montserrat'
			.el-input
				margin-top 1rem
				border-left 0.1rem solid transparent
				transition 0.2s
				width 13rem
				height 2.7rem
				font-size 1rem
				--el-input-icon-color rgba(0, 0, 0, 0.75)
				--el-input-border-color rgba(0, 0, 0, 0.75)
				--el-input-placeholder-color rgba(0, 0, 0, 0.75)
				--el-input-focus-border-color red
				--el-input-hover-border-color red
				&:hover
					padding-left 0.5rem
					cursor pointer
				>>> .el-input__inner
					font-family 'Montserrat'
					color red

				.title
					color rgba(0, 0, 0, 1)
					font-family 'Montserrat'
					font-size 1.2rem
					margin 0.2rem 0
				.artist
					color rgba(0, 0, 0, 0.5)
					font-family 'Montserrat'
					font-size 0.8rem
					margin 0.2rem 0
				&.isActive
					border-left-color black
					padding-left 1rem
		.audioPlayerUI 
			margin-top 1.5rem
			will-change transform
			transition 0.5s
			&.isDisabled 
				transform scale(0.8) translateX(40%)
				filter blur(0.12rem)
			&.isUserDisabled
				transform scale(0.8) translateX(-40%)
				filter blur(0.12rem)
			.albumDetails 
				text-align center
				margin 2rem 0 1.5rem 0
				p
					line-height 1.7 
					margin 0px
					&.title
						font-family Geometos 
						font-size 1.2rem
						color rgba(0, 0, 0, 1)
						margin 0.2rem 0
					&.artist 
						margin 0.2rem 0
						font-family 'Montserrat'
						font-size 0.8rem
						font-weight none
						color rgba(0, 0, 0, 0.75)
						transition-delay 100ms
				.page-container
					// display none
					display inline-block
					margin 0.2rem 0
					position relative
					background-color #FFF
					.lyric-container-wrapper
						margin 1rem 0
						height 8.5rem
						overflow hidden
						mask linear-gradient(180deg,transparent,#fff 10%,#fff 90%,transparent) top
						.lyric-container
							font-family 'Montserrat'
							transition ease 0.3s
							height 800vh
							display inline-block
							position relative
							overflow scroll
							.isActive
								color #FF0000
					.wave-container
						position relative
						.wave-bar
							display inline-block
							width 10px
							height 50px
							margin auto 0.07rem
							background-color #000
							animation beat1 1s infinite
							transform-origin 0 100%
							transform scaleY(0.1)
							&:nth-child(2n) 
								animation-name beat2
								animation-delay 0.2s
								background-color #FF0000
							&:nth-child(3n) 
								animation-name beat3
								animation-delay 0.5s
								animation-duration 0.5s
								background-color #BBB
							&:nth-child(4n) 
								animation-name beat2
								animation-delay 0.4s
								animation-duration 0.8s
							&:nth-child(5n) 
								animation-delay 0.6s
							&:nth-child(6n) 
								animation-delay 0.2s
								background-color #DDD
						&.paused
							.wave-bar
								animation-play-state paused
			.albumImage 
				width 17rem
				height 17rem
				overflow hidden
				margin 0 auto
				.disc-back
					animation rotate 20s linear infinite
					width 17rem
					height 17rem
					border-radius 50%
					background rgba(0, 0, 0, 0.2)
					display flex
					justify-content center
					align-items center
					.disc
						width 90%
						height 90%
						z-index 10
						object-fit cover
						object-position 50% 50%
						border-radius 50%
						margin 0 auto
					.poster
						position absolute
						width 50%
						height 50%
						z-index 15
						object-fit cover
						object-position 50% 50%
						border-radius 50%
						margin 0 auto
					&.paused
						animation-play-state paused
			.playerButtons 
				position relative
				margin 0 auto
				text-align center
				.button
					display inline-block
					position relative
					vertical-align middle
					padding 0.5rem
					margin 0 0.25rem
					color rgba(0, 0, 0, 0.75)
					border-radius 50%
					outline 0
					text-decoration none
					cursor pointer
					transition 0.5s
					&#mode
						transition 0.3s ease-in-out
					&.play
						margin 0 auto
					&:active 
						opacity 0.75
						transform scale(0.75)
					&.isDisabled 
						color rgba(0, 0, 0, 0.2)
						cursor initial
						&:active 
							transform none
					.icon
						display flex
			.currentTimeContainer
				width 100%
				height 1rem
				display flex
				justify-content space-between
			.currentProgressBar 
				width 100%
				background-color rgba(0, 0, 0, 0.1)
				margin 0.75rem 0
				.currentProgress 
					background-color rgba(0, 0, 0, 0.75)
					width 0px
					height 2px
					transition 100ms
.audioPlayer .audioPlayerUI .currentTimeContainer .currentTime, .audioPlayer .audioPlayerUI .currentTimeContainer .totalTime 
	font-size 0.8rem
	font-family Bender !important
	color rgba(0, 0, 0, 0.75)

.slide-fade-enter-active 
	transition all 0.3s ease
.slide-fade-leave-active 
	transition all 0.2s cubic-bezier(1, 0.5, 0.8, 1)
.slide-fade-enter-from, .slide-fade-leave-to 
	transform translateY(10px)
	opacity 0
.fade-enter-active, .fade-leave-active 
	transition opacity 0.5s
.fade-enter-from, .fade-leave-to 
	opacity 0

.mode-slide-fade-enter-active, .mode-slide-fade-leave-active
	transition all 0.3s ease
.mode-slide-fade-enter-from, .mode-slide-fade-leave-active
	opacity 0
.mode-slide-fade-enter-from
	transform translateY(10px)
.mode-slide-fade-leave-active
	transform translateY(-10px)

::-webkit-scrollbar
	width 0 !important
	height 0
	display none

@keyframes rotate 
	from
		transform rotate(0deg)
	to
		transform rotate(359deg)
@keyframes beat1
	0% 
		transform scaleY(0)
	50%
		transform scaleY(0.7)
	100%
		transform scaleY(0)

@keyframes beat2
	0%
		transform scaleY(0)
	50%
		transform scaleY(0.5)
	100% 
		transform scaleY(0)

@keyframes beat3
	0%
		transform scaleY(0)
	50% 
		transform scaleY(0.3)
	100% 
		transform scaleY(0)

@media (min-width: 719px)
	.github-corner-out
		display inline-block
	.github-corner-in
		display none
	.audioPlayerUI
		display grid
		grid-template-columns 1fr 1fr
		grid-template-areas "a b" "c d"
		.albumDetails 
			text-align left !important
			margin 0 0 0 3.6rem !important
			.page-container
				display inline-block !important
		.albumImage 
			width 17rem
			height 17rem
			overflow hidden
			margin 0 auto
		.playerButtons
			width 18rem
			position relative
			margin 0 0.7rem !important
			text-align center
		.timeAndProgress
			grid-area c
			margin auto 0.2rem
</style>