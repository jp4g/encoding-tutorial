const { expect } = require('chai')
const { ethers } = require('hardhat')
const { BigNumber: BN } = ethers

describe("Basic Decode", () => {
    const abi = new ethers.utils.AbiCoder()
    let instance
    beforeEach(async () => {
        const BasicDecode = await ethers.getContractFactory("BasicDecode")
        instance = await BasicDecode.deploy()
    })
    it("Default expectation", async () => {
        const flag = await instance.flag()
        const alsoFlag = await instance.alsoFlag()
        expect(flag).to.be.equal('hello')
        expect(alsoFlag).to.be.equal(BN.from(1))
    })
    it("Set some data", async () => {
        const data = abi.encode([
            "string", "uint256", "bytes"],
            ["goodbye", "100", "0x"]
        )
        await instance.set(data)
        const flag = await instance.flag()
        const alsoFlag = await instance.alsoFlag()
        expect(flag).to.be.equal('goodbye')
        expect(alsoFlag).to.be.equal(BN.from(100))
    })
    it("More complex data", async () => {
        const types = ["string", "uint256", "bytes"]
        const subData = abi.encode([
            "uint256[]", "string[]"],
            [
                [1000, 200421, 16],
                ["dog", "cat"]
            ]
        )
        const data = abi.encode(
            types,
            ["goodbye", "100", subData]
        )
        await instance.set(data)
        const ret = await instance.bigStore()
        console.log('data: ', abi.decode(["uint256[]", "string[]"], ret))
    })
    it("Signed data", async () => {
        const signers = await ethers.getSigners()
        console.log('signer: ', signers[0].address)
        const types = ["address", "string", "uint256"]
        const encoded = abi.encode(
            types,
            [signers[0].address, "signed yay", BN.from(307)]
        )
        const hash = ethers.utils.id(encoded)
        const binary = ethers.utils.arrayify(hash)
        const signed = await signers[0].signMessage(binary)
        console.log('ethers says', ethers.utils.verifyMessage(binary, signed))
        console.log('recoverKey says', await instance.recoverKey(hash, signed, 0)) //@dev#1
        console.log('signed: ', signed)
        await instance.secureSet(encoded, signed) //@dev#2
        const flag = await instance.flag()
        const alsoFlag = await instance.alsoFlag()
        expect(flag).to.be.equal('signed yay')
        expect(alsoFlag).to.be.equal(BN.from(307))
    })
})