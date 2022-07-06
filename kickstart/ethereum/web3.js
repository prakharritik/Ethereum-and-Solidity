import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metamask is running.

  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: "eth_requestAccounts" });
} else {
  // We are on the server or the user is not using metamask.

  const provider = new Web3.providers.HttpProvider(
    process.env.NEXT_PUBLIC_rinkby
  );

  web3 = new Web3(provider);
}

export default web3;
