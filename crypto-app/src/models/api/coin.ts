import {IResponseSchema} from '.'

export interface ICoin {
    Algorithm: string
    AssetLaunchDate: string
    BlockNumber: number
    BlockReward: number
    BlockTime: number
    DocumentType: string
    FullName: string
    Id: string
    ImageUrl: string
    Internal: string
    MaxSupply: number
    Name: string
    NetHashesPerSecond: number
    ProofType: string
    Rating: {
        Weiss: {
            MarketPerformanceRating: string
            Rating: string
            TechnologyAdoptionRating: string
        }
    }
    Type: number
    Url: string
}

export type CoinsResponse = IResponseSchema<{CoinInfo: ICoin}[]>