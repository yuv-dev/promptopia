import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    // console.log(prompts);
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error); // Log the error for debugging purposes
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
