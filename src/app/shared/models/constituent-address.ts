export interface ConstituentAddress {
  id: string;
  address_lines: string;
  city: string;
  constituent_id: number;
  country: string;
  do_not_mail: boolean;
  formatted_address: string;
  inactive: boolean;
  postal_code: number;
  preferred: boolean;
  state: string;
  type: string;
}
