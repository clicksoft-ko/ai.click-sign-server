export class SockData {
  room: string;
  image?: ArrayBuffer;
  toWeb?: ToWeb;
  toWindow?: ToWindow;
}

export enum ToWeb {
  서명요청 = 1,
  서명확인 = 2,
  서명취소 = 3,
  작성완료 = 4,
  화면공유 = 200,
  화면초기화 = 201,
  윈도우접속에러 = 500,
}

export enum ToWindow {
  서명중 = 0,
  서명완료 = 1,
  화면공유 = 200,
  화면초기화 = 201,
  웹접속에러 = 500,
}
