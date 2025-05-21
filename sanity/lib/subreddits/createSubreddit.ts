import { ImageData } from "@/action/createCommunity";
import { defineQuery } from "groq";
import { client } from "../client";
import { sanityFetch } from "../live";
import { Subreddit } from "@/sanity.types";

export async function createSubreddit(
    name: string,
    moderatorId: string,
    imageData: ImageData | null,
    customSlug?: string,
    customDescription?: string
){

    try {
        console.log(`Creating subreddit with name: ${name} with moderatorId: ${moderatorId}`);

                const checkExistingSubredditQuery = defineQuery(
                    `*[_type == "subreddit" && title == $name][0]{
                        id
                    }
                `);

                const existingSubreddit = await sanityFetch({
                    query: checkExistingSubredditQuery,
                    params: {
                        name
                    }
                });


                if(existingSubreddit.data){
                    console.log(`Subreddit with name: ${name} already exists`);
                    return {error: "Subreddit already exists"};
                };


                if(customSlug){
                    const checkExistingSubredditSlugQuery = defineQuery(
                        `*[_type == "subreddit" && slug.current == $slug][0]{
                            id
                        }
                    `);

                    const existingSubredditSlug = await sanityFetch({
                        query: checkExistingSubredditSlugQuery,
                        params: {
                            slug: customSlug
                        }
                    });
                    if(existingSubredditSlug.data){
                        console.log(`Subreddit with slug: ${customSlug} already exists`);
                        return {error: "Subreddit already exists"};
                    };

                };

                // Create Slug from name or use custom slug
                const slug = customSlug || name.toLowerCase().replace(/\s+/g, "-");
                let imageAsset;
                if(imageData){
                    try {

                        // Extract base64 from data
                        const base64Data = imageData.base64.split(",")[1];

                        //convert base64 to buffer
                        const buffer = Buffer.from(base64Data, "base64");

                        // Uploading image to sanity
                        imageAsset = await client.assets.upload("image", buffer, {
                            filename: imageData.fileName,

                        });

                        console.log("Image asset created with id: ", imageAsset._id);
                        
                    } catch (error) {
                        console.log("Failed to upload image to sanity", error);
                        
                    }
                }

                // Create subreddit
                const subRedditDoc: Partial<Subreddit> = {
                    _type: "subreddit",
                    title: name,
                    description: customDescription || `Welcome to r/${name}!`,
                    slug: {
                        _type: "slug",
                        current: slug
                    },
                    moderator: {
                        _type: "reference",
                        _ref: moderatorId
                    },
                    createdAt: new Date().toISOString(),
                }

                //add image asset to subreddit if it exists
                if(imageAsset){
                    subRedditDoc.image = {
                        _type: "image",
                        asset: {
                            _type: "reference",
                            _ref: imageAsset._id
                        }
                    }
                };

                const subreddit = await client.create(subRedditDoc as Subreddit);
                console.log("Subreddit created with id: ", subreddit._id);

                return{subreddit}


    } catch (error) {
        console.error("Failed to create subreddit",error);
        return {error: "Failed to create subreddit"};
}
}
