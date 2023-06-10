import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SquidModule } from '@squidcloud/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceInterfacesComponent } from './device-interfaces/device-interfaces.component';

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    DeviceInterfacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SquidModule.forRoot({
      appId: '527oengwdj2yknxjbq',
      region: 'us-east-1.aws',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
