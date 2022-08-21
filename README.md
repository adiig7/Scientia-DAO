# Welcome to Scientia DAO

![scientia_dao_logo](https://user-images.githubusercontent.com/11206675/183511519-021297a0-b855-41ca-a5ca-d50852554296.png)

### What is our main idea?

Scientia DAO is the first DAO Community for Scientists & Researchers.

Researchers from around the world can become a DAO member and share their researches, studies and a lot more!

We want to create a decentralized and community-driven world of scientists and researchers without third-party elements.

---

### Which features does Scientia DAO offer?

Scientia DAO offers a variety of features:

- enter a community full of researchers and scientists
- publish your researches and studies
- apply for grants for your projects
- earn special community- and publishing-NFTs
- participate as a non-DAO member
- donate grants to researchers and scientists

---

### How did we manage the project?

In order to come up with this idea, Dhruv Agarwal, Kushagra Sarathe, Aditya Gupta and Nils Giebing have sat together and brainstormed. The direction was clear - Medicine and/or science. 

After the second session we came up with the idea of this project and its name - Scientia DAO. Scientia is latin and means 'knowledge’. Knowledge in sciences.

We have set up a GitHub repository and began planning using Notion. First we wrote the smart contracts to come up with the logic behind the DAO. Soon we needed some first visualizations in order to keep going creating more ideas, logic and the dependend components.

We met up via various online meeting tools to discuss, collaborate and even learn from one another!

---

### How can someone join the DAO?

In order for someone to join the DAO, he/she has to click the "Join DAO"-Button on our homepage. A register form will appear where you can paste your name, bio, field of research and maybe even previous researches. After pasting your information, hit the "Submit Proposal"-button to start the joining-proposal.

The first 50 people can join the DAO directly after paying the inital deposit of 0.05 Ether. After the 50 first members, members can only join after being voted by te other DAO members into the DAO.

---

## Technologies used in Scientia DAO

We have used several technologies to build this decentralized autonomous organization:

### Polygon

All of our smart contracts are deployed on the Polygon Mumbai Testnet and so our infrastructure and interactions run on Polygon. 

### IPFS/Web3.storage

Media files will get uploaded to Web3.storage and research details and personal data gets stored to IPFS via Web3.storage via a JSON file. Later on the frontend the data and researches get extracted from the contract and IPFS.

### Chainlink

We use Chainlink Keepers for our proposals to automatically keep track of the duration of the decentralized votings and deadlines.

### Spheron

We use Spheron to finally deploy our decentralized autonomous organization.

---

## Smart Contracts

All of our smart contracts are written in Solidity. You can find them under [/backend/contracts](https://github.com/adiig7/Polygon-BUIDL-IT/tree/main/backend/contracts).

They have currently been published on Polygon Mumbai Testnet due to testing and presentational reasons. 

In the smart contracts themselves you can find dev comments and explanations.
<br /><br /><br />
**ContributorNFT.sol** - manages the contributor NFT and status

**DAOFunds.sol** - manages the funds of the DAO

**DAOMember.sol** - manages the proccess of some joining the DAO

**Grants.sol** - manages the proposal for someone apply for grants

**MemberNFT.sol** - manages the member NFT and status

**VotingOnProposal.sol** - manages the votings on proposals in general

**Whitelist.sol** - manages the inital whitelist before the DAO only accepts new mebers through votings

---

## NFTs

At the current state Scientia DAO offers two different NFTs. A member NFT and a contributor NFT.

You can find the NFT data under [/backend/constant](https://github.com/adiig7/Polygon-BUIDL-IT/tree/main/backend/constant).

---

## Frontend

For the UI and design we have used Next.js to setup our project easily and build/design it with the help of JavaScript, React and HTML/CSS.

All the frontend code is available under [/frontend](https://github.com/adiig7/Polygon-BUIDL-IT/tree/main/frontend).
<br /><br /><br />

### Frontend folders in our project:

**constants** - important file with different constants to call in other programs

**pages** - all of our different frontend webpages

**public** - public files like images etc.

**src** - assets like images and single components of the different webpages

**styles** - CSS styling files
<br /><br /><br />
### Other important files:

**.env** - important API-keys for deployment

**.gitignore** - lets GitHub ignore several files like sensible data

**next.config.js** - configuration of Next.js

---

## Backend

In our backend folder you can find everything that’s working behind the scenes of Scientia DAO!
<br /><br /><br />
### Backend folders in our project:

**constant** - NFT (meta-)data

**contracts** - Solidity Smart Contracts

**scripts** - deployment scripts for the Smart Contracts
<br /><br /><br />
### Other important files:

**.gitignore** - lets GitHub ignore several files like sensible data

**README.md** - Smart Contract Addresses

**hardhat.config.js** - HardHat configuration file

---

## Wallet Connection

You can connect your wallet with the help of **RainbowKit**. It gives better control and UX than web3modal.

Look at the docs of RainbowKit on how to use it: [https://www.rainbowkit.com/docs/introduction](https://www.rainbowkit.com/docs/introduction)

---

### Founders

### Dhruv Agarwal
![dhruv_agarwal](https://user-images.githubusercontent.com/11206675/184015427-f41e8de0-8bf3-4dcd-b3a9-e04086e25255.jpg)

**Fullstack Developer**

Loves writing smart contracts and building fun projects.

---

### Nils Giebing
![nils_giebing](https://user-images.githubusercontent.com/11206675/184015390-d2c35a52-9e33-4888-b619-e2bd59fe3e9c.jpg)

**Backend Developer**

Loves to travel and contribute to communities.

---

### Kushagra Sarathe
![kushagra_sarathe](https://user-images.githubusercontent.com/11206675/184015363-3dbafff4-8e0e-43af-a69f-685351b6ccd2.jpg)

**Frontend Developer**

Experience in bug bounty hunting. Learning to code these days.

---

### Aditya Gupta
![aditya_gupta](https://user-images.githubusercontent.com/11206675/184015293-d9fc4e74-9a6a-49e7-be93-f0c7d1ebac32.jpg)

**Backend Developer**

Loves writing Smart contracts

---
