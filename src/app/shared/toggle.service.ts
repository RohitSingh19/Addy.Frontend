import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ToggleService {
    hideSideDrawer: boolean = false;

    constructor() {}

    toggleSideDrawer() {
        this.hideSideDrawer = !this.hideSideDrawer;
    }
}