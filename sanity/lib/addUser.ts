import { client } from "./client";
export  async function addUser({
    id,
    username,
    imageUrl,
    email
}: {
    id: string;
    username: string;
    imageUrl: string;
    email: string;

}){
    const user = await client.createIfNotExists(
        {
            _id: id,
            _type: "user",
            username,
            email,
            imageUrl,
            joinedAt: new Date().toISOString(),
        }
    );

    return user;
}