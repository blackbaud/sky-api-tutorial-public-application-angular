import { ConstituentAddress } from "./constituent-address";
import { ConstituentBirthday } from "./constituent-birthday";
import { ConstituentEmail } from "./constituent-email";

export interface Constituent {
  id: string;
  type: string;
  lookup_id: string;
  first: string;
  last: string;
  name: string;
  age: number;
  gender: string;
  title: string;
  income: string;
  birthdate: ConstituentBirthday;
  address: ConstituentAddress;
  email: ConstituentEmail;
}
