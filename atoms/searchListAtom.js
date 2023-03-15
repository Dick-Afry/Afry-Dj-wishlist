import { atom } from "recoil";

export const searchListState = atom({
    key: 'searchListState',
    default: null,


});

export const searchListIdState = atom({
    key: 'searchListIdState',
    default: null,
});

export const addedTrackIdState = atom({
    key: 'addedTrackIdState',
    default: null,
});