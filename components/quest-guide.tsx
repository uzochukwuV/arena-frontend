export default function QuestGuide() {
  return (
    <div className="space-y-8">
      <section id="quest-types" className="space-y-4">
        <h2 className="text-2xl font-bold">Quest Types</h2>
        <p>SwapArena offers two main types of quests:</p>
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Volume Quests</h3>
            <p className="mt-2">
              In Volume Quests, you predict whether buy volume or sell volume will be higher by the end of the quest
              period. The total value of transactions is what matters, not the number of transactions.
            </p>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Frequency Quests</h3>
            <p className="mt-2">
              In Frequency Quests, you predict whether buy transactions or sell transactions will occur more frequently
              by the end of the quest period. The number of transactions is what matters, not their value.
            </p>
          </div>
        </div>
        <p>
          Each quest has a specific timeframe (usually 24 hours) and is associated with a particular trading pair (e.g.,
          BEX-ETH).
        </p>
      </section>

      <section id="joining-quests" className="space-y-4">
        <h2 className="text-2xl font-bold">Joining Quests</h2>
        <p>To join a quest:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Navigate to the Quests page and browse available quests</li>
          <li>Click on a quest to view its details</li>
          <li>Choose your prediction (Buys Win or Sells Win)</li>
          <li>Enter the amount of BEX you want to stake (minimum 100 BEX)</li>
          <li>Click "Join Quest" and confirm the transaction in your wallet</li>
        </ol>
        <p>
          Once you've joined a quest, you can track its progress on the Quest Details page or in your Portfolio under
          "Active Quests".
        </p>
      </section>

      <section id="claiming-rewards" className="space-y-4">
        <h2 className="text-2xl font-bold">Claiming Rewards</h2>
        <p>
          When a quest ends, the outcome is determined based on the final trading data. If your prediction was correct,
          you'll be eligible to claim rewards.
        </p>
        <p>To claim your rewards:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Go to your Portfolio page</li>
          <li>Check the "Claimable Rewards" section</li>
          <li>Click "Claim" next to the reward you want to claim, or "Claim All" to claim all rewards at once</li>
          <li>Confirm the transaction in your wallet</li>
        </ol>
        <p>
          Rewards are distributed proportionally based on your stake relative to the total stake on the winning side.
          For example, if you contributed 10% of the total stake on the winning side, you'll receive 10% of the reward
          pool.
        </p>
      </section>

      <section id="quest-strategies" className="space-y-4">
        <h2 className="text-2xl font-bold">Quest Strategies</h2>
        <p>Here are some strategies to improve your chances of winning quests:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>
            <strong>Analyze historical data:</strong> Look at past trading patterns for the token pair to identify
            trends
          </li>
          <li>
            <strong>Consider market events:</strong> Major announcements or events can significantly impact trading
            volume and frequency
          </li>
          <li>
            <strong>Diversify your predictions:</strong> Participate in multiple quests with different predictions to
            spread your risk
          </li>
          <li>
            <strong>Start small:</strong> Begin with smaller stakes until you become familiar with the platform and
            develop your strategy
          </li>
          <li>
            <strong>Monitor real-time data:</strong> Keep an eye on the current trading activity to make informed
            decisions
          </li>
        </ul>
        <p>
          Remember that all trading involves risk, and past performance is not indicative of future results. Only stake
          what you can afford to lose.
        </p>
      </section>
    </div>
  )
}
