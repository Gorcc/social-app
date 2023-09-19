

import Followers from "../../page";
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <Followers targetProfile={params.slug}></Followers>
   )
}

export default page;