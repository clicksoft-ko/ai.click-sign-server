import { Injectable } from '@nestjs/common';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly ipRoomKeyHandlerCounter = new Counter({
    name: 'socket_io_ip_room_key_handler_calls',
    help: 'Socket.io call counts by IP, roomKey and handler',
    labelNames: ['ip', 'roomKey', 'handler'],
  });

  logIpRoomKeyHandler(ip: string, roomKey: string, handler: string) {
    this.ipRoomKeyHandlerCounter.labels(ip, roomKey, handler).inc();
  }
}
