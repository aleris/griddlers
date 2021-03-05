import { Board } from "../board/Board";
import { BoardBuilder } from "../board/BoardBuilder";
import { PackWithProgress } from "../home/PackWithProgress";
import { BoardMapper } from "../repository/BoardMapper";
import { CompletedBoardsRepository } from "../repository/CompletedBoardsRepository";
import { NextBoardRepository } from "../repository/NextBoardRepository";
import { BoardSpec } from "./BoardSpec";
import { pack1 } from "./pack1";
import { pack2 } from "./pack2";

export class BoardRegistry {
  static packs = [pack1, pack2];
  static packsMapById = new Map(
    BoardRegistry.packs.map((pack) => [pack.id, pack])
  );
  static boardSpecsMapById = new Map(
    BoardRegistry.packs.map((pack) => [
      pack.id,
      new Map(
        pack.boardSpecs.map((boardSpec) => [boardSpec.boardId, boardSpec])
      ),
    ])
  );

  static getPackById(packId: string) {
    const pack = this.packsMapById.get(packId);
    if (pack === undefined) {
      throw new Error(`Pack ${packId} does not exist.`);
    }
    return pack;
  }

  static getSpecById(packId: string, boardId: string): BoardSpec {
    const spec = this.boardSpecsMapById.get(packId)?.get(boardId);
    if (spec === undefined) {
      throw new Error(`Board ${boardId} for pack ${packId} does not exist.`);
    }
    return spec;
  }

  static async getCompletedOrCurrentById(
    packId: string,
    boardId: string
  ): Promise<Board> {
    const next = await this.getNext(packId);
    if (
      next !== null &&
      next.packId === packId &&
      next.spec.boardId === boardId
    ) {
      return next;
    }

    const completed = await this.getCompleted(packId);
    const board = completed.find((board) => board.spec.boardId === boardId);
    if (board === undefined) {
      throw new Error(`${boardId} board not found in pack ${packId}`);
    }
    return board;
  }

  static async getNext(packId: string): Promise<Board | null> {
    const currentId = await NextBoardRepository.get(packId);
    if (currentId === null) {
      return null;
    }
    return this.load(packId, currentId);
  }

  private static async load(packId: string, boardId: string): Promise<Board> {
    const boardSpec = this.getSpecById(packId, boardId);
    return BoardBuilder.buildBoardFromSpec(packId, boardSpec);
  }

  static async getCompleted(packId: string): Promise<Board[]> {
    const persistedList = await CompletedBoardsRepository.listBoardsForPack(
      packId
    );
    return persistedList
      .map((persistedBoard) => BoardMapper.fromPersisted(persistedBoard))
      .sort((a, b) => a.spec.positionInPack - b.spec.positionInPack);
  }

  static async completeBoard(filledBoard: Board): Promise<Board | null> {
    const persistedBoardWithGuessed = BoardMapper.toPersistedGuessed(
      filledBoard
    );
    await CompletedBoardsRepository.setBoard(persistedBoardWithGuessed);
    return await this.next(filledBoard.packId);
  }

  static async getPacksWithProgress(): Promise<PackWithProgress[]> {
    const ids = this.packs.map((pack) => pack.id);
    return Promise.all(
      ids.map(
        async (packId): Promise<PackWithProgress> =>
          await this.getPackWithProgress(packId)
      )
    );
  }

  static async getPackWithProgress(packId: string): Promise<PackWithProgress> {
    const boardIdsForPack = await CompletedBoardsRepository.listBoardIdsForPack(
      packId
    );
    const completedMedals = boardIdsForPack
      .map((boardId) => this.getSpecById(packId, boardId).difficulty)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const totalMedals = BoardRegistry.getSpecsForPack(packId)
      .map((board) => board.difficulty)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const coverBoard = BoardBuilder.buildBoardFromSpec(
      packId,
      this.getCoverBoard(packId)
    );
    const completedPercent = Math.round((completedMedals * 100) / totalMedals);
    return {
      packId,
      coverBoard,
      completedMedals,
      totalMedals,
      completedPercent,
    };
  }

  private static getCoverBoard(packId: string) {
    const pack = this.getPackById(packId);
    return pack.boardSpecs[pack.coverBoardIndex];
  }

  static getSpecsForPack(packId: string) {
    const specs = this.packsMapById.get(packId)?.boardSpecs;
    if (specs === undefined) {
      throw new Error(`Specs for pack ${packId} do not exist.`);
    }
    return specs;
  }

  static async next(packId: string): Promise<Board | null> {
    const completedIdsSet = new Set(
      await CompletedBoardsRepository.listBoardIdsForPack(packId)
    );
    const specs = this.getSpecsForPack(packId);
    for (const spec of specs) {
      if (!completedIdsSet.has(spec.boardId)) {
        const board = BoardBuilder.buildBoardFromSpec(packId, spec);
        await NextBoardRepository.set(packId, board.spec.boardId);
        return board;
      }
    }
    await NextBoardRepository.set(packId, null);
    return null;
  }
}
