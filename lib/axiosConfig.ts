// export const baseUrl = "https://my-icons-bice.vercel.app/api";
// export const baseUrl = "https://my-icons-bice.vercel.app/api" as string;
export const baseUrl = process.env.NEXT_PUBLIC_SELF_URL;
console.log("🚀 ~ baseUrl:", baseUrl);
