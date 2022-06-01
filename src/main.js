import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as Icons from "oh-vue-icons/icons";
const All = Object.values({ ...Icons });
addIcons(...All);

// import {
//     BiSkipStartFill,
//     BiSkipEndFill,
//     BiPlayCircleFill,
//     HiSolidPause,
//     RiOrderPlayFill,
//     RiShuffleFill,
//     RiRepeatOneFill
// } from "oh-vue-icons/icons";

// addIcons(
//     BiSkipStartFill,
//     BiSkipEndFill,
//     BiPlayCircleFill,
//     HiSolidPause,
//     RiOrderPlayFill,
//     RiShuffleFill,
//     RiRepeatOneFill
// );

// router.beforeEach((to, from, next)=>{
//     if(to.meta.content) {     //路由发生变化时候修改meta
//         let head = document.getElementsByTagName('head');
//         let meta = document.createElement('meta');
//         document.querySelector('meta[name="name"]').setAttribute('content',to.meta.content.name);
//         document.querySelector('meta[name="content"]').setAttribute('content',to.meta.content.content);
//         meta.content = to.meta.content;
//         head[0].appendChild(meta);
//     }
//     if(to.meta.title) {   //路由发生变化时候修改页面中的title
//         document.title = to.meta.title
//     }
//     next();
// })

const app = createApp(App);
app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");