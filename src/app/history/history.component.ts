import { Component, OnInit } from '@angular/core';
import { AddyResponse } from '../model/addy.response.model';
import { Url } from '../model/addyy.history.model';
import { environment } from '../../environments/environment';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  localStoragekey = environment.localStorageKey;
  addyHistory: Url[] = [];
  constructor(private historyService: HistoryService) { 
    this.getAllHistroy();
  }

  ngOnInit(): void {
  }

  saveUrl(addyResponse: AddyResponse) {
      this.historyService.saveHistoryUrl(addyResponse);
  }

  getAllHistroy() {
    this.addyHistory = this.historyService.getAllHistoryUrl();
  }

}
