import {Component} from '@angular/core';
import {Squid} from '@squidcloud/client';
import {map, Observable} from "rxjs";
import {Device, DeviceInterface} from "@backend";


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent {
  selectedDeviceId?: string = undefined;
  devicesObs: Observable<Array<Device>> = this.squid.collection<Device>('devices')
    .joinQuery('device')
    .sortBy('id')
    .join(this.squid.collection<DeviceInterface>('deviceInterfaces').joinQuery('deviceInterface'), 'id', 'deviceId')
    .snapshots()
    .pipe(
      map((snapshots) =>
        snapshots.map((snapshot) => {
          return {
            device: snapshot.device.data,
            deviceInterface: snapshot.deviceInterface?.hasData ? snapshot.deviceInterface?.data : undefined,
          };
        })),
      map((devices) => devices.filter((device) => device.deviceInterface)),
      map((devicesAndInterfaces) => {
        const devices = new Map<string, Device>();
        const interfacesForDevice = new Map<string, Set<string>>();
        for (const deviceAndInterface of devicesAndInterfaces) {
          const device = deviceAndInterface.device;
          const deviceId = device.id;
          const interfaceId = deviceAndInterface.deviceInterface!.id;
          if (!devices.has(deviceId)) {
            devices.set(deviceId, device);
            interfacesForDevice.set(deviceId, new Set<string>());
            device.interfaces = [];
          }
          const interfaces = interfacesForDevice.get(deviceId)!;
          if (!interfaces.has(interfaceId)) {
            interfaces.add(deviceAndInterface.deviceInterface!.id);
            device.interfaces.push(deviceAndInterface.deviceInterface!);
          }
        }

        return Array.from(devices.values());
      })
    );

  constructor(private readonly squid: Squid) {
  }

  selectDevice(deviceId: string) {
    if (this.selectedDeviceId === deviceId) {
      this.selectedDeviceId = undefined;
      return;
    }

    this.selectedDeviceId = deviceId;
  }
}
