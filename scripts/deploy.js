
async function main() {
    const [deployer] = await ethers.getSigners()
    const factory = await ethers.getContractFactory("BasicDecode")
    const ins = await factory.deploy()
    console.log("Instance of BasicDecode.sol Deployed at", ins.address)
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })