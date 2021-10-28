export interface IPayload {
  email: string;
  name: string;
  profile: string;
  sector: string;
  sectorsActuated: Array<string>;
  sub: string;
  iat: number;
  exp: number;
}
