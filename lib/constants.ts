import { client } from "@/app/client";
import BEX from "@/lib/abi/BexToken.json"
import SWAPARENA from "../lib/abi/SwapArena.json";
import STATEVIEWABI from "../lib/abi/StateView.json"
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { base, baseSepolia } from "thirdweb/chains";
import JSBI from 'jsbi'
import { constants } from 'ethers'
import { encodeSqrtRatioX96 } from '@uniswap/v3-sdk'

  // IERC20 constant token0 = IERC20(address(0x6E64b5403C36Ab073cbD1FEb7951E536825ebF60));
  //   IERC20 constant token1 = IERC20(address(0x7bbA73CCe26D4b912107d2D8E3963E924faa0fB7));
  //   IHooks constant hookContract = IHooks(address(0xD2C6dffE0b54441C281AdB6B8751D1d6114c0040));

//   PoolManager	0x498581ff718922c3f8e6a244956af099b2652b2b
// PositionDescriptor	0x25d093633990dc94bedeed76c8f3cdaa75f3e7d5
// PositionManager	0x7c5f5a4bbd8fd63184577525326123b519429bdc
// Quoter	0x0d5e0f971ed27fbff6c2837bf31316121532048d
// StateView	0xa3c0c9b65bad0b08107aa264b0f3db444b867a71
// Universal Router	0x6ff5693b99212da76ad316178a184ab56d299b43


export const TOKEN_0 = "0x6E64b5403C36Ab073cbD1FEb7951E536825ebF60";
export const TOKEN_1 = "0x7bbA73CCe26D4b912107d2D8E3963E924faa0fB7";
export const HOOK_ADDRESS = "0xD2C6dffE0b54441C281AdB6B8751D1d6114c0040"; // 0xcE7e5Acc2e1c3095B52846cf07bAfA1b88540040
export const POOL_ID = "0xac8295c0558b39a73ea6a0dd3f826e622c54e0ac2e862d957d205b865da8b8ab";
export const POOL_MANAGER ="0x498581ff718922c3f8e6a244956af099b2652b2b"
export const POSITION_MANAGER ="0x7c5f5a4bbd8fd63184577525326123b519429bdc"
export const STATEVIEW = "0xa3c0c9b65bad0b08107aa264b0f3db444b867a71"
export const BEXTOKEN_ABI = BEX;
export const SWAPARENA_ABI = SWAPARENA
export const STATEVIEW_ABI = STATEVIEWABI;

// test net
// export const TOKEN_0 = "0x5c602C98Ad2434c86D83f956bF3B22323dDe7f85";
// export const TOKEN_1 = "0xF51980A3455732B35852362E8a749ac67399FAdF";
// export const HOOK_ADDRESS = "0xcE7e5Acc2e1c3095B52846cf07bAfA1b88540040"; // 0xcE7e5Acc2e1c3095B52846cf07bAfA1b88540040
// export const POOL_ID = "0x60ab7380ad3be47445bc04450117dca7e25600ef591e57e3bb0f484c86c03e51";
// export const POOL_MANAGER ="0x05E73354cFDd6745C338b50BcFDfA3Aa6fA03408"
// export const POSITION_MANAGER ="0x4b2c77d209d3405f41a037ec6c77f7f5b8e2ca80"
// export const STATEVIEW = "0x571291b572ed32ce6751a2Cb2486EbEe8DEfB9B4"
// export const BEXTOKEN_ABI = BEX;
// export const SWAPARENA_ABI = SWAPARENA
// export const STATEVIEW_ABI = STATEVIEWABI;


export const provider = ethers5Adapter.provider.toEthers({
    client,
    chain: base,
});

export const signer = async(account: any) => await ethers5Adapter.signer.toEthers({ client, chain :base, account });



// constants used internally but not expected to be used externally
export const ADDRESS_ZERO = constants.AddressZero
export const NEGATIVE_ONE = JSBI.BigInt(-1)
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const ONE_ETHER = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
export const EMPTY_BYTES = '0x'

// used in liquidity amount math
export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96))
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2))

// pool setup
export const FEE_AMOUNT_LOW = 100
export const FEE_AMOUNT_MEDIUM = 3000
export const FEE_AMOUNT_HIGHEST = 10_000
export const TICK_SPACING_TEN = 10
export const TICK_SPACING_SIXTY = 60

// used in position manager math
export const MIN_SLIPPAGE_DECREASE = 0

// default prices
export const SQRT_PRICE_1_1 = encodeSqrtRatioX96(1, 1)

// default hook addresses
export const EMPTY_HOOK = '0x0000000000000000000000000000000000000000'

// error constants
export const NO_NATIVE = 'NO_NATIVE'
export const ZERO_LIQUIDITY = 'ZERO_LIQUIDITY'
export const NO_SQRT_PRICE = 'NO_SQRT_PRICE'
export const CANNOT_BURN = 'CANNOT_BURN'

/**
 * Function fragments that exist on the PositionManager contract.
 */
export enum PositionFunctions {
  INITIALIZE_POOL = 'initializePool',
  MODIFY_LIQUIDITIES = 'modifyLiquidities',
  // Inherited from PermitForwarder
  PERMIT_BATCH = '0x002a3e3a', // "permitBatch(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)"
  // Inherited from ERC721Permit
  ERC721PERMIT_PERMIT = '0x0f5730f1', // "permit(address,uint256,uint256,uint256,bytes)"
}

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  [FeeAmount.HIGH]: 200,
}

export type Quest = {
  id:string,
  poolId:string,
  type: string,
  totalStaked: string,
  endTime: number,
  stats: {
    buys: number,
    sells: number,
     buyVolume: string,
      sellVolume:string,
  }
}