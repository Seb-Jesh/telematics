import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import AddPlatform from "~/components/forms/AddPlatform"
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import newplatformStyles from "~/components/forms/InputForm.css";
import { getStoredPlatforms, storePlatforms } from "~/data/store"
import { createPlatform } from "~/models/platform.server"; 

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newplatformStyles }
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "Add Platform" },
      { name: "description", content: "Add a GPS tracking and IOT Platform" },
    ];
  };

  // export const action = async ({ request }: ActionFunctionArgs) => {
  //   const formData = await request.formData()
  //   const platformData = Object.fromEntries(formData) 
  //   // Add validation
  //   const existingPlatforms = await getStoredPlatforms() 
  //   platformData.id = new Date().toISOString()
  //   const updatedPlatforms = existingPlatforms.concat(platformData)
  //   await storePlatforms(updatedPlatforms)
  //   return redirect("/platforms")
  // };

  export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    
    const title = formData.get("title"); 
    const url = formData.get("url"); 
    // Add validation
    if (typeof title !== "string" || title.length === 0) {
      return json({ errors: { title: "Title is required", url: null, } }, { status: 400 });
    }
    if (typeof url !== "string" || url.length === 0) {
      return json({ errors: { title: null, url: "URL is required" } }, { status: 400 });
    }
    
    await createPlatform({ title, url })
    
    return redirect("/platforms")
  }

  // export const action = async ({ request }: ActionFunctionArgs) => {
  //   const formData = await request.formData()
    
  //   const title = formData.get("title"); 
  //   const url = formData.get("url"); 
  //   // Add validation
  //   if (typeof title !== "string" || title.length === 0) {
  //     return json({ errors: { title: "Title is required", url: null, } }, { status: 400 });
  //   }
  //   if (typeof url !== "string" || url.length === 0) {
  //     return json({ errors: { title: null, url: "URL is required" } }, { status: 400 });
  //   }
    
  //   await createPlatform({ title, url })
    
  //   return redirect("/platforms")
  // };

  export default function PlatformForm() {
    return (
        <main>
            <h1>Add Telematics Platform Form</h1>
            <AddPlatform />
        </main>
    )
}