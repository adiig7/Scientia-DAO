/// checked and approved
// customized to store a json file created from the data we enter
import { Web3Storage } from "web3.storage";
// import { WEB3STORAGE_TOKEN } from "../../constants/constants";
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;

function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function MakeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const StoreResearch = async (title, description, contentURI) => {
  const obj = { Name: title, Description: description, Content: contentURI };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [new File([blob], "research.json")];
  console.log("Uploading data to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put(files);
  console.log("Stored files with cid:", cid);
  return cid;
};
