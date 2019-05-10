import { Season }  from './season';

export class Game {
    gameScheduleId: number;
     public seasonId: number;
        public divisionID: number;
        public gameId: number;
        public location: string;
        public gameDate: Date;
        public gameTime: Date;
        public homeTeam: string;
        public homeTeamId: number;
        public visitingTeam: string;
        public visitingTeamId: number;
        public homeScore: number;
        public visitorScore: number;
    constructor() { }
}
