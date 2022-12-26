import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { AddyUrlComponent } from './addy-url/addy-url.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AddyyBulkUrlComponent } from './addyy-bulk-url/addyy-bulk-url.component';


@NgModule({
  declarations: [
    AppComponent,
    AddyUrlComponent,
    AddyyBulkUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxTippyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
