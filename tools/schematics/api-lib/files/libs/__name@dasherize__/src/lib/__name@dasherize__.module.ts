import { GraphQLModule } from '@graphql-modules/core';
import 'graphql-import-node';
import resolvers from './resolvers';
import { ItemsService } from './providers';

const typeDefs = `
type Query {
    items: [Item]
}

type Item {
    name: String
    type: String
}
`;

export const <%= classify(name + 'Module') %> = new GraphQLModule({
    providers: [ItemsService],
    resolvers,
    typeDefs
});
