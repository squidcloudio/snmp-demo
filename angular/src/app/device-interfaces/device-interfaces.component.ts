import {Component, Input} from '@angular/core';
import {DeviceInterface} from "@backend";

@Component({
  selector: 'device-interfaces',
  templateUrl: './device-interfaces.component.html',
  styleUrls: ['./device-interfaces.component.scss']
})
export class DeviceInterfacesComponent {
  @Input()
  deviceInterfaces: DeviceInterface[] = [];
}
