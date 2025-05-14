import {sanityFetch} from "../live"
import {defineQuery} from "groq"


export async function getSubreddits (){

    const getSubredditsQuery = defineQuery(` *[_type == "subreddit"]{
        ...,
        "slug": slug.current,
        "moderator" : moderator->
    } | order(createdAt desc) ` );


    const subReddits = await sanityFetch({query: getSubredditsQuery});

    return subReddits.data


}