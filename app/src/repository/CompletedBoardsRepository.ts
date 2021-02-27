import localforage from "localforage";
import { PersistedBoard } from "./PersistedBoard";
import { REPOSITORY_NAME } from "./repository";

export class CompletedBoardsRepository {
  public static readonly STORE_NAME = "completed-boards";

  private static readonly store = localforage.createInstance({
    name: REPOSITORY_NAME,
    storeName: CompletedBoardsRepository.STORE_NAME,
  });

  static async set(board: PersistedBoard) {
    return await this.store.setItem(board.id, board);
  }

  static async get(id: string): Promise<PersistedBoard> {
    const item = (await this.store.getItem(id)) as PersistedBoard | null;
    if (item === null) {
      throw new Error(`${id} not found`);
    }
    return item;
  }

  static async list(): Promise<PersistedBoard[]> {
    const ids = await this.store.keys();
    return Promise.all(
      ids.map(async (id): Promise<PersistedBoard> => await this.get(id))
    );
  }

  static async listIds(): Promise<string[]> {
    return await this.store.keys();
  }
}
