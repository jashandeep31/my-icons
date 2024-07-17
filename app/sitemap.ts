// import { db } from "@/lib/db"
// import { MetadataRoute } from "next"

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const URL = process.env.NEXT_PUBLIC_SELF ?? ""
//   const map = [
//     {
//       url: `${URL}`,
//       lastModified: new Date(),
//       priority: 1,
//     },
//     {
//       url: `${URL}/create`,
//       lastModified: new Date(),
//       priority: 1,
//     },
//     { url: `${URL}/icons`, lastModified: new Date(), priority: 0.5 },
//     {
//       url: `${URL}/terms-and-conditions`,
//       lastModified: new Date(),
//       priority: 0.5,
//     },
//     { url: `${URL}/privacy-policy`, lastModified: new Date(), priority: 0.5 },
//     { url: `${URL}/privacy-policy`, lastModified: new Date(), priority: 0.5 },
//   ]

//   const icons = await db.icon.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   })

//   icons.map((icon, index: number) => {
//     map.push({
//       url: `${URL}/icon/${icon.id}`,
//       lastModified: new Date(),
//       priority: 0.7,
//     })
//   })

//   return map
// }
