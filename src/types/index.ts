// Product Types
export type ProductCategory =
  | 'excavator'
  | 'crane'
  | 'loader'
  | 'bulldozer'
  | 'grader'
  | 'roller'
  | 'concrete'
  | 'piling'
  | 'mining';

export interface ProductSpec {
  label: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  power: string;
  operatingWeight: string;
  bucketCapacity?: string;
  maxLiftCapacity?: string;
  specs: ProductSpec[];
  images: string[];
  thumbnail: string;
  pdfBrochure?: string;
  featured?: boolean;
  price?: number;
}

export interface ProductFilter {
  category?: ProductCategory;
  minWeight?: number;
  maxWeight?: number;
  minPower?: number;
  maxPower?: number;
  search?: string;
}

// Lead Form Types
export interface LeadFormData {
  name: string;
  phone: string;
  machine?: string;
  message?: string;
  leasingData?: LeasingResult;
}

export interface LeasingResult {
  machinePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  leaseTerm: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  category: string;
  machines: string[];
}

// Partner Types
export interface Partner {
  id: string;
  name: string;
  logo: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
}

export interface PhoneNumber {
  number: string;
  label: string;
}

// Contact Form Status
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
