import type { Provider, Sim, Device } from "@prisma/client";
import { db } from "~/utils/db.server";

export async function getProviderSims({
    network,
  }: Pick<Provider, "network">) {
    return await db.provider.findFirst({
      select: { id: true,
      sims: {
        select: {
          id: true,
          iccid: true,
          msisdn: true,
          status: true,
          device: {
            select: {
              imei: true
            }
          }
        }
      } 
    },
      where: { network },
    });
  }
  
// export async function getProviders() {
//     return await db.provider.findMany({
//       select: { id: true, network: true, url: true, apn: true },
//       orderBy: { network: "asc" },
//     });
//   }

export async function getProviders() {
    return await db.provider.findMany({
      include: { 
        sims: {
          include: {
            device: {
              include: {unit: {
                include: {client: true}
              }}
            },
          },
          orderBy: {msisdn: "asc"}
        } 
      },
      orderBy: { network: "asc" },
    });
  }

export async function createProvider({
    network,
    url,
    apn,
  }: Pick<Provider, "network" | "url" | "apn" > ) {
    return await db.provider.create({
      data: {
        network,
        url, 
        apn,       
      },
    });
  }

export async function deleteProvider({
    id,
  }: Pick<Provider, "id"> ) {
    return await db.provider.delete({
      where: { id },
    });
  }

  // SIM FUnctions
  export async function getSim({
    id,
  }: Pick<Sim, "id">) {
    return await db.sim.findFirst({
      select: { 
        id: true, 
        iccid: true,
        msisdn: true,
        plan: true,
        doa: true,
        status: true,
        device: {
          select: {
            model: true,
            unit: {
              select: {
                regMark: true,
                client: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
      where: { id },
    });
  }
  
export async function getSims() {
    return await db.sim.findMany({
      select: { id: true, iccid: true, msisdn: true, status: true },
      orderBy: { msisdn: "asc" },
    });
  }

export async function getUnlinkedSims() {
    return await db.sim.findMany({
      where: {
        deviceId: null,
      },
      orderBy: { msisdn: "asc" },
    });
  }

export async function createSim({    
    iccid,
    msisdn,
    plan,
    doa,
    status,
    providerId,
  }: Pick<Sim, "iccid" | "msisdn" | "plan" | "doa" | "status"  > & {
    providerId: Provider["id"];
  } ) {
    return await db.sim.create({
      data: {
        iccid,
        msisdn, 
        plan, 
        doa,
        status,
        provider: {
            connect: {
                id: providerId
            }
        }     
      },
    });
  }

export async function deleteSim({
    id,
  }: Pick<Sim, "id"> ) {
    return await db.sim.delete({
      where: { id },
    });
  }

export async function AddSimToDevice({
    deviceId, msisdn,
  }: Pick<Sim, "msisdn"> & {
    deviceId: Device["id"];
  }) {
    return await db.sim.update({
      where: {
        msisdn: msisdn,
      },
      data: {
        device: {
          connect: {
            id: deviceId,
          }
        }
      }
    })
  }

export async function UpdateSim({
    id,iccid,msisdn,plan,doa, status
  }: Pick<Sim, "id" | "iccid" | "msisdn" | "plan" | "doa" | "status"> ) {
    return await db.sim.update({
      where: {
        id,
      },
      data: {
        iccid,
        msisdn,
        plan,
        doa,
        status,
      }
    })
  }

export async function RemoveSimFromDevice({
    deviceId, msisdn,
  }: Pick<Sim, "msisdn"> & {
    deviceId: Device["id"];
  }) {
    return await db.sim.update({
      where: {
        msisdn: msisdn,
      },
      data: {
        device: {
          disconnect: true,
        }
      }
    })
  }