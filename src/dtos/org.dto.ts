import { CreateAddressBody } from "./address.dto";

export interface CreateOrgBody {
  name: string;
  phone: string;
  email: string;
  password: string;
  description: string;
  addressId: string;
}

export interface CreateOrgBodyRequest extends CreateOrgBody {
  address: CreateAddressBody;
}

export interface orgResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  addressId: string;
}
