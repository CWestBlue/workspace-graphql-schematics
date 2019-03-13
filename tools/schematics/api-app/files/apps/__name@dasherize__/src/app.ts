import { GraphQLModule } from '@graphql-modules/core';

export const <%= classify(name + 'Module') %> = new GraphQLModule({
    imports: [],
    name: '<%= classify(name) %>'
});
