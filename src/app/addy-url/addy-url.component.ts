import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AddyService } from '../service/addy.service';
import * as XLSX from 'xlsx';
import { AddyResponse, Url } from '../model/addy.response.model';




@Component({
  selector: 'app-addy-url',
  templateUrl: './addy-url.component.html',
  styleUrls: ['./addy-url.component.css']
})
export class AddyUrlComponent implements OnInit {

  addyyForm!: FormGroup;
  excelData: any[] = [];
  urls: any[] = [];
  responseUrl: Url[] = [];
  addytestUrl = 'https://addyy.netlify.app/abcdfed';
  isUrlCopied = false;
  constructor(private formBuilder: FormBuilder,
              private addyService: AddyService) { }

  ngOnInit(): void {
    this.addyyForm = this.formBuilder.group({
        rawUrlInput: ['', Validators.required]
    });
  }

  onFormSubmit() {
    let rawUrl = this.addyyForm.controls['rawUrlInput'].value;
    if(rawUrl) {
        let addyReq = [];
        addyReq.push({url: rawUrl});
        this.addyService.createAddyUrl(addyReq).subscribe((response: AddyResponse) => {
            console.log(response);
        });
    }
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text)
    .then(() => {
      this.isUrlCopied = !this.isUrlCopied;
    })
    .catch(e => console.log(e));
  }
  
 

  submitExcelData() {
    this.urls.length = 0;
    const header = Object.keys(this.excelData[0]);
    const firstCell = header[0];
    for(var i = 0; i < this.excelData.length; i++)
    {
        let obj = this.excelData[i];
        let val = obj[firstCell];
        this.urls.push(val);
    }      
    this.createBulkAddyUrl();
  }


  createBulkAddyUrl() {
    let addyReq: any = [];
    this.urls.forEach(el => {
        addyReq.push({Url: el});
    });
    this.addyService.createAddyUrl(addyReq).subscribe((response: AddyResponse) => {
        if(response.isSuccess) {
            this.responseUrl = response.data;
        }
    });
  }

  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      this.excelData = data;
    };
 }


 onNavigateUrl() {
  alert();
 }
 
 getMailString():string {
  return `mailto:?Subject=Addy URL &body=${this.addytestUrl}`;
 }

 saveAsImage(parent: any) {
  let parentElement = null
  parentElement = parent.qrcElement.nativeElement.querySelector("canvas").toDataURL("image/png")

  // this can be used to download any image from webpage to local disk
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function () {
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = 'image_name.png';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    xhr.open('GET', parentElement); // This is to download the canvas Image
    xhr.send();
  

  // if (parentElement) {
  //   // converts base 64 encoded image to blobData
  //   let blobData = this.convertBase64ToBlob(parentElement)
  //   // saves as image
  //   const blob = new Blob([blobData], { type: "image/png" })
  //   const url = window.URL.createObjectURL(blob)
  //   const link = document.createElement("a")
  //   link.href = url
  //   // name of the file
  //   link.download = "Qrcode"
  //   link.click()
  // }
}

private convertBase64ToBlob(Base64Image: string) {
  // split into two parts
  const parts = Base64Image.split(";base64,")
  // hold the content type
  const imageType = parts[0].split(":")[1]
  // decode base64 string
  const decodedData = window.atob(parts[1])
  // create unit8array of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length)
  // insert all character code into uint8array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }
  // return blob image after conversion
  return new Blob([uInt8Array], { type: imageType })
}
}
