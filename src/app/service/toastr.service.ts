import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class ToastService {
  constructor(private toastr: ToastrService) {}

  ToastSuccess(msg: string, title: string) {
    this.toastr.success(msg, title);
  }

  ToastError(msg: string, title: string) {
    this.toastr.error(msg, title);
  }

  ToastInfo(msg: string, title: string) {
    this.toastr.info(msg, title);
  }

  ToastWarning(msg: string, title: string) {
    this.toastr.warning(msg, title);
  }
  
}