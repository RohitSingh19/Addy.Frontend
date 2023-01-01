import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AddyService } from '../service/addy.service';
import { AddyResponse, Url } from '../model/addy.response.model';
import * as XLSX from 'xlsx';
import { ToastService } from '../service/toastr.service';
@Component({
  selector: 'app-addy-url',
  templateUrl: './addy-url.component.html',
  styleUrls: ['./addy-url.component.css']
})
export class AddyUrlComponent implements OnInit {

  addyyForm!: FormGroup;
  responseUrl: Url[] = [];
  addyUrl:string = '';
  isUrlCopied = false;
  excelData: any[] = [];
  urls: any[] = [];
  excelUploadStart : boolean = false;
  responseBulkURLForExport: Url[] = [];
  
  constructor(private formBuilder: FormBuilder,
              private addyService: AddyService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.addyyForm = this.formBuilder.group({
        rawUrlInput: ['', Validators.required],
        fileInput: null
    });
  }

  onFormSubmit() {

    this.excelData.length = 0;
    this.excelUploadStart = false;
    let rawUrlControl = this.addyyForm.controls['rawUrlInput'] as FormControl;
    
    if(rawUrlControl.value) {
        if(this.isRestrictedDomain(rawUrlControl.value)) {
          this.toastService.ToastWarning('Sorry! this domain is restricted', 'Addyy!');
          return;
        }
        let addyReq = [];
        addyReq.push({url: rawUrlControl.value});
        rawUrlControl.patchValue('');
        this.addyService.createAddyUrl(addyReq).subscribe((response: AddyResponse) => {
            if(response.isSuccess) {
                this.addyUrl = response.data[0].addyUrl;
                this.toastService.ToastSuccess('Addyy Url created successfully!', 'Addyy!');
            }
        }, (err) => {
          console.log(err);
          this.toastService.ToastError('Something is broker. Pls try again later', 'Addyy!');
        });
    }
  }
  
  isRestrictedDomain(domain: string):boolean {
    const {hostname} = new URL(domain);
    return this.addyService.IsThisRestrictedDomain(hostname);
  }

  uploadClickHandler() {
    this.addyUrl = ''; /*clear single url response options*/
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
    this.excelUploadStart = true;
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
            this.excelUploadStart = false;
            this.responseBulkURLForExport = response.data;
            this.toastService.ToastSuccess('Addyy Url created successfully!', 'Addyy!');
        }
    }, err => {
      console.log(err);
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


 
 fireEvent() {
  if(this.responseBulkURLForExport) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.responseBulkURLForExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Addyy-Data");
    /* save to file */
    XLSX.writeFile(wb, "AddyyUrls.xlsx");
    this.toastService.ToastSuccess('File downloaded successfully!', 'Addyy!');
  }
}
}
