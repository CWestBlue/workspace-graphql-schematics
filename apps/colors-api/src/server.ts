// tslint:disable:no-console
import { GraphQLModule } from '@graphql-modules/core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 4000;
const trace: boolean =
    (process.env.TRACE || 'false').toLowerCase() === 'true' ? true : false;
export async function bootstrap(AppModule: GraphQLModule) {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const { schema, context, subscriptions } = AppModule;

    // express server
    const app = express();
    // cross-origin resource sharing
    app.use(cors());

    // Forge information
    //   forge.init(app);

    // gcs image storage
    //   images.init(app);

    // graphql (Apollo) integration
    const server = new ApolloServer({
        context,
        introspection: true,
        playground: true,
        schema,
        subscriptions,
        tracing: trace
    });
    server.applyMiddleware({ app });
    await app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
    });

    //   consul.register();
}
