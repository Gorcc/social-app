
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import ProfileComponent from './profile'


export default  async function Profile({targetProfile}) {
    const supabase = createServerComponentClient({ cookies });

    const { data, error} = await supabase.from('user-profiles').select().eq("id", targetProfile);

    

    

   
   console.log(data?data[0].user_name:"no data" );


  

   
    return ( 

       <ProfileComponent profileContent={data[0]}></ProfileComponent>
  )
   
   
  }
