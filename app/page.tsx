
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import CreatePost from "@/components/CreatePostComponent"; 
import HeaderComponent from '@/components/HeaderComponent'

export const dynamic = 'force-dynamic'




export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

   var isTrue = false;



  

  const {
    data: { user },
  } = await supabase.auth.getUser();
 
 
  
 

   const { data, error} = await supabase.from('user-profiles').select().eq("id", user?.id);
      
    
      
     
      if(data?.length==0){
        redirect("createprofile");
      }
      
   console.log(data);
   
  

  

  
   var profileHref = data?"/profile/" + data[0].id: ""
   
  return (
    <div className="w-full flex flex-col items-center">
      
      
      {user? <CreatePost user={user}></CreatePost>: null}
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            
          </div>
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
           The new way of connecting people.{' '}
            <strong>Share</strong> and <strong>Socialize</strong>
          </p>

         
          {!user? <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
          <Link href="/login">Get started</Link>
             
          </div>: null}
          
        </div>

        

        <div className="flex justify-center text-center text-xs">
          <p>
            Made with ❤️ by{' '}
            <Link
              href="https://www.youtube.com/shorts/6s5jXh3DqnI"
              target="_blank"
              className="font-bold"
            >
              Sadbois
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}