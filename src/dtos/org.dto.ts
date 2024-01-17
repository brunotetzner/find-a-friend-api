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
