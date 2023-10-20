
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import CreatePost from "@/components/CreatePostComponent"; 
import HeaderComponent from '@/components/HeaderComponent'
import svgImage from "@/app/styles/undraw_mobile_content_xvgr.svg"

export const dynamic = 'force-dynamic'




export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

   var isTrue = false;



  

  const {
    data: { user },
  } = await supabase.auth.getUser();
 
 
  
   
  if (user) {
    const { data, error} = await supabase.from('user-profiles').select().eq("id", user?.id);
    
    
      
     
    if(data?.length==0){
      redirect("createprofile");
    }
    else {
      redirect("home");
    }
    

  }
  

  
  
   
  

  

  
   
   
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      
      
      
      <div className="animate-in flex flex-col gap-14 opacity-0 px-3 py-16 lg:py-24 text-foreground w-screen">
        <div className="landing-wrap flex items-center justify-between">
          <div className="landing-left ml-40">
          <div className="flex flex-col items-center mb-4 lg:mb-12">
          
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
           <strong className=''>Connect,Create,Communicate</strong> More Than a Social Network!
          </p>

         
          {!user? <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
          <Link className="link-hover green-btn p-4" href="/login">Get started</Link>
             
          </div>: null}
          
        </div>
          </div>
          <div className="landing-right mr-60 ">
          <Image
          
          src={svgImage}
          alt="Avatar"
          className="avatar image"
          style={{ height: 400, width: 400 }}
        ></Image>
          </div>
        </div>
       

        

        <div className="flex justify-center text-center text-xs mt-12">
          <p>
            Made with ❤️ by{' '}
            <Link
              href="https://www.youtube.com/shorts/6s5jXh3DqnI"
              target="_blank"
              className="font-bold link-hover"
              
            >
              Sadbois
            </Link>
          </p>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1697802524 absolute">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
    </div>
  )
}