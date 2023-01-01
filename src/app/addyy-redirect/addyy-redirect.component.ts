import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddyResponse } from '../model/addy.response.model';
import { AddyService } from '../service/addy.service';

@Component({
  selector: 'app-addyy-redirect',
  templateUrl: './addyy-redirect.component.html',
  styleUrls: ['./addyy-redirect.component.css']
})
export class AddyyRedirectComponent implements OnInit {

  constructor(private addyService: AddyService, private router: Router) {
    let key = window.location.pathname;
    if(key.length > 4) {
      key = key.substring(1, key.length);
      this.addyService.getFullURL(key).subscribe((response: AddyResponse) => {
        if(response && response.isSuccess) {
          let url = response.data;
          window.location.href = url[0].rawUrl;
        }
      }, (err) => {
        this.router.navigate(['/app']);
      });
    } else {
      this.router.navigate(['/app']);
    }
    
  }

  ngOnInit(): void {
  }

}
