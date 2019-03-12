import { GraphQLModule } from '@graphql-modules/core';
import { ColorsApiLibModule } from '@playground-workspace/colors';

export const ColorsApiModule = new GraphQLModule({
    imports: [ColorsApiLibModule],
    name: 'ColorsApi'
});
