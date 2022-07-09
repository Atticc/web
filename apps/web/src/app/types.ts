export type Identity = {
    address: string;
    domain: string;
    ens: string;
    social: {
        twitter: string;
    };
    avatar: string;
    joinTime: number;
    followerCount: number;
    followingCount: number;
};

export type SocialConnection = {
    address: string;
    alias: string;
    avatar: string;
    domain: string;
    ens: string;
};

export type SocialConnectionsPaginated = {
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
    };
    list: SocialConnection[];
};

export type AllSocialConnections = {
    identity: {
        avatar: string;
        followers: SocialConnectionsPaginated;
        followings: SocialConnectionsPaginated;
        friends: SocialConnectionsPaginated;
    };
};

export type RecommendationData = {
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
    };
    list: SocialConnection[];
};

export type AllRecommendations = {
    recommendations: {
        data: RecommendationData;
    };
};
