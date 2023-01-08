import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AddyUrlComponent } from './addy-url/addy-url.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddyyRedirectComponent } from './addyy-redirect/addyy-redirect.component';
import { EllipsesPipe } from './shared/Pipes/ellipses.pipe';
import { AddyyToolsComponent } from './addyy-tools/addyy-tools.component';
import { CacheIterceptor } from './shared/cache.interceptor';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    AddyUrlComponent,
    AddyyRedirectComponent,
    EllipsesPipe,
    AddyyToolsComponent,
    HistoryComponent
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CacheIterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
