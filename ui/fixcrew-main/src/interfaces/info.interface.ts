export interface InfoInterface {
  id: string
  title: string
  description: string
  photoUrl: string
  prices: PriceInterface[]
}

export interface PriceInterface {
  id: string
  name: string
  price: number
}
