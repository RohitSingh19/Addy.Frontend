import { Injectable } from "@angular/core";
import { Url } from "../model/addyy.history.model";
import { environment } from '../../environments/environment';
import { AddyResponse } from "../model/addy.response.model";


@Injectable({providedIn: 'root'})
export class HistoryService {
    
    localStorageKey = environment.localStorageKey;
    historyUrl: Url[] = [];

    constructor() {}

    saveHistoryUrl(addyResponse: AddyResponse) {
        addyResponse.data.forEach((addyy) => {
            const addyHash = this.getAddyHash(addyy.addyUrl);
            if(!this.getHistoryUrl(addyHash)) {
                const history = this.getAllHistoryUrl();
                const url: Url = {addyUrl: addyy.addyUrl, hash: addyHash};
                this.historyUrl = [...history];
                this.historyUrl.push(url);
                localStorage.setItem(this.localStorageKey, JSON.stringify(this.historyUrl));
            };
        });
    }

    getAllHistoryUrl(): Url[] {
        const obj = localStorage.getItem(this.localStorageKey);
        if(obj) {
            const data: Url[] = JSON.parse(obj);
            return data;
        }
        return [];
    }

    getHistoryUrl(key: string): Url | null | undefined {
        const history = this.getAllHistoryUrl();
        if(!history) return null;
        const url = history.find(x=> x.hash === key);
        return url;
    }

    getAddyHash(addyUrl: string): string {
        const url = new URL(addyUrl);
        return url.pathname.substring(1, addyUrl.length);
    }
}