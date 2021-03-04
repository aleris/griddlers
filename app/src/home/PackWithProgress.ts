import {Board} from '../board/Board'

export type PackWithProgress = {
  packId: string
  coverBoard: Board
  completedMedals: number
  totalMedals: number
  completedPercent: number
}