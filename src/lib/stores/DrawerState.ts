import { derived, readonly, writable, type Writable } from 'svelte/store';
export const DrawerState: Writable<boolean> = writable(false);
