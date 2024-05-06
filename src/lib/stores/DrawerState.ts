import {writable, type Writable } from 'svelte/store';
export const WriteMenuIndex:Writable<number> = writable(0);

export function getDrawerStateFromLocalStorage(): DrawerState {
    if(!localStorage.getItem('drawerState')){
        return JSON.parse(JSON.stringify( { 'clickedMenuItemIndex' : 0})) as DrawerState;
    }
    return JSON.parse(localStorage.getItem('drawerState') as string) as DrawerState
}