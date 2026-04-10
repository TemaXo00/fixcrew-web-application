export interface RegionResponseType {
  id: string
  name: string
  avg_response: string
}

export type RegionCreateType = Pick<RegionResponseType, 'name' | 'avg_response'>

export type RegionUpdateType = Pick<RegionResponseType, 'avg_response'>
