import localforage from "localforage";
import { PersistedBoard } from "./PersistedBoard";
import { REPOSITORY_NAME } from "./repository";

export class NextBoardRepository {
  public static readonly STORE_NAME = "next-board";

  private static readonly store = localforage.createInstance({
    name: REPOSITORY_NAME,
    storeName: NextBoardRepository.STORE_NAME,
  });

  static async set(packId: string, boardId: string | null) {
    return await this.store.setItem(packId, boardId);
  }

  static async get(packId: string): Promise<string | null> {
    return (await this.store.getItem(packId)) as string | null;
  }
}
