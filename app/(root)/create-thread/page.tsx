import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  const userId = userInfo._id?.toString(); // Use `toString()` if `_id` is a Buffer

  if(!userInfo?.onboarded) redirect('/onboarding');
  return (
    <>
      <h1 className="head-text">
        create-thread
      </h1>
      <PostThread userId={userId} />
    </>
  )
}

export default Page;