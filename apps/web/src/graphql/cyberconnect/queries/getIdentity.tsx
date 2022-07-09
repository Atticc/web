import { gql, request } from "graphql-request";
import { useQuery } from 'react-query';
import { CYBERCONNECT_ENDPOINT } from "../../../app/config";

export function useIdentity({ address }: {address: string}) {
    return useQuery(["identity", address], async () => {
        const {identity} = await request(
            CYBERCONNECT_ENDPOINT,
            gql`
            query {
                identity(address: "${address}") {
                    address
                    domain
                    ens
                    social {
                        twitter
                    }
                    avatar
                    joinTime
                    followerCount
                    followingCount
                }
            }
            `,
        );
        return identity;
    });
}