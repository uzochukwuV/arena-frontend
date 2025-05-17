
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


const abiclub =[{"type":"function","name":"MAX_PRICE_LIMIT","inputs":[],"outputs":[{"name":"","type":"uint160","internalType":"uint160"}],"stateMutability":"view"},{"type":"function","name":"MIN_PRICE_LIMIT","inputs":[],"outputs":[{"name":"","type":"uint160","internalType":"uint160"}],"stateMutability":"view"},{"type":"function","name":"addLiquidity","inputs":[{"name":"token1Amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"tokenApprovals","inputs":[],"outputs":[],"stateMutability":"nonpayable"}]
export const FEE_AMOUNT_LOW = 100


export const FEE_AMOUNT_MEDIUM = 3000
export const FEE_AMOUNT_HIGHEST = 10_000
export const TICK_SPACING_TEN = 10
export const TICK_SPACING_SIXTY = 60

export function useContracts() {
    const account = useActiveAccount()
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





    const USDC: Token = new Token(baseSepolia.id, TOKEN_0, 6,);
    const BEX: Token = new Token(baseSepolia.id, "0xF1F845AD979b9274cd27574102F00Dd07012E21A", 18);
    const ETH = Ether.onChain(baseSepolia.id)
    const fee: FeeAmount = FeeAmount.LOW



    const token0Contract = getContract({
        address: TOKEN_0,
        chain: baseSepolia,
        client,

    });
    const token1Contract = getContract({
        address: TOKEN_1,
        chain: baseSepolia,
        client,
    });

    const hookContract = getContract({
        address: HOOK_ADDRESS,
        chain: baseSepolia,
        client,
    });

    const poolContract = getContract({
        address: POOL_MANAGER,
        chain: baseSepolia,
        client,
    });

    const clubContract = getContract({
        address:"0xE9D8D2ACC77067E4726451DC35cF53e722cc40E0",
        chain:baseSepolia,
        client
    })




    async function addLiquidity(amount0: BigNumber, amount1: BigNumber) {
         const transaction = prepareContractCall({
            contract: clubContract,
            method: "function addLiquidity(uint256 token1Amount) external payable",
            params: [BigInt(1e15)],
            value:BigInt(1e15)
        });
        const { transactionHash } = await sendTransaction({
            account: account!,
            transaction
        });
    }

    async function approve({ contract, spender, amount }: { contract: Readonly<ContractOptions<[], `0x${string}`>>, spender: string, amount: number }) {

        const transaction = prepareContractCall({
            contract: contract,
            method: "function approve(address spender, uint256 amount) external returns (bool)",
            params: [spender, BigInt(amount)],
        });
        const { transactionHash } = await sendTransaction({
            account: account!,
            transaction
        });


    }

    async function transfer({ contract, to, value }: { contract: Readonly<ContractOptions<[], `0x${string}`>>, to: string, value: string }) {
        const transaction = prepareContractCall({
            contract,
            method: "function transfer(address to, uint256 value)",
            params: [to, BigInt(value)],
        });

        const { transactionHash } = await sendTransaction({
            account: account!,
            transaction,
        });
    }


    return {
        token1Contract,
        token0Contract,
        approve,
        transfer,
        addLiquidity,
        hookContract
    }
}
