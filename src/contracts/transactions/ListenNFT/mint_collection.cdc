import NonFungibleToken from "../../contracts/dependencies/NonFungibleToken.cdc"
import ListenNFT from "../../contracts/ListenNFT.cdc"

// This script uses the NFTMinter resource to mint a new collection of NFTs
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

// Takes an array of metadata objects that for most cases will only have edition number or similar changing
// All nfts minted share same ipfsPin  

transaction(recipient: Address, metadata: [{String:String}], ipfsPin: String) {

    // local variable for storing the minter reference
    let minter: &ListenNFT.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&ListenNFT.NFTMinter>(from: ListenNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let receiver = getAccount(recipient)
            .getCapability(ListenNFT.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        for meta in metadata {
            // Mint the NFT and deposit it to the recipient's collection
            self.minter.mintNFT(recipient: receiver, metadata: meta, ipfsPin: ipfsPin)
        }
    }
}
