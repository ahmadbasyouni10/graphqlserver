import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    type Player {
        id: ID!
        name: String!
        teamIds: [ID!]!
        teams: [Team!]!
        position: String!
        number: Int!
        trophies: [Trophy!]
    }
    
    type Team {
        id: ID!
        name: String!
        playerIds: [ID!]!
        players: [Player!]!
        coach: Coach
        country: String!
        stadium: Stadium
    }

    type Coach {
        id: ID!
        name: String!
        teamId: ID
        team: Team
        experience: Int!
        specialty: String!
    }

    type Stadium {
        id: ID!
        name: String!
        capacity: Int!
        teamId: ID!
        team: Team!
    }

    type Trophy {
        id: ID!
        name: String!
        year: Int!
        playerId: ID!
        player: Player!
    }

    type Query { 
        players: [Player!]!
        player(id: ID!): Player
        teams: [Team!]!
        team(id: ID!): Team
        coaches: [Coach!]!
        coach(id: ID!): Coach
        stadiums: [Stadium!]!
        trophies: [Trophy!]!
    }
`;

// TypeScript interfaces
interface Player {
    id: string;
    name: string;
    teamIds: string[];
    position: string;
    number: number;
}

interface Team {
    id: string;
    name: string;
    playerIds: string[];
    coachId: string | null;
    country: string;
    stadiumId: string;
}

interface Coach {
    id: string;
    name: string;
    teamId: string | null;
    experience: number;
    specialty: string;
}

interface Stadium {
    id: string;
    name: string;
    capacity: number;
    teamId: string;
}

interface Trophy {
    id: string;
    name: string;
    year: number;
    playerId: string;
}

// Sample dataset with proper references
const players: Player[] = [
    {
        id: "p1",
        name: "Lionel Messi",
        teamIds: ["t7", "t6", "t5"],
        position: "Forward",
        number: 10
    },
    {
        id: "p2",
        name: "Mo Salah",
        teamIds: ["t4", "t3", "t1"],
        position: "Forward",
        number: 11
    },
    {
        id: "p3",
        name: "Kevin De Bruyne",
        teamIds: ["t1", "t2", "t3"],
        position: "Midfielder",
        number: 17
    },
    {
        id: "p4",
        name: "Kylian Mbappé",
        teamIds: ["t5", "t8"],
        position: "Forward",
        number: 7
    },
    {
        id: "p5",
        name: "Erling Haaland",
        teamIds: ["t1"],
        position: "Forward",
        number: 9
    }
];

const teams: Team[] = [
    {
        id: "t1",
        name: "Manchester City",
        playerIds: ["p3", "p5"],
        coachId: "c1",
        country: "England",
        stadiumId: "s1"
    },
    {
        id: "t2",
        name: "Manchester United",
        playerIds: ["p3"],
        coachId: "c2",
        country: "England",
        stadiumId: "s2"
    },
    {
        id: "t3",
        name: "Chelsea",
        playerIds: ["p2", "p3"],
        coachId: "c3",
        country: "England",
        stadiumId: "s3"
    },
    {
        id: "t4",
        name: "Liverpool",
        playerIds: ["p2"],
        coachId: "c4",
        country: "England",
        stadiumId: "s4"
    },
    {
        id: "t5",
        name: "Paris Saint-Germain",
        playerIds: ["p1", "p4"],
        coachId: "c5",
        country: "France",
        stadiumId: "s5"
    },
    {
        id: "t6",
        name: "Barcelona",
        playerIds: ["p1"],
        coachId: "c6",
        country: "Spain",
        stadiumId: "s6"
    },
    {
        id: "t7",
        name: "Inter Miami",
        playerIds: ["p1"],
        coachId: "c7",
        country: "USA",
        stadiumId: "s7"
    },
    {
        id: "t8",
        name: "Real Madrid",
        playerIds: ["p4"],
        coachId: "c8",
        country: "Spain",
        stadiumId: "s8"
    }
];

const coaches: Coach[] = [
    {
        id: "c1",
        name: "Pep Guardiola",
        teamId: "t1",
        experience: 15,
        specialty: "Possession Football"
    },
    {
        id: "c2",
        name: "Erik ten Hag",
        teamId: "t2",
        experience: 10,
        specialty: "Total Football"
    },
    {
        id: "c3",
        name: "Mauricio Pochettino",
        teamId: "t3",
        experience: 12,
        specialty: "High Press"
    },
    {
        id: "c4",
        name: "Jürgen Klopp",
        teamId: "t4",
        experience: 20,
        specialty: "Gegenpressing"
    },
    {
        id: "c5",
        name: "Luis Enrique",
        teamId: "t5",
        experience: 14,
        specialty: "Counter Attack"
    },
    {
        id: "c6",
        name: "Xavi Hernandez",
        teamId: "t6",
        experience: 5,
        specialty: "Tiki-Taka"
    },
    {
        id: "c7",
        name: "Gerardo Martino",
        teamId: "t7",
        experience: 18,
        specialty: "Defensive Organization"
    },
    {
        id: "c8",
        name: "Carlo Ancelotti",
        teamId: "t8",
        experience: 25,
        specialty: "Man Management"
    }
];

const stadiums: Stadium[] = [
    {
        id: "s1",
        name: "Etihad Stadium",
        capacity: 55000,
        teamId: "t1"
    },
    {
        id: "s2",
        name: "Old Trafford",
        capacity: 75000,
        teamId: "t2"
    },
    {
        id: "s3",
        name: "Stamford Bridge",
        capacity: 40000,
        teamId: "t3"
    },
    {
        id: "s4",
        name: "Anfield",
        capacity: 54000,
        teamId: "t4"
    },
    {
        id: "s5",
        name: "Parc des Princes",
        capacity: 48000,
        teamId: "t5"
    },
    {
        id: "s6",
        name: "Camp Nou",
        capacity: 99000,
        teamId: "t6"
    },
    {
        id: "s7",
        name: "Chase Stadium",
        capacity: 18000,
        teamId: "t7"
    },
    {
        id: "s8",
        name: "Santiago Bernabéu",
        capacity: 81000,
        teamId: "t8"
    }
];

const trophies: Trophy[] = [
    {
        id: "tr1",
        name: "Ballon d'Or",
        year: 2023,
        playerId: "p1"
    },
    {
        id: "tr2",
        name: "FIFA World Cup",
        year: 2022,
        playerId: "p1"
    },
    {
        id: "tr3",
        name: "UEFA Champions League",
        year: 2019,
        playerId: "p2"
    },
    {
        id: "tr4",
        name: "Premier League Golden Boot",
        year: 2022,
        playerId: "p2"
    },
    {
        id: "tr5",
        name: "Premier League Player of the Season",
        year: 2020,
        playerId: "p3"
    },
    {
        id: "tr6",
        name: "World Cup Golden Boot",
        year: 2022,
        playerId: "p4"
    },
    {
        id: "tr7",
        name: "Premier League Golden Boot",
        year: 2023,
        playerId: "p5"
    }
];

// Enhanced resolvers with proper references
const resolvers = {
    Query: {
        // Get all players
        players: (): Player[] => players,
        
        // Get a single player by ID
        player: (_, args: {id: string}): Player | undefined =>
            players.find(player => player.id === args.id),
        
        // Get all teams
        teams: (): Team[] => teams,
        
        // Get a single team by ID
        team: (_, args: { id: string }): Team | undefined => 
            teams.find(team => team.id === args.id),
        
        // Get all coaches
        coaches: (): Coach[] => coaches,
        
        // Get a single coach by ID
        coach: (_, args: { id: string }): Coach | undefined => 
            coaches.find(coach => coach.id === args.id),
            
        // Get all stadiums
        stadiums: (): Stadium[] => stadiums,
        
        // Get all trophies
        trophies: (): Trophy[] => trophies
    },
    
    // Field resolvers for Player type
    Player: {
        // Resolve the teams for a player (uses the array of team IDs)
        teams: (parent: Player): Team[] => 
            parent.teamIds.map(teamId => teams.find(team => team.id === teamId)).filter(Boolean) as Team[],
        
        // Resolve the trophies for a player
        trophies: (parent: Player): Trophy[] =>
            trophies.filter(trophy => trophy.playerId === parent.id)
    },
    
    // Field resolvers for Team type
    Team: {
        // Resolve the players for a team
        players: (parent: Team): Player[] => 
            parent.playerIds.map(playerId => players.find(player => player.id === playerId)).filter(Boolean) as Player[],
        
        // Resolve the coach for a team
        coach: (parent: Team): Coach | undefined => 
            coaches.find(coach => coach.teamId === parent.id),
            
        // Resolve the stadium for a team
        stadium: (parent: Team): Stadium | undefined =>
            stadiums.find(stadium => stadium.teamId === parent.id)
    },
    
    // Field resolvers for Coach type
    Coach: {
        // Resolve the team for a coach
        team: (parent: Coach): Team | undefined => 
            parent.teamId ? teams.find(team => team.id === parent.teamId) : undefined
    },
    
    // Field resolvers for Stadium type
    Stadium: {
        // Resolve the team for a stadium
        team: (parent: Stadium): Team | undefined =>
            teams.find(team => team.id === parent.teamId)
    },
    
    // Field resolvers for Trophy type
    Trophy: {
        // Resolve the player for a trophy
        player: (parent: Trophy): Player | undefined =>
            players.find(player => player.id === parent.playerId)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server is running at ${url}`)
