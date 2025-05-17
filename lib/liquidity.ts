// addLiquidity.ts
import { ethers } from "ethers";
import { Position, V4PositionManager, Pool, V4Planner, Actions, Hook } from "@uniswap/v4-sdk";
import { CurrencyAmount, Token, Ether, Percent } from "@uniswap/sdk-core";
import { client } from "@/app/client";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { baseSepolia } from "thirdweb/chains";

// Constants imported from your configuration
import {
  TOKEN_0,
  TOKEN_1,
  HOOK_ADDRESS,
  POOL_ID,
  POOL_MANAGER,
  POSITION_MANAGER,
  STATEVIEW,
  STATEVIEW_ABI,
  provider,
  signer
} from "./constants";
import { FeeAmount, TICK_SPACINGS } from "@uniswap/v3-sdk"

// Helper function to convert to hex
const toHex = (value:any) => {
  return `0x${value.toString(16)}`;
};

// Helper function to convert to address format
const toAddress = (currency:any) => {
  if (currency.isNative) return ethers.constants.AddressZero;
  return currency.address;
};

const EMPTY_BYTES = '0x';
const MSG_SENDER = '0x0000000000000000000000000000000000000001'; // Placeholder for msg.sender
const slippageTolerance = new Percent(1, 100)
/**
 * Function to add liquidity to a Uniswap V4 pool
 * @param accountAddress - The address of the account adding liquidity
 * @param tickLower - The lower tick of the position
 * @param tickUpper - The upper tick of the position
 * @param liquidityAmount - The amount of liquidity to add
 * @param options - Additional options for adding liquidity
 * @returns Transaction data ready to be sent to the network
 */
export async function addLiquidity(
  accountAddress:any,
  tickLower:number,
  tickUpper:number, 
  liquidityAmount:any,
  options = {}
) {
  try {

    // Set up default options
    const defaultOptions = {
      slippageTolerance, // 0.5% slippage tolerance
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
      recipient: accountAddress,
      createPool: false,
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // First, we need to fetch pool data to create the position
    const stateViewContract = new ethers.Contract(STATEVIEW, STATEVIEW_ABI, provider);
    const slot0Data = await stateViewContract.getSlot0(POOL_ID);
    
    console.log("Slot0 Data:", {
      sqrtPriceX96: slot0Data.sqrtPriceX96.toString(),
      tick: slot0Data.tick,
      protocolFee: slot0Data.protocolFee,
      lpFee: slot0Data.lpFee
    });
    
    // Create token objects
    const token0 = new Token(
      baseSepolia.id,
      TOKEN_0,
      18, // Assuming 18 decimals, adjust if needed
      "ETH",
      "ETH"
    );
    
    const token1 = new Token(
      baseSepolia.id,
      TOKEN_1,
      18, // Assuming 18 decimals, adjust if needed
      "BEX",
      "BexToken"
    );

    const poolkey = Pool.getPoolKey(token0, token1, 3000, 60, HOOK_ADDRESS);
    
    
    // Create the pool object
    const pool = new Pool(
      token0,
      token1,
      slot0Data.lpFee,
      3000,
      HOOK_ADDRESS,
      slot0Data.sqrtPriceX96.toString(),
      liquidityAmount, // Current liquidity, we'll replace with our position liquidity later
        slot0Data.tick
    );



    console.log(pool.poolId, pool.liquidity) 
    
    // Create the position
    const position = new Position({
      pool: pool,
      tickLower:TICK_SPACINGS[FeeAmount.MEDIUM],
      tickUpper:TICK_SPACINGS[FeeAmount.MEDIUM],
      liquidity: pool.liquidity
    });
    
    // Get the call parameters for adding liquidity
    const { calldata, value } = V4PositionManager.addCallParameters(position, finalOptions);
    
    // Get the account signer
    const accountSigner = await signer(accountAddress);
    
    // Create the transaction
    const tx = {
      to: POSITION_MANAGER,
      data: calldata,
      value: value !== '0x00' ? value : '0x0',
      gasLimit: ethers.utils.hexlify(1000000), // Adjust gas limit as needed
    };
    
    console.log("Transaction prepared:", tx);
    
    // Return the transaction object and other useful information
    return {
      tx,
      position,
      estimatedAmounts: {
        amount0: position.amount0.toSignificant(6),
        amount1: position.amount1.toSignificant(6),
      },
      slippageAdjustedAmounts: {
        amount0Max: position.mintAmountsWithSlippage(finalOptions.slippageTolerance).amount0.toString(),
        amount1Max: position.mintAmountsWithSlippage(finalOptions.slippageTolerance).amount1.toString(),
      },
      // Function to send the transaction
      sendTransaction: async () => {
        return await accountSigner.sendTransaction(tx);
      }
    };
  } catch (error) {
    console.error("Error adding liquidity:", error);
    throw error;
  }
}

/**
 * Helper function to add liquidity with native ETH
 * @param accountAddress - The address of the account adding liquidity
 * @param tickLower - The lower tick of the position
 * @param tickUpper - The upper tick of the position
 * @param liquidityAmount - The amount of liquidity to add
 * @param options - Additional options for adding liquidity
 * @returns Transaction data ready to be sent to the network
 */
export async function addLiquidityETH(
  accountAddress:string,
  tickLower:number,
  tickUpper:number,
  liquidityAmount:any,
  options = {}
) {
  // Create an Ether instance for the chain
  const nativeEth = Ether.onChain(baseSepolia.id);
  
  // Call the main function with useNative set to the Ether instance
  return addLiquidity(
    accountAddress,
    tickLower,
    tickUpper,
    liquidityAmount,
    {
      ...options,
      useNative: nativeEth
    }
  );
}

/**
 * Function to create a new pool and add initial liquidity
 * @param accountAddress - The address of the account creating the pool
 * @param sqrtPriceX96 - The initial sqrt price of the pool
 * @param tickLower - The lower tick of the position
 * @param tickUpper - The upper tick of the position
 * @param liquidityAmount - The amount of liquidity to add
 * @param options - Additional options for adding liquidity
 * @returns Transaction data ready to be sent to the network
 */
export async function createPoolAndAddLiquidity(
  accountAddress:any,
  sqrtPriceX96:any,
  tickLower:any,
  tickUpper:any,
  liquidityAmount:any,
  options = {}
) {
  return addLiquidity(
    accountAddress,
    tickLower,
    tickUpper,
    liquidityAmount,
    {
      ...options,
      createPool: true,
      sqrtPriceX96: ethers.BigNumber.from(sqrtPriceX96)
    }
  );
}

/**
 * Function to increase liquidity of an existing position
 * @param accountAddress - The address of the account adding liquidity
 * @param tokenId - The ID of the position token to increase liquidity
 * @param additionalLiquidity - The additional amount of liquidity to add
 * @param options - Additional options for adding liquidity
 * @returns Transaction data ready to be sent to the network
 */
export async function increaseLiquidity(
  accountAddress:any,
  tokenId:any,
  additionalLiquidity:any,
  options = {}
) {
  try {
    // First, we need to fetch the position's current details
    const positionManagerContract = new ethers.Contract(
      POSITION_MANAGER,
      ["function positions(uint256) view returns (tuple(uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1))"],
      provider
    );
    
    const positionData = await positionManagerContract.positions(tokenId);
    
    // Get pool data
    const stateViewContract = new ethers.Contract(STATEVIEW, STATEVIEW_ABI, provider);
    const slot0Data = await stateViewContract.getSlot0(POOL_ID);
    
    // Create token objects
    const token0 = new Token(
      baseSepolia.id,
      positionData.token0,
      18, // Assuming 18 decimals, adjust if needed
      "TOKEN0",
      "T0"
    );
    
    const token1 = new Token(
      baseSepolia.id,
      positionData.token1,
      18, // Assuming 18 decimals, adjust if needed
      "TOKEN1",
      "T1"
    );
    
    // Create the pool object with current data
    
    // Create the pool object
    const pool = new Pool(
      token0,
      token1,
      slot0Data.lpFee,
      3000,
      HOOK_ADDRESS,
      slot0Data.sqrtPriceX96.toString(),
      additionalLiquidity, // Current liquidity, we'll replace with our position liquidity later
        slot0Data.tick
    );
    
    // Create the position with the additional liquidity amount
    const position = new Position({
      pool: pool,
      tickLower: positionData.tickLower,
      tickUpper: positionData.tickUpper,
      liquidity: additionalLiquidity,
    });
    
    // Set up default options
    const defaultOptions = {
      tokenId: ethers.BigNumber.from(tokenId) as any,
      slippageTolerance, // 0.5% slippage tolerance
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // Get the call parameters for adding liquidity
    const { calldata, value } = V4PositionManager.addCallParameters(position, finalOptions);
    
    // Get the account signer
    const accountSigner = await signer(accountAddress);
    
    // Create the transaction
    const tx = {
      to: POSITION_MANAGER,
      data: calldata,
      value: value !== '0x00' ? value : '0x0',
      gasLimit: ethers.utils.hexlify(1000000), // Adjust gas limit as needed
    };
    
    console.log("Increase Liquidity Transaction prepared:", tx);
    
    // Return the transaction object and other useful information
    return {
      tx,
      position,
      estimatedAmounts: {
        amount0: position.amount0.toSignificant(6),
        amount1: position.amount1.toSignificant(6),
      },
      slippageAdjustedAmounts: {
        amount0Max: position.mintAmountsWithSlippage(finalOptions.slippageTolerance).amount0.toString(),
        amount1Max: position.mintAmountsWithSlippage(finalOptions.slippageTolerance).amount1.toString(),
      },
      // Function to send the transaction
      sendTransaction: async () => {
        return await accountSigner.sendTransaction(tx);
      }
    };
  } catch (error) {
    console.error("Error increasing liquidity:", error);
    throw error;
  }
}

// Example usage
/*
// Add liquidity to an existing pool
const liquidity = await addLiquidity(
  "0xYourAddress", 
  -TICK_SPACINGS[FeeAmount.MEDIUM], 
  TICK_SPACINGS[FeeAmount.MEDIUM], 
  ethers.utils.parseUnits("1", 18)
);
const tx = await liquidity.sendTransaction();
console.log("Transaction hash:", tx.hash);

// Add liquidity with native ETH
const liquidityETH = await addLiquidityETH(
  "0xYourAddress", 
  -TICK_SPACINGS[FeeAmount.MEDIUM], 
  TICK_SPACINGS[FeeAmount.MEDIUM], 
  ethers.utils.parseUnits("1", 18)
);
const txETH = await liquidityETH.sendTransaction();
console.log("ETH Transaction hash:", txETH.hash);

// Create a new pool and add liquidity
const SQRT_PRICE_1_1 = "79228162514264337593543950336"; // 1:1 price
const newPool = await createPoolAndAddLiquidity(
  "0xYourAddress",
  SQRT_PRICE_1_1,
  -TICK_SPACINGS[FeeAmount.MEDIUM], 
  TICK_SPACINGS[FeeAmount.MEDIUM], 
  ethers.utils.parseUnits("1", 18)
);
const txNewPool = await newPool.sendTransaction();
console.log("New Pool Transaction hash:", txNewPool.hash);

// Increase liquidity of an existing position
const positionTokenId = 123; // Replace with your position token ID
const increasedLiquidity = await increaseLiquidity(
  "0xYourAddress",
  positionTokenId,
  ethers.utils.parseUnits("0.5", 18) // Add 0.5 more liquidity
);
const txIncrease = await increasedLiquidity.sendTransaction();
console.log("Increase Liquidity Transaction hash:", txIncrease.hash);
*/

export default {
  addLiquidity,
  addLiquidityETH,
  createPoolAndAddLiquidity,
  increaseLiquidity
};