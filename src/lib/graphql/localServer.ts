import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { execute, GraphQLSchema, parse, validate, specifiedRules } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Build an executable schema once. No HTTP server is started.
let schema: GraphQLSchema | null = null;

export function getExecutableSchema(): GraphQLSchema {
  if (!schema) {
    schema = makeExecutableSchema({ typeDefs, resolvers: resolvers as any });
  }
  return schema;
}

export async function graphqlRequest<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<{ data: T; errors?: readonly any[] }> {
  const schema = getExecutableSchema();
  const document = parse(query);
  const errors = validate(schema, document, specifiedRules);
  if (errors.length) {
    return { data: {} as T, errors };
  }
  const result = await execute({ schema, document, variableValues: variables });
  return { data: result.data as T, errors: result.errors };
}
