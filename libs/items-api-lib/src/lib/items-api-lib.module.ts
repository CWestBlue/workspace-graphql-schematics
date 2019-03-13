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
    stream: String
    totalhealth: Float
    totalgrowth: Float
    current: Float
    type: String
    months: [Month]
}

type Month {
    monthname: String
    present: Float
    health: Float
    growth: Float
}
`;

export const ItemsApiLibModule = new GraphQLModule({
    providers: [ItemsService],
    resolvers,
    typeDefs
});
