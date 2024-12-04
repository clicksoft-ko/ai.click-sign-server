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
  // IIS 관련 헤더들 우선 확인
  const headers = socket.handshake.headers;
  
  // 우선순위에 따라 헤더 확인
  const possibleHeaders = [
    'x-original-forwarded-for',  // IIS ARR에서 사용
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',          // Cloudflare 사용시
    'true-client-ip',
    'x-client-ip'
  ];

  for (const header of possibleHeaders) {
    const headerValue = headers[header] as string;
    if (headerValue) {
      // 쉼표로 구분된 경우 첫 번째 IP 반환
      return headerValue.split(',')[0].trim();
    }
  }

  // 모든 헤더가 없는 경우 기본 주소 반환
  return socket.handshake.address;
}