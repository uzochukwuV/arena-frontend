
import {
    sendTransaction,
    getContract,
    prepareContractCall,
    ContractOptions,
    hexToBigInt,
    prepareTransaction,
    hexToString,
} from "thirdweb";
import { base, baseSepolia, sepolia } from "thirdweb/chains";
import { client } from "@/app/client";
import { HOOK_ADDRESS, POOL_ID, POOL_MANAGER, POSITION_MANAGER, provider, signer, STATEVIEW, STATEVIEW_ABI, TOKEN_0, TOKEN_1 } from "@/lib/constants";
import { useActiveAccount } from "thirdweb/react";

import { Pool, Position, V4PositionManager, V4Planner, Actions, toHex, toAddress } from "@uniswap/v4-sdk";
import { FeeAmount, TICK_SPACINGS } from "@uniswap/v3-sdk"
import { nearestUsableTick, encodeSqrtRatioX96, TickMath } from '@uniswap/v3-sdk'
import { CurrencyAmount, Percent, Token, Ether } from "@uniswap/sdk-core";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { BigNumber, Contract, ethers } from "ethers";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";


const abiclub =[{"type":"function","name":"MAX_PRICE_LIMIT","inputs":[],"outputs":[{"name":"","type":"uint160","internalType":"uint160"}],"stateMutability":"view"},{"type":"function","name":"MIN_PRICE_LIMIT","inputs":[],"outputs":[{"name":"","type":"uint160","internalType":"uint160"}],"stateMutability":"view"},{"type":"function","name":"addLiquidity","inputs":[{"name":"token1Amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"tokenApprovals","inputs":[],"outputs":[],"stateMutability":"nonpayable"}]
export const FEE_AMOUNT_LOW = 100


export const FEE_AMOUNT_MEDIUM = 3000
export const FEE_AMOUNT_HIGHEST = 10_000
export const TICK_SPACING_TEN = 10
export const TICK_SPACING_SIXTY = 60

export function useContracts() {
    const account = useActiveAccount()



    const hookContract = getContract({
        address: HOOK_ADDRESS,
        chain: baseSepolia,
        client,
    });

    const join = async ()=>{
        const ethersContract = await ethers5Adapter.contract.toEthers({
            thirdwebContract: hookContract,
        });

        const coin = await ethersContract.bexCoin()
        console.log(coin)
        return coin
    }

    

  



    return {
        hookContract,
        join
    }
}
