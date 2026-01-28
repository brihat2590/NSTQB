import { Metadata } from "next";


export function generateMetadata(data:{
    title:string,
    description:string,
    image:string,
    url:string
}) : Metadata{
    return{
        title:`${data.title}`,
        description:data.description,
        openGraph:{
            title:data.title,
            description:data.description,
            url:data.url,
            images:[
                {
                    url:data.image,
                    width:800,
                    height:600,
                    alt:data.title
                }
            ],
            type:"article"
        }
    }


}