import {BoardSpec} from './BoardSpec'

export type Pack = {
  position: number,
  id: string
  pictureSpecs: BoardSpec[]
}

export const PACK_LEVEL_COUNT = 15
