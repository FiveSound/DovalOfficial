export interface FinancialInformationType {}

export interface BusinessRegistrationForm {
  business_name: string;
  business_description: string;
  business_types: {
    id: number;
    label: string;
    value: string;
    interest: string;
  }[];
  tax_identification_number: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  location_map?: string;
  latitude?: number;
  longitude?: number;
  country: string;
  name: string;
  uri: string;
  type: string;
  size: number;
  schedules: any;
  OurRiders: boolean;
  idSchedule: number;
  days: string[];
  opening_time: string;
  closing_time: string;
  full_name: string;
  identification_number: string;
  role: string;
  email: string;
  phone_number: string;
  imgIdentification: string;
  commercial_registry: Document | null;
  tax_certificate: Document | null;
  legal_representative_id: Document | null;
  business_address_proof: Document | null;
  bank_details: string;
  account_currency: 'DOP' | 'USD';
  account_type: 'Checking' | 'Savings';
  account_number: string;
  account_holder_name: string;
  fiscal_identification: string;
}
