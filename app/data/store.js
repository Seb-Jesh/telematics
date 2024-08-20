import fs from 'fs/promises';

export async function getStoredPlatforms() {
  const rawFileContent = await fs.readFile('platforms.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPlatforms = data.platforms ?? [];
  return storedPlatforms;
}

export function storePlatforms(platforms) {
  return fs.writeFile('platforms.json', JSON.stringify({ platforms: platforms || [] }));
}

export async function getStoredProviders() {
  const rawFileContent = await fs.readFile('providers.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedProviders = data.providers ?? [];
  return storedProviders;
}

export function storeProviders(providers) {
  providers.sort((a, b) => {
    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
  return fs.writeFile('providers.json', JSON.stringify({ providers: providers || [] }));
}

export async function getStoredSims() {
  const rawFileContent = await fs.readFile('sims.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedSims = data.sims ?? [];
  return storedSims;
}

export function storeSims(sims) {
  sims.sort((a, b) => {
    const nameA = a.msisdn.toUpperCase(); // ignore upper and lowercase
    const nameB = b.msisdn.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
  return fs.writeFile('sims.json', JSON.stringify({ sims: sims || [] }));
}

export async function getStoredUnits() {
  const rawFileContent = await fs.readFile('units.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedUnits = data.units ?? [];
  return storedUnits;
}

export function storeUnits(units) {
  units.sort((a, b) => {
    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
  return fs.writeFile('units.json', JSON.stringify({ units: units || [] }));
}

export async function getStoredDevices() {
  const rawFileContent = await fs.readFile('devices.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedDevices = data.devices ?? [];
  return storedDevices;
}

export function storeDevices(devices) {
  devices.sort((a, b) => {
    const nameA = a.imei.toUpperCase(); // ignore upper and lowercase
    const nameB = b.imei.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
  return fs.writeFile('devices.json', JSON.stringify({ devices: devices || [] }));
}

export async function getStoredClients() {
  const rawFileContent = await fs.readFile('clients.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedClients = data.clients ?? [];
  return storedClients;
}

export function storeClients(clients) {
  clients.sort((a, b) => {
    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
  return fs.writeFile('clients.json', JSON.stringify({ clients: clients || [] }));
}

export async function getStoredManufacturers() {
  const rawFileContent = await fs.readFile('manufacturers.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedManufacturers = data.manufacturers ?? [];
  return storedManufacturers;
}

export function storeManufacturers(manufacturers) {
  return fs.writeFile('manufacturers.json', JSON.stringify({ manufacturers: manufacturers || [] }));
}

export async function linkUnits() {
  const sims = await getStoredSims()
  const units = await getStoredUnits()
  sims.forEach(element => {
    units.forEach(item => {
      if(element.msisdn === item.sim) {
        element.unit = item.title;
        element.client = item.client
      }
    })
  })
  return sims  
}

export async function linkDevices() {
  const devices = await getStoredDevices()
  const units = await getStoredUnits()
  devices.forEach(element => {
    units.forEach(item => {
      if(element.imei === item.device) {
        element.unit = item.title;
        element.client = item.client
      }
    })
  })
  return devices  
}