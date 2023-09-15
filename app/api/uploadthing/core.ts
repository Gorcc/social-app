import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
 profilePic:f({image: { maxFileSize:"8MB", maxFileCount:1}}).onUploadComplete(() => {})
 
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;