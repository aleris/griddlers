import localforage from "localforage";
import { BoardRegistry } from "../registry/BoardRegistry";
import { PersistedBoard } from "./PersistedBoard";
import { REPOSITORY_NAME } from "./repository";

export class CompletedBoardsRepository {
  public static readonly STORE_NAME_PREFIX = "completed-boards";

  private static readonly storeMap = new Map<string, LocalForage>();

  private static getStore(packId: string) {
    const pack = BoardRegistry.packsMapById.get(packId);
    if (pack === undefined) {
      throw new Error(`Pack ${packId} does not exist.`);
    }
    let storeInMap = this.storeMap.get(pack.id);
    if (storeInMap === undefined) {
      storeInMap = localforage.createInstance({
        name: REPOSITORY_NAME,
        storeName: `${CompletedBoardsRepository.STORE_NAME_PREFIX}-${pack.position}-${pack.id}`,
      });
      this.storeMap.set(pack.id, storeInMap);
    }
    return storeInMap;
  }

  static async setBoard(board: PersistedBoard) {
    return await this.getStore(board.packId).setItem(board.id, board);
  }

  static async getBoard(
    packId: string,
    boardId: string
  ): Promise<PersistedBoard> {
    const item = (await this.getStore(packId).getItem(
      boardId
    )) as PersistedBoard | null;
    if (item === null) {
      throw new Error(`${boardId} not found`);
    }
    return item;
  }

  static async listBoardsForPack(packId: string): Promise<PersistedBoard[]> {
    const ids = await this.getStore(packId).keys();
    return Promise.all(
      ids.map(
        async (id): Promise<PersistedBoard> => await this.getBoard(packId, id)
      )
    );
  }

  static async listBoardIdsForPack(packId: string): Promise<string[]> {
    return await this.getStore(packId).keys();
  }
}
