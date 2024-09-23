export interface SampServer {
    id: number;
    success: boolean;
    lastUpdated: string;
    worldTime: string;
    playersOnline: number;
    maxPlayers: number;
    isOpenMp: boolean;
    lagComp: boolean;
    name: string;
    gameMode: string;
    ipAddr: string;
    mapName: string;
    website: string;
    version: string;
    language: string;
    sampCac: string;
    requiresPassword: boolean;
    shuffledOrder: number;
    sponsor: boolean;
}