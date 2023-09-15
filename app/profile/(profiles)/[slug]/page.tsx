

import Profile from "../../page";
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <Profile targetProfile={params.slug}></Profile>
   )
}

export default page;