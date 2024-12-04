import { Request } from 'express';
import { Socket } from 'socket.io';

export function getIp(req: Request): string | undefined {
  const headersToCheck = ['x-original-forwarded-for', 'x-forwarded-for', 'x-real-ip'];

  for (const header of headersToCheck) {
    const value = req.headers[header] as string | undefined;
    if (value) {
      return header === 'x-forwarded-for' ? value.split(',')[0].trim() : value.split(':')[0];
    }
  }

  return req.ip || undefined;
}

export function getSocketIp(socket: Socket): string | undefined {
  // x-forwarded-for 헤더 우선 처리
  const xForwardedFor = socket.handshake.headers['x-forwarded-for'] as string;
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim(); // 첫 번째 IP 주소 반환
  }

  // 기본 IP 주소
  return socket.handshake.address;
}