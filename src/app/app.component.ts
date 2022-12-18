import { Component, OnInit } from '@angular/core';
import { AddyService } from './service/addy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Addy';

  ngOnInit(): void {
  }
  
  constructor(private addyService: AddyService) {
    // let key = window.location.pathname;
    // this.addyService.getFullURL(key).subscribe(response => {
    //     window.location.href = response;
    // });
  }

  
}
