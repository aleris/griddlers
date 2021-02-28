import { Board } from "../board/Board";
import { BoardBuilder } from "../board/BoardBuilder";
import { BoardSupport } from "../board/BoardSupport";
import { BoardMapper } from "../repository/BoardMapper";
import { CompletedBoardsRepository } from "../repository/CompletedBoardsRepository";
import { NextBoardRepository } from "../repository/NextBoardRepository";
import { pictureSpecs } from "./pictureSpecs";

export class BoardRegistry {
  static pictureSpecs = pictureSpecs;
  static pictureSpecsMapById = new Map(
    pictureSpecs.map((pictureSpec) => [pictureSpec.id, pictureSpec])
  );

  static async getById(id: string): Promise<Board> {
    const next = await this.getNext();
    if (next.id === id) {
      return next;
    }

    const completed = await this.getCompleted();
    const board = completed.find((board) => board.id === id);
    if (board === undefined) {
      throw new Error(`${id} board not found`);
    }
    return board;
  }

  static async getNext(): Promise<Board> {
    const currentId = await NextBoardRepository.get();
    if (currentId === null) {
      return this.load(pictureSpecs[0].id);
    }
    return this.load(currentId);
  }

  private static async load(id: string): Promise<Board> {
    const pictureSpec = this.pictureSpecsMapById.get(id);
    if (null == pictureSpec) {
      throw new Error(`${id} picture spec not found`);
    }
    return BoardBuilder.buildBoardFromPictureSpec(pictureSpec);
  }

  static async getCompleted(): Promise<Board[]> {
    const persistedList = await CompletedBoardsRepository.list();
    return persistedList
      .map((persistedBoard) => BoardMapper.fromPersisted(persistedBoard))
      .sort((a, b) => b.difficulty - a.difficulty);
  }

  static async completeBoard(filledBoard: Board): Promise<Board | null> {
    const persistedBoardWithGuessed = BoardMapper.toPersistedGuessed(
      filledBoard
    );
    await CompletedBoardsRepository.set(persistedBoardWithGuessed);
    return await this.next();
  }

  private static async next(): Promise<Board | null> {
    const completedIdsSet = new Set(await CompletedBoardsRepository.listIds());
    for (const spec of this.pictureSpecs) {
      if (!completedIdsSet.has(spec.id)) {
        const board = BoardBuilder.buildBoardFromPictureSpec(spec);
        await NextBoardRepository.set(board.id);
        return board;
      }
    }
    return null;
  }
}
