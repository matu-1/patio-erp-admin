export interface Caja {
  id: number;
  DateCreation: Date | null;
  DateModification: Date | null;
  IsDeleted: number;
  UserCreation: string;
  UserModification: string;
  nombre_responsable: string;
  supervisor_cierre: string;
  fecha_apertura: Date;
  fecha_cierre: Date;
  monto_apertura: string;
  monto_cierre: string;
  glosa: null | string;
}
