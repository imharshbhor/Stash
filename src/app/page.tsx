import ImageGallery from "./components/Gallery/ImageGallery";
import SignInPrompt from "./components/signInPrompt/page";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const user = auth();

  if (!(await user).userId) {
    return <SignInPrompt />;
  } else {
    return <ImageGallery />;
  }
}
