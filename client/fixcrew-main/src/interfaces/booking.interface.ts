export interface TypesSubCategories {
  id: number
  title: string
  description: string
}

export interface TypesCategories {
  id: number
  title: string
  subCategories: TypesSubCategories[]
}

export interface Types {
  id: number
  title: string
  categories: TypesCategories[]
}
