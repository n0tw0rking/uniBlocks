export interface ISubscription {
  _id: string;
  name: string;
  // assuming that balance id will affectd with operations
  balance: string;
  user: string;
}
export interface ISubscriptionInputDTO {
  name: String;
  user: string;
}
