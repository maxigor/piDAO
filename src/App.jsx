import { useAddress, useMetamask, useEditionDrop, useToken} from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Address", address)

 // Initialize our editionDrop contract
  const editionDrop = useEditionDrop("0xB59FCf4914A79EB34DeB9Bd8eaCEB43aD717661B");
  const token = useToken("0xbf07fF9193dE344790799EA64F80e13800eD87CD");

  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // If they don't have a connected wallet, exit!
    if (!address) {
      return;
    }
  });

    // Holds the amount of token each member has in state.
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  // The array holding all of our members addresses.
  const [memberAddresses, setMemberAddresses] = useState([]);

  // A fancy function to shorten someones wallet address, no need to show the whole thing. 
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  // ... include all your other code that was already there below.

  if(!address){
    return(
      <div className="landing">
        <h1> Bem vindo ao pintoDAO</h1>
        <button className={connectWithMetamask} className="btn-hero">
          Conecte sua carteira
        </button>
      </div>

      );
  }

  if(hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪pintoDAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>pintoDAO</h1>
      <button
        disabled={isClaiming}
        onClick={mintNft}
        >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>

  );

};

export default App;
