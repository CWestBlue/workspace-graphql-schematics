import { ItemsService } from './providers';

export default {
    Query: {
        items: async (_, args, { injector }) => injector.get(ItemsService).getItems()
    }
};
