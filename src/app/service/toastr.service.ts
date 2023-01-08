import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ToastService {
  
  appName = environment.App_Name;

  constructor(private toastr: ToastrService) {}

  ToastSuccess(msg: string) {
    this.toastr.success(msg, this.appName);
  }

  ToastError(msg: string) {
    this.toastr.error(msg, this.appName);
  }

  ToastInfo(msg: string) {
    this.toastr.info(msg, this.appName);
  }

  ToastWarning(msg: string) {
    this.toastr.warning(msg, this.appName);
  }
  
}