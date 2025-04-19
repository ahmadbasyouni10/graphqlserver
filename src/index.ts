import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// this schema is the shape of the data that will be returned from the graphql server
// for every object in our data, we need to define a type for the queryable fields
const typeDefs = `#graphql

    type player {
        id: ID!
        name: String!
        team: String!
        position: String!
        number: Int!
    }

    type Query { 
        players: [player!]!
    }
`;

interface Player { 
    id: number;
    name: string;
    team: string;
    position: string;
    number: number;
}

const players: Player[] = [
    {
        id: 1,
        name: "Lionel Messi",
        team: "Inter Miami",
        position: "Winger",
        number: 10
    },
    {
        id: 2,
        name: "Mo Salah",
        team: "Liverpool",
        position: "Winger",
        number: 11
    }
]

const resolvers = {
    Query: {
        players: (): Player[] => players,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server is running at ${url}`)
