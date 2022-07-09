import { gql, request } from "graphql-request";
import {useQuery} from 'react-query';
import { CYBERCONNECT_ENDPOINT } from "../../../app/config";

export const GET_ADDR_CONNECTION_QUERY = gql`
    query identity(
        $address: String!
        $first: Int
        $after: String
        $namespace: String
    ) {
        identity(address: $address, network: ETH) {
            avatar
            followings(
                namespace: $namespace
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                    avatar
                    ens
                }
            }
            followers(
                namespace: $namespace
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                    avatar
                    ens
                }
            }
            friends(
                namespace: $namespace
                type: FOLLOW
                first: $first
                after: $after
            ) {
                pageInfo {
                    hasNextPage
                }
                list {
                    address
                    avatar
                    ens
                }
            }
        }
    }
`;


export function useConnections() {
    return useQuery("connections", async () => {
        const {
            identity: { data },
        } = await request(
            CYBERCONNECT_ENDPOINT,
            GET_ADDR_CONNECTION_QUERY
        );
        return data;
    });
}