/// checked and approved
// to store a  single file to the IPFS
import { Web3Storage } from "web3.storage";
// import { WEB3STORAGE_TOKEN } from "../../constants";
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;

function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const StoreContent = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  setTimeout(3000);
  return cid;
};
