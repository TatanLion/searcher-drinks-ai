import type { StateCreator } from "zustand"
import type { FavoritesliceType } from "./FavoriteSlice"

type NotificationType = {
    text: string,
    error: boolean,
    show: boolean | null,
}

export type NotificationSliceType = {
    notification: NotificationType,
    showNotification: (payload: Pick<NotificationType, 'text' | 'error'>) => void,
    hideNotification: () => void
}

export const NotificationSlice: StateCreator<NotificationSliceType & FavoritesliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: null
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 4000);
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: null
            },
        })
    }
})