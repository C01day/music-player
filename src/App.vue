<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="stylus">
*
  // overflow hidden
// body
//   background-image url("./assets/img/back.jpg")
//   background-repeat no-repeat
//   background-size cover
//   background-position center
::-webkit-scrollbar
	width 0 !important
	height 0
	display none
</style>

