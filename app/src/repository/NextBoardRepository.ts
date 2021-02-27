import localforage from "localforage";
import { PersistedBoard } from "./PersistedBoard";
import { REPOSITORY_NAME } from "./repository";

export class NextBoardRepository {
  public static readonly STORE_NAME = "next-board";

  private static readonly store = localforage.createInstance({
    name: REPOSITORY_NAME,
    storeName: NextBoardRepository.STORE_NAME,
  });

  static async set(boardId: string) {
    return await this.store.setItem("board", boardId);
  }

  static async get(): Promise<string | null> {
    return (await this.store.getItem("board")) as string | null;
  }
}
