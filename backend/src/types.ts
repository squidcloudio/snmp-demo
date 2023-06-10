export interface Device {
    id: string;
    status: 'ok' | 'errors';
    lastUpdateDate: Date;
    interfaces: DeviceInterface[];
}

export interface DeviceInterface {
    id: string;
    deviceId: string;
    status: 'ok' | 'errors';
    inErrors: number;
    outErrors: number;
    inThroughput: number;
    outThroughput: number;
    lastUpdateDate: Date;
}