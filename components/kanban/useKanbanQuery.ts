import { COLLECTION_DEALS, DB_ID } from "@/app.constants";
import { DB } from "@/lib/appwrite";
import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";
import type { ICard } from "./kanban.types";

export const useKanbanQuery = () => {
  return useQuery({
    queryKey: ["deals"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard = KANBAN_DATA.map((column) => ({
        ...column,
        items: [] as ICard[],
      }));
    },
  });
};
