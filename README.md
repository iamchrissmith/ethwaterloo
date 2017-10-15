# EthWaterloo Demo - Light Leadership Meritocratic Ratings

## Inspiration

This project was born out of the need in society to have a more effective way of distributing and allocating resources in organizations. Rather than allowing one person to control the resource flow based on their opinion (beaurocracy), we wanted to create a way of allocation that was based on people's contribution (meritocracy).
By utilizing a peer-to-peer resource allocation system for payments, organizations will be able to decentralize power, reward their members more accurately, and incentivize production and creativity at a high level.

## What it does

The ĐApp presents a browser based UI for peer to peer ratings. Peers rate each other, submit to the blockchain using Metamask, and can view the results. 
Only encrypted aggregate ratings are stored on the Ethereum blockchain.
A public key is shared across clients to homomorphically encrypt ratings data before saving on the blockchain. The homomorphic encryption opens up the possibility of implementing a rolling average on each new rater's client application and save only the new average to the blockchain.
Final results can be publically revealed by decrypting the rolling average with the private key and presenting on the client side. The results, once revealed, are pushed to a Radar Chart that shows the relationship between people and how their contribution ratings compare to one another.

## How we built it

Tech stack includes:

* Reactjs, Web3 and MetaMask for client side UI 
* Paillierjs (for ease of use not because we recommend js crypto)
* Solidity on a local testrpc
* Semantic UI and chartjs2 

## Challenges we ran into

On chain libraries for integers larger than uint256 limit our options. The paillier based calculations are handled off chain.
Determining our game-plan - there were many ways we could go with the approach (hybrid chain, all on-chain, ex). Ultimately, we decided to modify our ideal approach due to hackathon time restraints.

Lots of interesting talks made it a challenge to choose whether to stay and code or go and watch the talk, especially when we weren't sure if we'd be able to get a feature completed by the end of the competition...but we got all the features we expected at this time :)

## Accomplishments that we're proud of

We present an elegant solution to peer to peer ratings on the blockchain, while not revealing who rated who what score. The application serves as a proof of concept of how peer ratings can lead to real life implications (e.g. meritocratic pay delivered over the blockchain.)

## What we learned

Privacy is a difficult challenge without an easy answer. Each technical tool we considered comes with a set of advantages and new disadvantages. To properly tackle our use case, a hybrid approach is likely needed.

## What's next for Light Leadership Meritocratic Ratings

Ring signatures are next on the list to evaluate. Tackling the problem from the opposite angle–hiding the source of the rating and revealing the actual rating–supports a different set of use cases and removes relaince on a rusted reveal.

User authentication and user-friendliness is important, especially to those inexperienced interacting with the blockchain. 
Additional functionality must also be implemented:

* Batching "surveys" together to only reveal averages for each month
* Automatic payments for Sphere Participants based on their average ratings and profits within the Sphere
* Email/Text notifications when it's time to rate each other member
* Ability to create/manage users of Spheres
* Enhanced data viewing / data analysis (d3 libraries)

## Instructions

*** NOTE: This app is for demo purposes only, is *insecure* and should *not* be run in production ***

1. Get the Files: `git clone https://github.com/iamchrissmith/ethwaterloo.git`
2. `cd ethwaterloo`
3. Setup the React app `npm install` or `yarn install`
4. TestRPC needs to have specific accounts to get the PoC App Running, so run TestRPC on `http://localhost:8545` with `testrpc --account='0xdad5277a2260babc685fab496e64d57aa3a832989df0db769d2d8d94c57ba032, 7000000000000000000000000' --account='0xa73e59aaf174f8b0f707583100024ad6c16467c813d074bf8742284da93d759b, 7000000000000000000000000' --account='0x1a2ffc6fc90b1042882cedea1a6b2023db9a760f18b65fd5434ccf8a332d1d22, 7000000000000000000000000' --account='0x288774987767b57de0085f3dd14bd0ca102b43c1e97846572d67584d32e8d2b5, 7000000000000000000000000' --account='0x37e2165ced5c243195749b15da97139026ff6b6e276fee98e4d204548ee93163, 7000000000000000000000000'`
5. While TestRPC is running in a separate terminal window run `truffle migrate --reset` to deploy your contracts to the test network.
6. Import the account you want to use into MetaMask:
 a. For the first account go to MetaMask in your browser.  Make sure you are connected to your private network (localhost:8545).
 b. Select accounts at the top right, scroll to the bottom to `Import Accounts`
 c. Paste the private key for the account without the `0x`, for example if you wanted the first one paste: `dad5277a2260babc685fab496e64d57aa3a832989df0db769d2d8d94c57ba032`
7. Once that is complete run `npm start` / `yarn start` to start the frontend.  That should open `http://localhost:3000` in your browser.

*** NOTE: This app is for demo purposes only.  We are loading the private keys for our encryption into the browser.  This means: ***

1. It is insecure and should not be run in production
2. If you reload your browser, the pub/private keys will be regenerated and you will have to repeat steps 4, 5 and 7 above.  

8. Once the browser is running, you can vote for the team members other than yourself up to 2 times (simulating the biweekly rating cycle).
9. When you submit a rating, MetaMask should ask you to approve the transaction.  Your browser console will output the score you submitted and its encrypted equivallent.
10. After you have submitted the scores, you can click `Update Ratings` at the bottom of the page.
11. This will retreive the encrypted scores from the blockchain, decrypt them and add them to the radar chart.
12. You can view the health of your team by how closely packed the radar chart is. For example if everyone got high scores for the period from their peers, they grouping will be clustered around the center. If you have one team member, who got lower scores, they will be further out. (i.e. center = 10, edge = 0)