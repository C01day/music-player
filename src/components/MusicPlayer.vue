<template>
<div id="box">
	<div class="audioPlayer">
		<a class="nav-icon" v-on:click="isPlaylistActive=!isPlaylistActive" :class="{'isActive': isPlaylistActive}" title="Music List">
				<span></span>
				<span></span>
				<span></span>
		</a>
		<div class="audioPlayerList" :class="{'isActive': isPlaylistActive}">
			<div class="item" v-for="(item,index) in musicPlaylist" v-bind:class="{ 'isActive':isCurrentSong(index) }" v-on:click="changeSong(index),isPlaylistActive=!isPlaylistActive" :key="index">
				<p class="title">{{ item.title }}</p>
				<p class="artist">{{ item.artist }}</p>
			</div>
		</div>
		<div class="audioPlayerUI" :class="{'isDisabled': isPlaylistActive}">
			<div class="albumImage">
				<transition name="fade" mode="out-in" type='transition'>
					<div :class="['disc-back', currentlyPlaying ? '' : 'paused']" :key="currentSong">
						<img @load="onImageLoaded()" src="../assets/img/disc.png" ondragstart="return false;" class="disc">
						<!-- <img @load="onImageLoaded()" :src="musicPlaylist[currentSong].image" ondragstart="return false;" class="poster"> -->
					</div>
				</transition>
				<div class="loader" :key="currentSong">Loading...</div>
			</div>
			<div class="albumDetails">
				<transition name="slide-fade" mode="out-in">
					<p class="title" :key="currentSong">{{ musicPlaylist[currentSong].title }}</p>
				</transition>
				<transition name="slide-fade" mode="out-in">
					<p class="artist" :key="currentSong">{{ musicPlaylist[currentSong].artist }}</p>
				</transition>
				<transition name="slide-fade" mode="out-in" type='transition'>
					<div class="page-container" :key="currentSong">
						<div :class="['wave-container', currentlyPlaying ? '' : 'paused']">
							<div v-for="index in 20" :key="index" class="wave-bar"></div>
						</div>
					</div>
				</transition>
			</div>

			<div class="playerButtons">
				<a class="button" :class="{'isDisabled':(currentSong==0)}" v-on:click="prevSong()" title="Previous Song"><v-icon name="bi-skip-start-fill" class="icon" scale="2" /></a>
				<a class="button play" v-on:click="playAudio()" title="Play/Pause Song">
					<transition name="slide-fade" mode="out-in">
						<v-icon :name="currentlyStopped ? 'bi-play-circle-fill' : (currentlyPlaying ? 'hi-solid-pause' : 'bi-play-circle-fill')" :key="1" class="icon" scale="2" fill="red"/>
					</transition>
				</a>
				<a class="button" :class="{'isDisabled':(currentSong==musicPlaylist.length-1)}" v-on:click="nextSong()" title="Next Song"><v-icon name="bi-skip-end-fill" class="icon" scale="2" /></a>
			</div>

			<div class="timeAndProgress">
				<div class="currentTimeContainer" style="text-align:center">
					<span class="currentTime">{{ currentTimeShow }}</span>
					<span class="totalTime"> {{ trackDurationShow }}</span>
				</div>

				<div class="currentProgressBar" ref="progress" @click="clickProgress">
					<div class="currentProgress" :style="{ width: currentProgressBar + '%' }"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "MusicPlayer",
	data() {
		return {
				audio: "",
				audioFile: "",
				imgLoaded: false,
				currentlyPlaying: false,
				currentlyStopped: false,
				currentTime: 0,
				checkingCurrentPositionInTrack: "",
				trackDuration: 0,
				currentProgressBar: 0,
				isPlaylistActive: false,
				currentSong: 0,
				musicPlaylist: [
					{
						title: "Eternal Flame",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1927441611.mp3",
						image: "https://web.hycdn.cn/siren/pic/20220314/a79347b6d2e3a57874b552699ce9ee2c.jpg"
					},
					{
						title: "Radiant",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1890402858.mp3",
						image: "https://web.hycdn.cn/siren/pic/20211101/733831c7d034b83dc78f783f8748cc65.jpg"
					},
					{
						title: "Immutable",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1840976599.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210501/01bdad2a0a6876eaee3c23bf0812a73a.png"
					},
					{
						title: "Stay Gold",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1488275299.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210322/430cb5399e272d97779cf5f13681628f.jpg"
					},
					{
						title: "Lullabye",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1491503292.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210322/5fb9a7a5d2045c5c6a16f2c4ed8e08f4.jpg"
					},
					{
						title: "Alive",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1473615924.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210322/7d9ab6167720f8f4b982c83fbe89ce0b.jpg"
					},
					{
						title: "Evolutionary Mechanization",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1473615377.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210322/80c0cbb9bec652d21e939586e19aa9ed.jpg"
					},
					{
						title: "独行长路",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1427681638.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210727/d01c9b65184c11ed6fe7b1019a023b16.jpg"
					},
					{
						title: "Speed of Light",
						artist: "塞壬唱片-MSR",
						url: "http://music.163.com/song/media/outer/url?id=1403774122.mp3",
						image: "https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg"
					}
				],
		};
	},
	mounted: function() {
		this.changeSong();
		this.audio.loop = false;
		
	},
	filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
	},
	methods: {
		togglePlaylist: function() {
			this.isPlaylistActive = !this.isPlaylistActive;
		},
		nextSong: function() {
			if (this.currentSong < this.musicPlaylist.length - 1)
				this.changeSong(this.currentSong + 1);
		},
		prevSong: function() {
			if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
		},
		changeSong: function(index) {
			var wasPlaying = this.currentlyPlaying;
			this.imageLoaded = false;
			if (index !== undefined) {
				this.stopAudio();
				this.currentSong = index;
			}
			this.audioFile = this.musicPlaylist[this.currentSong].url;
			this.audio = new Audio(this.audioFile);
			var localThis = this;
			this.audio.addEventListener("loadedmetadata", function() {
				localThis.trackDuration = Math.round(this.duration);
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playAudio();
			}
		},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		getCurrentSong: function(currentSong) {
			return this.musicPlaylist[currentSong].url;
		},
		playAudio: function() {
			if (
				this.currentlyStopped == true &&
				this.currentSong + 1 == this.musicPlaylist.length
			) {
				this.currentSong = 0;
				this.changeSong();
			}
			if (!this.currentlyPlaying) {
				this.getCurrentTimeEverySecond();
				this.currentlyPlaying = true;
				this.audio.play();
			} else {
				this.stopAudio();
			}
			this.currentlyStopped = false;
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			this.pausedMusic();
		},
		handleEnded: function() {
			if (this.currentSong + 1 == this.musicPlaylist.length) {
				this.stopAudio();
				this.currentlyPlaying = false;
				this.currentlyStopped = true;
			} else {
				this.currentlyPlaying = false;
				this.currentSong++;
				this.changeSong();
				this.playAudio();
			}
		},
		onImageLoaded: function() {
			this.imgLoaded = true;
		},
		getCurrentTimeEverySecond: function() {
			var localThis = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					localThis.currentTime = localThis.audio.currentTime;
					localThis.currentProgressBar =
						localThis.audio.currentTime / localThis.trackDuration * 100;
					localThis.getCurrentTimeEverySecond();
				}.bind(this),
				1000
			);
		},
		pausedMusic: function() {
			clearTimeout(this.checkingCurrentPositionInTrack);
		},
		clickProgress: function(event){
			this.stopAudio();
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
			this.playAudio();
		},
	},
	watch: {
		currentTime: function() {
			this.currentTime = Math.round(this.currentTime);
		}
	},
	computed: {
		currentTimeShow() {
			var s = this.currentTime;
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		},
		trackDurationShow() {
			var s = this.trackDuration;
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		},
	},
	beforeUnmount: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);

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
#box
	margin 0 auto
	width 100%
	height 100vh
	padding 1.6rem
	.audioPlayer
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
			//transform translate(0px, -3px)
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
		.audioPlayerUI 
			margin-top 1.5rem
			will-change transform, filter
			transition 0.5s
			&.isDisabled 
				transform scale(0.75) translateX(50%)
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
					display none
					margin 0.2rem 0
					position relative
					background-color #FFF
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
					font-size 2rem
					display inline-block
					vertical-align middle
					padding 0.5rem
					margin 0 0.25rem
					color rgba(0, 0, 0, 0.75)
					border-radius 50%
					outline 0
					text-decoration none
					cursor pointer
					transition 0.5s
					&.play
						font-size 4rem
						margin 0 1.5rem
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
.loader 
	margin 60px auto
	font-size 10px
	position relative
	text-indent -9999em
.slide-fade-enter-active 
	transition all 0.3s ease
.slide-fade-leave-active 
	transition all 0.2s cubic-bezier(1, 0.5, 0.8, 1)
.slide-fade-enter, .slide-fade-leave-to 
	transform translateY(10px)
	opacity 0
.fade-enter-active, .fade-leave-active 
	transition opacity 0.5s
.fade-enter, .fade-leave-to 
	opacity 0

::-webkit-scrollbar
	width 0 !important
::-webkit-scrollbar
	width 0 !important
	height 0

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
	.audioPlayerUI
		display grid
		grid-template-columns 1fr 1fr
		grid-template-areas "a b" "c d"
		.albumDetails 
			text-align left !important
			margin 0 0 1.5rem 3.6rem !important
			.page-container
				display block !important
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