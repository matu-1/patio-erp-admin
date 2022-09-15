export interface Client {
  id: number;
  DateCreation: Date;
  DateModification: Date;
  IsDeleted: number;
  UserCreation: string;
  UserModification: string;
  nombre: string;
  representante: string;
  representante2: string;
  representante3: string;
  email: string;
  fecha_inicio: Date;
  telefono: string;
  estado: string;
  RazonSocial: null | string;
  nit: null | string;
  email2: null | string;
  email3: null | string;
  telefono2: null | string;
  telefono3: null | string;
  ciudad: string;
  contacto_verificado: null;
  id_cobrador: number;
  codigo_referido: null | string;
  banco: null | string;
  nro_cuenta: null | string;
}
