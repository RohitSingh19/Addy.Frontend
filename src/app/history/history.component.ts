import { Component, OnInit } from '@angular/core';
import { AddyResponse } from '../model/addy.response.model';
import { environment } from '../../environments/environment';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  localStoragekey = environment.localStorageKey;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
  }

  saveUrl(addyResponse: AddyResponse) {
      this.historyService.saveHistoryUrl(addyResponse);
  }

}
