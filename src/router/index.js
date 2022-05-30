import { createRouter, createWebHashHistory } from "vue-router"
import MusicPlayer from '@/components/MusicPlayer'

const routes = [
    {
        path: '/',
        name: 'MusicPlayer',
        component: MusicPlayer,
        meta: {
            title: "",
            content: {
                name: "referrer", content: "no-referrer"
            }
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})