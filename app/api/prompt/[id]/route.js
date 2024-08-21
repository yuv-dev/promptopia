import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Read GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    // console.log(prompts);
    if (!prompt) return new Response("Prompt not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
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

//Edit/Update  PATCH

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not Found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating prompt", error); // Log the error for debugging purposes
    return new Response("Failed to update post", { status: 500 });
  }
};

//DELETE DELETE

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt Deleted Successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting prompt", error); // Log the error for debugging purposes
    return new Response("Failed to Delete prompt", { status: 500 });
  }
};
