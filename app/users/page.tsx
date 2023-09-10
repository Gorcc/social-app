import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: users } = await supabase.from("users").select();

  return (
    <ul className="my-auto text-foreground">
      {users?.map((user) => (
        <li key={user.id}>{user.name}{user.password}</li>
      ))}
    </ul>
  );
}