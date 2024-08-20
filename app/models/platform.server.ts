import type { Platform, Client, Device, Unit } from "@prisma/client";

import { db } from "~/utils/db.server";

// PLATFORM FUNCTIONS //
export async function getPlatform({
  id,
}: Pick<Platform, "id">) {
  return db.platform.findFirst({
    select: { id: true, title: true },
    where: { id },
  });
}

export async function getPlatformByTitle({
  title,
}: Pick<Platform, "title">) {
  return db.platform.findFirst({
    select: { 
      id: true,
      units: {
        select: {
          client: {
            select: {
              name: true
            }
          }
        }
      }
     },
    where: { title },
  });
}

export async function getPlatforms() {
  return db.platform.findMany({
    select: { id: true, title: true, url: true },
    orderBy: { title: "asc" },
  });
}

export async function createPlatform({
    title,
    url,
  }: Pick<Platform, "title" | "url" > ) {
    return await db.platform.create({
      data: {
        title,
        url,        
      },
    });
  }

export function deletePlatform({
  id,
}: Pick<Platform, "id"> ) {
  return db.platform.delete({
    where: { id },
  });
}

// CLIENT FUNCTIONS //
export async function createClient({
  name,
  contact,
  msisdn,
  address,
}: Pick<Client, "name" | "contact" | "msisdn" | "address" > ) {
  return await db.client.create({
    data: {
      name,
      contact,
      msisdn,
      address,        
    },
  });
}

export async function getClient({
  name,
}: Pick<Client, "name">) {
  return db.client.findFirst({
    select: { id: true, name: true, contact:true, msisdn: true, address: true },
    where: { name },
  });
}

export async function getClients() {
  return db.client.findMany({
    include: {
      units: {
        include: {
          device: {
            include: {
              sim: true,
            }
          },
          platform: true,
          client: true,
        },
        orderBy: {
          regMark: "asc"
        }
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function UpdateClient({
  id,name,contact,msisdn,address
}: Pick<Client, "id" | "name" | "contact" | "msisdn" | "address"> ) {
  return await db.client.update({
    where: {
      id,
    },
    data: {
      name,
      contact,
      msisdn,
      address,
    }
  })
}

// UNIT FUNCTIONS
export async function createUnit({
  regMark,
  brand,
  model,
  yom,
  vin,
  engine,
  clientId,
  deviceImei,
  platformId,
}: Pick<Unit, "regMark" | "brand" | "model" | "yom" | "vin" | "engine" > & {
  clientId: Client["id"];
} & {
  deviceImei: Device["imei"];
} & {
  platformId: Platform["id"];
} ) {
  return await db.unit.create({
    data: {
      regMark,
      brand,
      model,
      yom,
      vin,
      engine,
      client: {
        connect: {
            id: clientId
        }
    },
      device: {
        connect: {
            imei: deviceImei
        }
    },
      platform: {
        connect: {
            id: platformId
        }
    },         
    },
  });
}

export async function updateUnit({
  id,
  regMark,
  brand,
  model,
  yom,
  vin,
  engine,
  clientId,
  deviceImei,
  platformId,
}: Pick<Unit, "id" | "regMark" | "brand" | "model" | "yom" | "vin" | "engine" > & {
  clientId: Client["id"];
} & {
  deviceImei: Device["imei"];
} & {
  platformId: Platform["id"];
} ) {
  return await db.unit.update({
    where: {
      id,
    },
    data: {
      regMark,
      brand,
      model,
      yom,
      vin,
      engine,
      client: {
        connect: {
            id: clientId
        }
    },
      device: {
        connect: {
            imei: deviceImei
        }
    },
      platform: {
        connect: {
            id: platformId
        }
    },         
    },
  });
}

export async function getUnit({
  regMark,
}: Pick<Unit, "regMark">) {
  return db.unit.findFirst({
    select: { 
      id: true, 
      regMark: true, 
      brand: true, 
      model: true,
      yom: true,
      vin: true,
      engine: true,
      platform: {
        select: {
          title: true,
        }
      }, 
      device: {
        select: {
          imei: true,
          sim: {
            select: {
              msisdn: true
            }
          },
          model: true
        }
      },
      client: {
        select: {
          name: true,
        }
      } 
    },
    where: { regMark },
  });
}

export async function getUnitByRegMark({
  regMark,
}: Pick<Unit, "regMark">) {
  return db.unit.findFirst({
    select: {
      id: true,
    },
    where: { regMark },
  })
}

export async function getUnits() {
  return db.unit.findMany({
    select: { id: true, regMark: true, brand: true, model: true, yom: true, vin: true, engine: true },
    orderBy: { regMark: "asc" },
  });
}

export async function getClientUnits({
  name,
}: Pick<Client, "name">) {
  return await db.client.findFirst({
    select: {
      name: true,
      units: {
        select: {
          id: true,
          regMark: true,
        }
      }
    },
    where: { name },
  });
}

export function deleteUnit({
  id,
}: Pick<Unit, "id"> ) {
  return db.unit.delete({
    where: { id },
  });
}