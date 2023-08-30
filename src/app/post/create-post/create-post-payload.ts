export interface CreatePostPayload {
    postName: string;
    subredditName?: string;
    url?: string;
    description: string;
}