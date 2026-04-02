import type { InfoInterface } from '@/interfaces/info.interface.ts'

export const refrigeratorMock: InfoInterface = {
  id: "1",
  title: "Refrigerators",
  description: "Text",
  photoUrl: "@/assets/images/url.png",
  prices: [
    {
      id: "1",
      name: "Repair",
      price: 5,
    },
    {
      id: "2",
      name: "Update",
      price: 12,
    }
  ]
}
