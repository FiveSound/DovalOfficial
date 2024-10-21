export type Variant = {
    id: number;
    userID: string;
    title: string;
    limit_qty: number;
    required: boolean;
  };
  
  export type SubVariant = {
    id: number;
    name: string;
    variantID: number;
    price: string;
  };
  
  export type TypeData = {
    variants: Variant[];
    subvariants: SubVariant[];
    resume: String[];
  };
  
  export type TypeVariant = {
    id?: number;
    title: string;
    limit_qty?: number;
    onPress: () => void;
    onRemove: (id: number) => void;
    subvariants: SubVariant[];
    required?: boolean;
    disabled?: boolean;
  };