
import { sanityFetch } from "../live";
import { addUser} from "../addUser";
import { defineQuery } from 'groq';
import { currentUser } from "@clerk/nextjs/server";


interface UserResult {
    _id: string;
    username: string;
    email: string;
    imageUrl: string;
}

const parseUsername = (username: string) => {
    const rundomNumber = Math.floor(1000 + Math.random() * 9000);
    return(
        username
        .replace(/\s+(.)/g,(_,char)=> char.toUpperCase())
        .replace(/\s+/g,"") + rundomNumber
    );

}

export async function getUser(): Promise<UserResult | {error: string}>{

    try {
        console.log("Fetching user");
        const loggedInUser = await currentUser();

        if(!loggedInUser){
            return {error: "User not found"};
        }
        console.log(`found clerk User: ${loggedInUser.id}`);
        const getExistingUserQuery = defineQuery(
            `*[_type == "user" && _id == $id][0]`
        );
        

        // console.log("Checking if user exists in sanity database");
        const existingUser = await sanityFetch({
            query: getExistingUserQuery,
            params: {
                id: loggedInUser.id
            }
        });
        console.log(existingUser);

        if(existingUser.data?._id){
            console.log(`User already exists in sanity database with id: ${existingUser.data._id}`);
            const user = {
                _id: existingUser.data._id,
                username: existingUser.data.username!,
                email: existingUser.data.email!,
                imageUrl: existingUser.data.imageUrl!
            };

            return user;
        }

        console.log("User does not exist in sanity database, adding user");

        const newUser = await addUser({
            id: loggedInUser.id,
            username: parseUsername(loggedInUser.fullName!),
            imageUrl: loggedInUser.imageUrl,
            email: loggedInUser.primaryEmailAddress?.emailAddress || loggedInUser.emailAddresses[0].emailAddress,
        });

        

        console.log(`User added to sanity database wit id: ${newUser._id}`);
        const user = {
            _id: newUser._id,
            username: newUser.username!,
            email: newUser.email,
            imageUrl: newUser.imageUrl
        };

        return user;


        
    } catch (error) {
        console.error("Failed to fetch user",error);
        return {error: "Failed to fetch user"};
        
    }

}