import { MetadataRoute } from "next";


export default function robots():MetadataRoute.Robots{
    return{
        rules:{
            userAgent: '*',
            allow: '/',
            disallow:[
                '/admin',
                '/admin/*',
                '/api',
                '/page-admin',
                '/blog-admin',
                '/registration-admin'

            ]
        },
        sitemap:"https://nstqb.org/sitemap.xml"
    }


}