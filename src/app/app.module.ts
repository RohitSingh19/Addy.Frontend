import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { AddyUrlComponent } from './addy-url/addy-url.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddyyBulkUrlComponent } from './addyy-bulk-url/addyy-bulk-url.component';
import { AddyyRedirectComponent } from './addyy-redirect/addyy-redirect.component';
import { EllipsesPipe } from './shared/Pipes/ellipses.pipe';
import { AddyyToolsComponent } from './addyy-tools/addyy-tools.component';


@NgModule({
  declarations: [
    AppComponent,
    AddyUrlComponent,
    AddyyBulkUrlComponent,
    AddyyRedirectComponent,
    EllipsesPipe,
    AddyyToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxTippyModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      tapToDismiss: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
