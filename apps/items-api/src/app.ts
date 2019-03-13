import { GraphQLModule } from '@graphql-modules/core';
import { ItemsApiLibModule } from '@libs/items-api-lib';

export const ItemsApiModule = new GraphQLModule({
    imports: [ItemsApiLibModule],
    name: 'ItemsApi'
});
