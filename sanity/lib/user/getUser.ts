
import { sanityFetch } from "../live";
import { addUser} from "./addUser";
import { defineQuery } from 'groq';
import { currentUser } from "@clerk/nextjs/server";

interface UserResult {
    _id: string;
    username: string;
    email: string;
    imageUrl: string;
}

export async function getUser(): Promise<UserResult | {error: string}>{

    try {
        console.log("Fetching user");
        const logedInUser = await currentUser();

        if(!logedInUser){
            return {error: "User not found"};
        }
        console.log("found clerk User: ${logedInUser.id}");
        const getExistingUserQuery = defineQuery(
            `*[_type == "user" && _id == $userId][0]`
        );

        console.log("Checking if user exists in sanity database");
        const existingUser = await sanityFetch({
            query: getExistingUserQuery,
            params: {
                userId: logedInUser.id
            }
        });

        
        
    } catch (error) {
        
    }

}