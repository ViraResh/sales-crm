export interface Company {
  id: string;
  name: string;
  website?: string | null;
  industry?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyRequest {
  name: string;
  website?: string;
  industry?: string;
  phone?: string;
}

export type UpdateCompanyRequest = Partial<CreateCompanyRequest>;
