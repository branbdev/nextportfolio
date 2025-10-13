import { createApolloServer } from '../../src/lib/graphql/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

// Create Apollo Server instance
const server = createApolloServer();

// Export the API handler
export default startServerAndCreateNextHandler(server);