import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xB59FCf4914A79EB34DeB9Bd8eaCEB43aD717661B");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Communist Pinto ",
        description: "Esse NFT vai te dar acesso ao pintoDAO!",
        image: readFileSync("scripts/assets/commuchicken.png"),
      },
    ]);
    console.log("✅ Sucesso ao criar um novo NFT no drop!");
  } catch (error) {
    console.error("Falha ao criar um novo NFT", error);
  }
})();