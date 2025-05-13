export default function GettingStartedGuide() {
  return (
    <div className="space-y-8">
      <section id="introduction" className="space-y-4">
        <h2 className="text-2xl font-bold">Introduction to SwapArena</h2>
        <p>
          SwapArena is a DeFi gaming platform that allows users to stake on trade frequency or volume and win rewards.
          This guide will help you understand how to use the platform and get the most out of your experience.
        </p>
        <p>
          The platform combines elements of DeFi trading with prediction markets, allowing users to earn rewards by
          correctly predicting market trends.
        </p>
      </section>

      <section id="connecting-wallet" className="space-y-4">
        <h2 className="text-2xl font-bold">Connecting Your Wallet</h2>
        <p>To use SwapArena, you'll need to connect a compatible Ethereum wallet:</p>
        <ol className="ml-6 space-y-2 list-decimal">
          <li>Click the "Connect Wallet" button in the top right corner of the page</li>
          <li>Select your preferred wallet provider (MetaMask, WalletConnect, etc.)</li>
          <li>Approve the connection request in your wallet</li>
          <li>Once connected, your wallet address will appear in the header</li>
        </ol>
        <p>
          Make sure your wallet is connected to the Ethereum mainnet and has some ETH for gas fees and BEX tokens for
          participating in quests.
        </p>
      </section>

      <section id="bex-token" className="space-y-4">
        <h2 className="text-2xl font-bold">BEX Token</h2>
        <p>
          BEX is the native token of the SwapArena platform. It's used for staking in quests, governance voting, and
          earning rewards.
        </p>
        <p>You can acquire BEX tokens in several ways:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>Swap ETH or other tokens for BEX on the Swap page</li>
          <li>Provide liquidity to BEX pairs and earn trading fees</li>
          <li>Win quests and earn BEX rewards</li>
          <li>Refer friends to the platform and earn referral bonuses</li>
        </ul>
      </section>

      <section id="platform-overview" className="space-y-4">
        <h2 className="text-2xl font-bold">Platform Overview</h2>
        <p>SwapArena consists of several key sections:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>
            <strong>Quests:</strong> Join prediction games by staking BEX tokens on volume or frequency outcomes
          </li>
          <li>
            <strong>Swap:</strong> Exchange tokens with other users through the decentralized exchange
          </li>
          <li>
            <strong>Liquidity:</strong> Provide liquidity to token pairs and earn fees
          </li>
          <li>
            <strong>Portfolio:</strong> Track your active quests, past performance, and claimable rewards
          </li>
          <li>
            <strong>Leaderboard:</strong> See top performers and compete for rankings
          </li>
          <li>
            <strong>Governance:</strong> Participate in platform decisions by voting on proposals
          </li>
          <li>
            <strong>Referrals:</strong> Invite friends and earn rewards when they join
          </li>
        </ul>
      </section>
    </div>
  )
}
