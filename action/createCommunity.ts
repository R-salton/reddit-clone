'use server'

import { createSubreddit } from "@/sanity/lib/subreddits/createSubreddit";
import { getUser } from "@/sanity/lib/user/getUser";


export type ImageData = {
    base64: string;
    fileName: string;
    contentType: string;
} | null;

export async function createCommunity(
    name: string,
    imageBase64: string | null | undefined,
    fileName: string | null | undefined,
    contentType: string | null | undefined,
    slug?: string,
    description?: string
){
    try {
        const user = await getUser();
        if("error" in user){
            return {error: user.error};
        }

        // Prepare image data if provided
        let imageData: ImageData = null;
        if(imageBase64 && fileName && contentType){
            imageData = {
                base64: imageBase64,
                fileName: fileName,
                contentType: contentType
            };
        };

        const result = await createSubreddit(
            name,
            user._id,
            imageData,
            slug,
            description 
        );

        return result;

        
    } catch (error) {
        console.error("Failed to create community",error);
        return {error: "Failed to create community"};
}
}
