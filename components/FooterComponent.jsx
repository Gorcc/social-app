



import Link from 'next/link'


export default function FooterComponent() {
  

   return(
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
    
   )
   
  
}