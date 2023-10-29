import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import HeaderComponent from '@/components/HeaderComponent'

export default async function Account() {
  const supabase = createServerComponentClient({ cookies })
 

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select()
    .eq("id", user?.id);


 
  return ( 
   
              <AccountForm cuser={userProfile} session={session} />


   
    
)
 
 
}