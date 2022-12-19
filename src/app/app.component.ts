import { Component, OnInit } from '@angular/core';
import { AddyResponse } from './model/addy.response.model';
import { AddyService } from './service/addy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Addy';

  ngOnInit(): void {
  }
  
  constructor(private addyService: AddyService, private router: Router) {
    let key = window.location.pathname;
    if(key.length > 4) {
      key = key.substring(1, key.length);
      this.addyService.getFullURL(key).subscribe((response: AddyResponse) => {
        if(response && response.isSuccess) {
          let url = response.data;
          window.location.href = url[0].rawUrl;
        }
      });
    } else {
      this.router.navigate(['/app']);
    }
    
  }

  
}
