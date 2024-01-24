export class SockData {
  sockCode: string;
  image?: ArrayBuffer;
  toWeb?: ToWeb;
  toWindow?: ToWindow;
}

export enum ToWeb {
  화면공유 = 0,
  서명요청 = 1,
  서명확인 = 2,
  서명취소 = 3,
  작성완료 = 4,
  윈도우접속에러 = 500,
}

export enum ToWindow {
  서명중 = 0,
  서명완료 = 1,
  화면공유 = 200,
  웹접속에러 = 500,
}
