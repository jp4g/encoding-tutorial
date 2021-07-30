<h2>Deployment Steps</h2>
</br>
<li>Clone this repository
<pre>git clone https://github.com/jp4g/encoding-tutorial.git</pre>
</li>
<li>Install dependencies with Yarn
<pre>yarn</pre>
</li>
<li>Create .env file
<pre>ACCOUNT_PRIVATE_KEY=&lt;private key of your account&gt;
INFURA=&lt;infura key for your account&gt;
</li>
<li>Run the following command to test
<pre>npx hardhat test</pre>
</li>
@dan13ram
why does BasicDecode.js:57(ctrl+f '@dev#1') return ok
but BasicDecode.js:60(ctrl+f '@dev#1') -> BasicDecode.sol:34 does not return what everything else does