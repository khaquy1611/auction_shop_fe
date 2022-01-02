import NonFungibleToken from "../../contracts/dependencies/NonFungibleToken.cdc"

transaction() {
    prepare(signer: AuthAccount) {
        // Get a key from an auth account.
        let keyA = signer.keys.revoke(0)
    }
}