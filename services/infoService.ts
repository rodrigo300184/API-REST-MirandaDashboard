import mirandaApiData from '../assets/data/mirandaApiData.json'

async function get() {
    const info = await mirandaApiData;
    if(!info) throw new Error('Error obtaining general information abour API REST service');
    return info;
  }

export const infoService = {
    get
}