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

  singleUrlForm!: FormGroup;
  excelData: any[] = [];
  urls: any[] = [];
  responseUrl: Url[] = [];
  constructor(private formBuilder: FormBuilder, private addyService: AddyService) { }

  ngOnInit(): void {
    this.singleUrlForm = this.formBuilder.group({
        rawUrlInput: ['https://dev.to/salimchemes/deploying-angular-app-with-netlify-in-3-steps-55k6', Validators.required]
    });
  }


  onFormSubmit() {
    let rawUrl = this.singleUrlForm.controls['rawUrlInput'].value;
    if(rawUrl) {
        let addyReq = [];
        addyReq.push({url: rawUrl});
        this.addyService.createAddyUrl(addyReq).subscribe(response => {
            console.log(response);
        });
    }
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
}
