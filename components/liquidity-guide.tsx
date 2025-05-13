export default function LiquidityGuide() {
  return (
    <div className="space-y-8">
      <section id="liquidity-overview" className="space-y-4">
        <h2 className="text-2xl font-bold">Liquidity Overview</h2>
        <p>
          Providing liquidity on SwapArena means depositing an equal value of two tokens into a liquidity pool. These
          pools enable users to swap tokens without needing a traditional order book or counterparty.
        </p>
        <p>
          When you provide liquidity, you receive Liquidity Provider (LP) tokens that represent your share of the pool.
          As users trade against the pool, they pay a 0.3% fee that is distributed to liquidity providers proportional
          to their share of the pool.
        </p>
      </section>

      <section id="adding-liquidity" className="space-y-4">
        <h2 className="text-2xl font-bold">Adding Liquidity</h2>
        <p>To add liquidity on SwapArena:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Navigate to the Liquidity page</li>
          <li>Click on "Add Liquidity"</li>
          <li>Select the two tokens you want to provide liquidity for</li>
          <li>
            Enter the amount of one token you want to deposit (the interface will automatically calculate the equivalent
            amount of the other token based on the current exchange rate)
          </li>
          <li>Review the details, including your share of the pool</li>
          <li>Click "Add Liquidity" and confirm the transaction in your wallet</li>
        </ol>
        <p>
          It's important to note that you must provide an equal value of both tokens. For example, if you want to
          provide liquidity to the BEX-ETH pool, and you deposit 1,000 BEX worth $500, you must also deposit ETH worth
          $500.
        </p>
      </section>

      <section id="removing-liquidity" className="space-y-4">
        <h2 className="text-2xl font-bold">Removing Liquidity</h2>
        <p>To remove liquidity from a pool:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Navigate to the Liquidity page</li>
          <li>Click on "Remove Liquidity"</li>
          <li>Select the liquidity pair you want to remove</li>
          <li>
            Enter the percentage of your liquidity you want to remove (you can remove any amount from 0.01% to 100%)
          </li>
          <li>Review the tokens you'll receive</li>
          <li>Click "Remove Liquidity" and confirm the transaction in your wallet</li>
        </ol>
        <p>
          When you remove liquidity, you'll receive both tokens in the pair proportional to your share of the pool at
          the current ratio. This means you might receive a different ratio of tokens than what you initially deposited
          due to price changes and trading activity.
        </p>
      </section>

      <section id="liquidity-rewards" className="space-y-4">
        <h2 className="text-2xl font-bold">Liquidity Rewards</h2>
        <p>There are two main ways to earn rewards as a liquidity provider on SwapArena:</p>
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Trading Fees</h3>
            <p className="mt-2">
              Every time someone trades against a pool you've provided liquidity to, you earn a portion of the 0.3%
              trading fee proportional to your share of the pool. These fees are automatically added to the pool,
              increasing the value of your LP tokens.
            </p>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Liquidity Mining</h3>
            <p className="mt-2">
              SwapArena also offers additional BEX token rewards for providing liquidity to specific pools through
              liquidity mining programs. These rewards are distributed based on your share of the pool and the duration
              you maintain your position.
            </p>
          </div>
        </div>
        <p>
          To maximize your liquidity rewards, consider providing liquidity to pairs with high trading volume and
          participating in any active liquidity mining programs. Keep in mind that the APY (Annual Percentage Yield) can
          fluctuate based on trading volume and the number of liquidity providers in the pool.
        </p>
      </section>

      <section id="impermanent-loss" className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding Impermanent Loss</h2>
        <p>
          Impermanent loss is a risk that liquidity providers face when the price of tokens in the pool changes
          significantly from when they were deposited. It's called "impermanent" because the loss is only realized when
          you withdraw your liquidity.
        </p>
        <p>Here's a simplified explanation:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>If you hold tokens without providing liquidity, their value changes directly with the market price</li>
          <li>When you provide liquidity, the pool automatically balances the ratio of tokens as trades occur</li>
          <li>
            If one token's price increases significantly relative to the other, the pool will have less of the
            appreciating token and more of the depreciating token compared to simply holding
          </li>
          <li>
            This difference between the value of your liquidity position and what you would have if you had just held
            the tokens is the impermanent loss
          </li>
        </ul>
        <p>
          Trading fees and liquidity mining rewards can offset impermanent loss, but it's important to understand this
          risk before providing liquidity, especially for volatile token pairs.
        </p>
      </section>
    </div>
  )
}
