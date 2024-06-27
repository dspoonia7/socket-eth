// import { useState } from 'react';
// import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
// import { ethers } from 'ethers';
// import { ConnectButton } from '@rainbow-me/rainbowkit';

// const wethAddress = '0x...';  // WETH contract address on Sepolia
// const wethAbi = [
//   "function deposit() payable",
//   "function withdraw(uint wad) public"
// ];

// export const WrapUnwrapV2 = () => {
//   const { address, isConnected } = useAccount();
//   const { data: signer } = useSigner();
//   const provider = useProvider();
//   const [amount, setAmount] = useState('');

//   const wethContract = useContract({
//     address: wethAddress,
//     abi: wethAbi,
//     signerOrProvider: signer || provider
//   });

//   const wrapEth = async () => {
//     const tx = await wethContract.deposit({ value: ethers.utils.parseEther(amount) });
//     await tx.wait();
//     alert('ETH Wrapped');
//   };

//   const unwrapEth = async () => {
//     const tx = await wethContract.withdraw(ethers.utils.parseEther(amount));
//     await tx.wait();
//     alert('WETH Unwrapped');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <ConnectButton />
//       {isConnected && (
//         <div className="flex flex-col items-center">
//           <input
//             type="text"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Amount in ETH"
//             className="mt-4 px-4 py-2 border rounded"
//           />
//           <button onClick={wrapEth} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//             Wrap ETH
//           </button>
//           <button onClick={unwrapEth} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
//             Unwrap WETH
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
