import { GraphQLModule } from '@graphql-modules/core';
import { classify } from '@angular-devkit/core/src/utils/strings';

export const <%= classify(name + 'Module') %> = new GraphQLModule({
    imports: [],
    name: '<%= classify(name) %>'
});
