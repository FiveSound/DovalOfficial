export interface FinancialInformationType {
    bank_details: string;
    account_currency: 'DOP' | 'USD';
    account_type: 'Checking' | 'Savings';
    account_number: string;
    account_holder_name: string;
    fiscal_identification: string;
}

export interface Documents {
    commercial_registry: Document | null;
    tax_certificate: Document | null;
    legal_representative_id: Document | null;
    business_address_proof: Document | null;

}

export interface BasicBusinessInformationType {
    business_name: string;
    business_description: string;
    business_type: {
        category: string;
        list: { id: number, label: string, value: string, interest: string }[];
    };
    tax_identification_number: string;
}

export interface Representativeinformation {
    full_name: string;
    identification_number: string;
    role: string;
    email: string;
    phone_number: string;
    imgIdentification: string;
}

export interface BusinessAddressType {
    address: string;
    city: string;
    state: string;
    postal_code: string;
    location_map?: string;
    latitude?: number;
    longitude?: number;
}

export interface OperationsInformationType {
    operation_days: string[];
    opening_time: string;
    closing_time: string;
    OurRiders: boolean;
}

export interface Document {
    name: string;
    uri: string;
    type: string;
    size: number;
}

export interface BusinessRegistrationForm {
    basic_business_information: BasicBusinessInformationType;
    contact_information: Representativeinformation;
    business_address: BusinessAddressType;
    operations_information: OperationsInformationType;
    financial_info: FinancialInformationType;
    documents: Documents;
    accept_terms: boolean;
    accept_privacy_policy: boolean;
    authorize_verification: boolean;
}