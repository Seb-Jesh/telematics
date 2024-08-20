import type { Manufacturer, Device } from "@prisma/client";
import { db } from "~/utils/db.server";

// MANUFACTURER FUNCTIONS //
// export async function getManufacturer({
//     maker,
//   }: Pick<Manufacturer, "maker">) {
//     return await db.manufacturer.findFirst({
//       select: { id: true,
//         devices: {
//           select: {
//             id: true,
//             model: true,
//             sn: true,
//             imei: true,
//             unit: {
//               select: {
//                 id: true
//               }
//             }
//           }
//         }
//        },
//       where: { maker },
//     });
//   }

  export async function getManufacturer({
    maker,
  }: Pick<Manufacturer, "maker">) {
    return await db.manufacturer.findFirst({
      include: {
        devices: {
          include: {
            sim: true,
            unit: {
              include: {
                client: true,
              }
            },
          },
          orderBy: {
            imei: "asc"
          },
        },
      },
      where: { maker },
    })
  }

  
export async function getManufacturers() {
    return await db.manufacturer.findMany({
      select: { id: true, maker: true, url: true },
      orderBy: { maker: "asc" },
    });
  }

export async function createManufacturer({
    maker,
    url,
  }: Pick<Manufacturer, "maker" | "url" > ) {
    return await db.manufacturer.create({
      data: {
        maker,
        url,        
      },
    });
  }

export async function deleteManufacturer({
    id,
  }: Pick<Manufacturer, "id"> ) {
    return await db.manufacturer.delete({
      where: { id },
    });
  }

// DEVICE FUNCTIONS //
export async function createDevice({
    model,
    sn,
    imei,
    manufacturerId,
  }: Pick<Device, "model" | "sn" | "imei" > & {
    manufacturerId: Manufacturer["id"];
  } ) {
    return await db.device.create({
      data: {
        model,
        sn,
        imei,
        manufacturer: {
          connect: {
              id: manufacturerId
          }
      }        
      },
    });
  }

export async function updateDevice({
    id,
    model,
    sn,
    imei,
  }: Pick<Device, "id" | "model" | "sn" | "imei" >  ) {
    return await db.device.update({
      where: {
        id,
      },
      data: {
        model,
        sn,
        imei,        
      },
    });
  }

// export async function AddSimToDevice({
//   id, 
// }: Pick<Device, "id">) {
//   return await db.device.update({
//     where: {
//       id: id,
//     },
//     data: {
//       sim: {
//         connect: {
//           msisdn: "251",
//         }
//       }
//     }
//   })
// }

export async function getDevice({
    imei,
  }: Pick<Device, "imei">) {
    return await db.device.findFirst({
      select: { 
        id: true, 
      },
      where: { imei },
    });
  }

export async function getDeviceById({
    id,
  }: Pick<Device, "id">) {
    return await db.device.findFirst({
      select: { 
        id: true, 
        model: true,
        sn: true,
        imei: true,
        sim: {
          select: {
            msisdn: true,
          }
        },
        unit: {
          select: {
            regMark: true,
            client: {
              select: {
                name: true,
              }
            }
          }
        }
      },
      where: { id },
    });
  }

export async function getDevices() {
    return db.device.findMany({
      select: { imei: true },
      orderBy: { imei: "asc" },
    });
  }

export async function getUnlinkedDevices() {
    return db.device.findMany({
      where: {
        unit: null,
      },
      orderBy: { imei: "asc" },
    });
  }

  export async function RemoveSimFromDevice({
    id,
  }: Pick<Device, "id"> ) {
    return await db.device.update({
      where: {
        id: id,
      },
      data: {
        sim: {
          disconnect: true,
        }
      }
    })
  }

  export async function deleteDevice({
    id,
  }: Pick<Device, "id"> ) {
    return await db.device.delete({
      where: { id },
    });
  }