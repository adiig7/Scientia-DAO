/// checked and approved
// customized to store a json file created from the data we enter
import { Web3Storage } from "web3.storage";

import { WEB3STORAGE_TOKEN } from "../../../constants/constants";
function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function MakeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

// stores the details of the members with the file name , memebr.json on the ipfs from the customized data propvided
export const StoreMembers = async (name, bio, foR) => {
  const obj = { Name: name, Bio: bio, FoR: foR };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [new File([blob], "member.json")];
  console.log("Uploading data to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put(files);
  console.log("Stored files with cid:", cid);
  return cid;
};
