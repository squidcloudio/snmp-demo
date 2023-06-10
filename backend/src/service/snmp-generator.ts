import {Device, DeviceInterface} from "../types";

function generateRandomStatus(): 'ok' | 'errors' {
    return Math.random() < 0.9 ? 'ok' : 'errors';
}

function generateRandomErrors(): number {
    return Math.floor(Math.random() * 10);
}

function generateRandomThroughput(): number {
    return Math.floor(Math.random() * 1000);
}

export function simulateSnmpQueries(numDevices: number, minInterfaces: number, maxInterfaces: number): Device[] {
    const devices: Device[] = [];

    for (let i = 0; i < numDevices; i++) {
        const device: Device = {
            id: `Device${i + 1}`,
            status: generateRandomStatus(),
            lastUpdateDate: new Date(),
            interfaces: [],
        };

        const numInterfaces = Math.floor(Math.random() * (maxInterfaces - minInterfaces + 1)) + minInterfaces;
        for (let j = 0; j < numInterfaces; j++) {
            const deviceInterface: DeviceInterface = {
                id: `id_${j + 1}`,
                deviceId: device.id,
                status: generateRandomStatus(),
                inErrors: generateRandomErrors(),
                outErrors: generateRandomErrors(),
                inThroughput: generateRandomThroughput(),
                outThroughput: generateRandomThroughput(),
                lastUpdateDate: new Date(),
            };
            device.interfaces.push(deviceInterface);
        }

        devices.push(device);
    }

    return devices;
}

