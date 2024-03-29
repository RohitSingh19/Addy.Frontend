import { Component, Input} from '@angular/core';
import { AddyService } from '../service/addy.service';
import { ToastService } from '../service/toastr.service';

@Component({
  selector: 'app-addyy-tools',
  templateUrl: './addyy-tools.component.html',
  styleUrls: ['./addyy-tools.component.css']
})
export class AddyyToolsComponent {
  
  isUrlCopied = false;
  @Input() addyUrl: string = '';

  constructor(private addyService: AddyService, private toastService: ToastService) { }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text)
    .then(() => {
        this.isUrlCopied = !this.isUrlCopied;
        this.toastService.ToastSuccess('Url Copied !')
    })
    .catch(e => console.log(e));
  }

  onNavigateUrl() {
    const {pathname} = new URL(this.addyUrl);
    const key = pathname.substring(1, pathname.length);
    this.addyService.getFullURL(key).subscribe((response) => {
      if(response.isSuccess) {
          const destinationUrl = response.data[0].rawUrl;
          window.open(destinationUrl, "_blank");
      }
    });
  }
 
  getWhatsAppText() {
    return `https://api.whatsapp.com/send?&text=_Hi, I have created this short url using *Addyy* ${this.addyUrl}_`;
  }

  saveAsImage(parent: any) {
      let parentElement = parent.qrcElement.nativeElement.querySelector("canvas").toDataURL("image/png");
      this.addyService.saveQRCodeAsImage(parentElement);
      this.toastService.ToastSuccess('QR Downloaded Successfully');
  }

  getMailString():string {
    return `mailto:?Subject= ${this.getSubject()} &body=${this.getBody()}`;
  }

  private getSubject(): string {
    return `Addyy URL`
  }

  private getBody(): string {
    return ` ${this.addyUrl}`;
  }
}
