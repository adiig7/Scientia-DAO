import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_TOKEN } from "../../constants/constants";

function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const StoreContent = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put([files]);
  console.log("stored files with cid:", cid);
  setTimeout(3000);
  return cid;
};
