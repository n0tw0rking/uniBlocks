export interface ISubscribtion {
  _id: string;
  name: string;
  // assuming that balance id will affectd with operations
  balance: string;
  user: string;
}
export interface ISubscribtionInputDTO {
  name: string;
  user: string;
  balance: string;
}
