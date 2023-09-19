

import Followings from "../../page";
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <Followings targetProfile={params.slug}></Followings>
   )
}

export default page;