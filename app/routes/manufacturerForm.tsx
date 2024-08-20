import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import AddManufacturer from "~/components/forms/AddManufacturer"
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import newmanufacturerStyles from "~/components/forms/InputForm.css";
import { createManufacturer } from "~/models/manufacturer.server";
import { useState } from 'react';

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newmanufacturerStyles }
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "Add Manufacturer" },
      { name: "description", content: "Add a GPS Hardware Manufacturer" },
    ];
  };

  // export const action = async ({ request }: ActionFunctionArgs) => {
  //   const formData = await request.formData()
  //   const manufacturerData = Object.fromEntries(formData) 
  //   // Add validation
  //   const existingManufacturers = await getStoredManufacturers() 
  //   manufacturerData.id = new Date().toISOString()
  //   const updatedManufacturers = existingManufacturers.concat(manufacturerData)
  //   await storeManufacturers(updatedManufacturers)
  //   return redirect("/devices")
  // };

  export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const maker = formData.get("maker"); 
    const url = formData.get("url"); 
    // Add validation
    if (typeof maker !== "string" || maker.length === 0) {
      return json({ errors: { maker: "Maker is required", url: null, } }, { status: 400 });
    }
    if (typeof url !== "string" || url.length === 0) {
      return json({ errors: { maker: null, url: "URL is required" } }, { status: 400 });
    }
    
    await createManufacturer({ maker, url })
    return redirect("/manufacturers")
  };

  export default function ManufacturerForm() {
    const [formData, setFormData] = useState({
      maker: '',
      url: '',
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
      setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    return (
        <main>
            <h1>Add Hardware Manufacturer Form</h1>
            <AddManufacturer formData={formData} handleInputChange={handleInputChange} />
        </main>
    )
}