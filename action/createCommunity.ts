'use server'


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

        
    } catch (error) {
        console.error("Failed to create community",error);
        return {error: "Failed to create community"};
}
}
