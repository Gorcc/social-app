

import SearchPage from "../../page";
import {FC} from "react";

interface pageProps{
   params: {slug: string}
}






const page: FC<pageProps> = ({params}) => {
   return (
      <SearchPage searchQuery={params.slug}></SearchPage>
   )
}

export default page;