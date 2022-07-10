import { gql, request } from "graphql-request";
import { useQuery } from 'react-query';
import { CYBERCONNECT_ENDPOINT } from "../../../app/config";
import { IUser } from "../../../app/constants";

export const getPopular = async () => {
  try {
    const { popular } = await request(
      CYBERCONNECT_ENDPOINT,
      gql`
      query () {
        popular(first:5, tags: { list: [FEATURED, NFTMARKET,PLAZA] } ) {
          list {
            address
            domain
            avatar
            followerCount
            recommendationReason
            isFollowing
          }
        }
      }
      `
    );
    return popular.list;
  } catch (err) {
    return null;
  }
}

export function usePopular({ onSuccess }: { onSuccess: (data: [IUser]) => void }) {
  return useQuery(["popular"], getPopular, { enabled: false, onSuccess });
}
