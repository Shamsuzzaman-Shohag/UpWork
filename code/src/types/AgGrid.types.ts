export type TypeSingleFilterModel = {
  filterType: string;
  type?: string;
  filter?: string | number | Date;
  values?: any[];
  dateFrom?: Date | string | null;
  dateTo?: Date | string | null;
  filterTo?: number | null;
};

export type TypeFilterModel = Record<string, (TypeSingleFilterModel | (
  {
    operator: string;
    conditions: TypeSingleFilterModel[];
  } & Record<string, any>))>;