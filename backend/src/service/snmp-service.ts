import {scheduler, secureDatabase, SquidService} from '@squidcloud/backend';
import {CronExpression} from "@squidcloud/common";
import {simulateSnmpQueries} from "./snmp-generator";
import {Device, DeviceInterface} from "../types";
import {omit} from "lodash";

export class SnmpService extends SquidService {
  // TODO: !!!IMPORTANT!!! - Replace this function with your own granular security rules
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @scheduler('queryDevices', CronExpression.EVERY_5_SECONDS)
  async queryDevices(): Promise<void> {
    console.log('Test')
    const devicesCollection = this.squid.collection<Omit<Device, 'interfaces'>>('devices')
    const deviceInterfacesCollection = this.squid.collection<DeviceInterface>('deviceInterfaces')
    const devices = simulateSnmpQueries(50, 1, 5);
    await this.squid.runInTransaction(async (transaction) => {
      for (const device of devices) {
        await devicesCollection.doc({id: device.id}).delete(transaction);
        const interfaces = device.interfaces;
        const deviceWithoutInterfaces = omit(device, 'interfaces');
        await devicesCollection.doc({id: device.id}).insert(deviceWithoutInterfaces, transaction);
        for (let i = 0; i < 10; i++) {
            await deviceInterfacesCollection.doc({deviceId: device.id, id: `id_${i + 1}`}).delete(transaction);
        }
        for (const deviceInterface of interfaces) {
            await deviceInterfacesCollection.doc({deviceId: device.id, id: deviceInterface.id}).insert(deviceInterface, transaction);
        }
      }
    });
  }
}
