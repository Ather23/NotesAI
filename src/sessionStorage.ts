export function saveDrawerMenuSelection(index:number){
    const drawerState: DrawerState = {
        clickedMenuItemIndex: index,
      };
      sessionStorage.setItem("drawerState", JSON.stringify(drawerState));  
}

export function getDrawerStateFromSessionStorage(): DrawerState {
    if(!sessionStorage.getItem('drawerState')){
        return JSON.parse(JSON.stringify( { 'clickedMenuItemIndex' : 0})) as DrawerState;
    }
    return JSON.parse(sessionStorage.getItem('drawerState') as string) as DrawerState
}