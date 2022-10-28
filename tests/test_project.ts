import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TestProject } from "../target/types/test_project";
import  * as web3 from "@solana/web3.js";
import {expect} from "chai";
import BN from 'bn.js';

describe("test_project", () => {
  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TestProject as Program<TestProject>;

  let userAccount = web3.Keypair.generate();
  // let provider_wallet = provider.wallet;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({userAccount: userAccount.publicKey, signer: provider.wallet.publicKey, systemProgram: web3.SystemProgram.programId}).signers([userAccount]).rpc();
    console.log("Your transaction signature", tx);

    const account = await program.account.joyAccount.fetch(userAccount.publicKey);
    expect(account.age).to.equal(0);
    expect(account.counter).to.equal(0);
    

  });

  it("Is updated", async () => {
    const tx = await program.methods.update().accounts({userAccount: userAccount.publicKey, signer: provider.wallet.publicKey}).rpc();
    console.log("tx sig:",tx);

    const account = await program.account.joyAccount.fetch(userAccount.publicKey);
    expect(account.age).to.equal(25);
    expect(account.counter).to.equal(1);
  })
});
