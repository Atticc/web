import { gql, request } from "graphql-request";
import { useQuery } from 'react-query';
import { CYBERCONNECT_ENDPOINT } from "../../../app/config";

export const GET_RECOMMENDATION = gql`
    query QueryRec($address: String!) {
        recommendations(address: $address) {
            result
            data {
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
                list {
                    address
                    domain
                    ens
                    avatar
                    recommendationReason
                    followerCount
                }
            }
        }
    }
`;

export function useRecommendation() {
    return useQuery("recommendations", async () => {
        const {
            recommendations: { data },
        } = await request(
            CYBERCONNECT_ENDPOINT,
            GET_RECOMMENDATION
        );
        return data;
    });
}