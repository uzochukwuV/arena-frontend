"use client"

import React from 'react'
import { useContracts } from '../use-contract'
import { FeeAmount, HOOK_ADDRESS, POOL_ID, provider, signer, STATEVIEW, STATEVIEW_ABI, TICK_SPACINGS, TOKEN_0, TOKEN_1 } from '@/lib/constants'
import { ethers } from 'ethers'
import Quest_ABI from "../../lib/abi/SwapArena.json"
import { Pool } from '@uniswap/v4-sdk'
import { useActiveAccount } from 'thirdweb/react'


export enum QuestType {
  VOLUME = 0,
  FREQUENCY = 1
}

export enum UserQuest {
  NONE = 0,
  WIN = 1,
  LOSS = 2
}

export interface TradeStats {
  totalBuys: number;
  totalSells: number;
  totalVolumeOfSells: ethers.BigNumber;
  totalVolumeOfBuys: ethers.BigNumber;
  startTime: number;
  endTime: number;
}

export interface QuestStake {
  isPut: boolean;
  hasStaked: boolean;
  stakedAmount: ethers.BigNumber;
  questType: QuestType;
  isClaimed: boolean;
  rewardAmount: ethers.BigNumber;
  isWinner: UserQuest;
}

export interface QuestStatus {
  isActive: boolean;
  timeRemaining: number;
}


export default function useHook() {
    const hookContract = new ethers.Contract(HOOK_ADDRESS, Quest_ABI, provider)
    const stateViewContract =  new ethers.Contract(STATEVIEW, STATEVIEW_ABI, provider)

    // Helper function to convert string to bytes32
    function stringToBytes(str:string) {
      // If the input is already bytes32 format, return as is
      if (str.startsWith('0x') && str.length === 66) {
        console.log("less")
        return str;
      }
      
      // Otherwise, convert string to bytes32
      return ethers.utils.formatBytes32String(str);
    }

    const getTokenAddress = async ()=>{
       const token = await hookContract.bexCoin();
       console.log(token)
        return token
       
    }
    
    const joinQuest =async ({amount, isPut, type, account}:{amount:number, isPut: boolean, type:number, account:any})=>{
      console.log(account, amount, type, isPut)
       const data = await hookContract.connect(account).joinQuest(
        POOL_ID,
        amount * 1e18,
        isPut,
        type, {
          value:0
        }
    )
    
    }

    const getCurrentPoolIndex = async ()=>{
      const name = await hookContract.name()
      const index = await hookContract.currentPoolIndex(POOL_ID)

      console.log(name, index)
      return index
    }

    const getQuestId = async () => {
      const currentIndex = await getCurrentPoolIndex();
    
      return currentIndex
  };

   const getCurrentQuestStats = async () => {
    const id = await getQuestId();

    const stats = await hookContract.questTradeStats(POOL_ID, id);
    
    console.log(stats)
    
 
    const data = await getTotalStaked(id)
    console.log(data)

    const list = await getQuestersList(id)
    
    return {
      totalBuys: stats.totalBuys,
      totalSells: stats.totalSells,
      totalVolumeOfSells: stats.totalVolumeOfSells,
      totalVolumeOfBuys: stats.totalVolumeOfBuys,
      startTime: stats.startTime,
      endTime: stats.endTime,
      totalStaked: data.totalStakedFrequency + data.totalStakedVolume,
      questers: list
    };
  };


    const getQuestStatus = async (): Promise<QuestStatus> => {
    const status = await hookContract.getQuestStatus(POOL_ID);
    return {
      isActive: status.isActive,
      timeRemaining: status.timeRemaining.toNumber()
    };
  };

  const getUserQuestStake = async (questId: number, userAddress: string): Promise<QuestStake> => {
    const stake = await hookContract.userQuestStakes(questId, userAddress);
    console.log(stake)
    return {
      isPut: stake.isPut,
      hasStaked: stake.hasStaked,
      stakedAmount: stake.stakedAmount,
      questType: stake.questType,
      isClaimed: stake.isClaimed,
      rewardAmount: stake.rewardAmount,
      isWinner: stake.isWinner
    };
  };

  const getWinnerList = async (questId: string) => {
    return await hookContract.getWinnerList(questId);
  };

  const getQuestersList = async (questId: string) => {
    return await hookContract.getQuestersList(questId);
  };

  const getWinnerCount = async (questId: string) => {
    const count = await hookContract.getWinnerCount(questId);
    return count.toNumber();
  };

  const getQuesterCount = async (questId: string) => {
    const count = await hookContract.getQuesterCount(questId);
    console.log(count)
    return count.toNumber();
  };


  const getTotalStaked = async (questId: number) => {
    console.log(questId, "hello")
    const totalStaked = await hookContract.questTotalStaked(1);
    console.log(totalStaked)
    return {
      totalStakedVolume: totalStaked.totalStakedVolume,
      totalStakedFrequency: totalStaked.totalStakedFrequency,
      winnersTotalStakeAmount: totalStaked.winnersTotalStakeAmount
    };
  };

  // Check if user has already joined the current quest
  const hasUserJoinedCurrentQuest = async (userAddress: string) => {
    const questId = await getQuestId();
    const stake = await getUserQuestStake(questId, userAddress);
    return stake.hasStaked;
  };

  // Calculate potential reward for a user (preview before claiming)
  const calculatePotentialReward = async (questId: number, userAddress: string) => {
    const userState = await getUserQuestStake(questId, userAddress);
    
    if (userState.isWinner !== UserQuest.WIN) {
      return ethers.BigNumber.from(0);
    }
    
    const totalStaked = await getTotalStaked(questId);
    const totalReward = totalStaked.totalStakedVolume.add(totalStaked.totalStakedFrequency).sub(totalStaked.winnersTotalStakeAmount);
    
    // Calculate reward with fee deduction (10% fee as per contract)
    const rewardAmount = userState.stakedAmount.mul(totalReward).mul(90).div(totalStaked.winnersTotalStakeAmount.mul(100));
    
    // User gets their stake back plus the reward
    return rewardAmount.add(userState.stakedAmount);
  };

  
    const getSlot0 = async ()=>{
        const data = await stateViewContract.getSlot0(stringToBytes(POOL_ID))
        console.log(data)

        // Format and log the response
        console.log("Slot0 Data:");
        console.log("  sqrtPriceX96 (uint160):", data.sqrtPriceX96.toString());
        console.log("  tick (int24):", data.tick);
        console.log("  protocolFee (uint24):", data.protocolFee);
        console.log("  lpFee (uint24):", data.lpFee);


      
        const data2 = await stateViewContract.getLiquidity(stringToBytes(POOL_ID))
        console.log(data2)
        return {
          sq:data.sqrtPriceX96.toString(),
          tick: data.tick,
          fee: data.protocolFee,
          lpfee: data.lpFee,
          liquidity:data2
        }
    }

    
  return {
      getTokenAddress,
    getCurrentPoolIndex,
    getQuestId,
    getSlot0,
    
    // Quest info
    getCurrentQuestStats,
    getQuestStatus,
    
    // User quest info
    getUserQuestStake,
    hasUserJoinedCurrentQuest,
    calculatePotentialReward,
    
    // Lists and counts
    getWinnerList,
    getQuestersList,
    getWinnerCount,
    getQuesterCount,
    getTotalStaked,
    
    // // Transactions
    joinQuest,
    // settleQuest,
    // claimReward,
    
    // Constants
    QuestType,
    UserQuest
  }
}




