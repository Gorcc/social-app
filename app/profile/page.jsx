
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import ProfileComponent from './profile'


export default  async function Profile({targetProfile}) {
    const supabase = createServerComponentClient({ cookies });

   
    const { data:profile, error} = await supabase.from('user-profiles').select().eq("id", targetProfile);
        

    
    const { data:posts} = await supabase.from('posts').select().eq("user_id", targetProfile);

    
   
    

    

   
   


  

   
    return ( 
       <div>
       
       <ProfileComponent posts={posts} profileContent={profile[0]}></ProfileComponent>
       </div>
  )
   
   
  }
