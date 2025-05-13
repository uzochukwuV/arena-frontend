export default function SwapGuide() {
  return (
    <div className="space-y-8">
      <section id="swap-overview" className="space-y-4">
        <h2 className="text-2xl font-bold">Swap Overview</h2>
        <p>
          The Swap feature on SwapArena allows you to exchange one token for another through an automated market maker
          (AMM) system. This means you can trade tokens directly without needing a traditional order book or
          counterparty.
        </p>
        <p>
          Swaps are executed against liquidity pools, which are pools of tokens that users have deposited. The price is
          determined by the ratio of tokens in the pool, following the constant product formula (x * y = k).
        </p>
      </section>

      <section id="swap-tokens" className="space-y-4">
        <h2 className="text-2xl font-bold">Swapping Tokens</h2>
        <p>To swap tokens on SwapArena:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Navigate to the Swap page</li>
          <li>Select the token you want to swap from in the "From" dropdown</li>
          <li>Enter the amount you want to swap</li>
          <li>Select the token you want to receive in the "To" dropdown</li>
          <li>Review the exchange rate and other details</li>
          <li>Click "Swap" and confirm the transaction in your wallet</li>
        </ol>
        <p>
          The interface will automatically calculate how much of the "To" token you'll receive based on the current
          exchange rate. You can also click the arrow button between the inputs to reverse the direction of the swap.
        </p>
      </section>

      <section id="slippage" className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding Slippage</h2>
        <p>
          Slippage refers to the difference between the expected price of a trade and the actual price at which the
          trade is executed. It occurs because the price can change between the time you submit a transaction and when
          it's confirmed on the blockchain.
        </p>
        <p>To manage slippage on SwapArena:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Click the settings icon in the Swap interface</li>
          <li>Adjust the "Slippage Tolerance" slider to your preferred percentage</li>
          <li>
            A higher slippage tolerance increases the chance of your transaction being successful but may result in a
            less favorable exchange rate
          </li>
          <li>
            A lower slippage tolerance ensures you get a rate closer to what you expect but increases the risk of the
            transaction failing
          </li>
        </ol>
        <p>
          For most trades, a slippage tolerance of 0.5% to 1% is reasonable. For tokens with lower liquidity, you may
          need to set a higher tolerance.
        </p>
      </section>

      <section id="swap-fees" className="space-y-4">
        <h2 className="text-2xl font-bold">Swap Fees</h2>
        <p>When you swap tokens on SwapArena, you'll pay two types of fees:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>
            <strong>Trading Fee:</strong> A 0.3% fee is applied to each swap. This fee is distributed to liquidity
            providers as a reward for providing liquidity to the pool.
          </li>
          <li>
            <strong>Gas Fee:</strong> This is the cost of executing the transaction on the Ethereum network. Gas fees
            vary based on network congestion and the complexity of the transaction.
          </li>
        </ul>
        <p>
          The trading fee is automatically included in the exchange rate shown in the interface. The gas fee is paid
          separately in ETH when you confirm the transaction in your wallet.
        </p>
        <p>
          To minimize gas fees, consider trading during periods of lower network congestion or using the platform during
          off-peak hours.
        </p>
      </section>
    </div>
  )
}
