import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  SimpleERC7594Agent,
} from "../typechain-types";

async function simpleERC7594AgentFixture() {
  const factory = await ethers.getContractFactory("SimpleERC7594Agent");
  const agent = await factory.deploy();
  await agent.deployed();

  return agent;
}

describe("SimpleERC7594Agent", async function () {
  let agent: SimpleERC7594Agent;
  let owner: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async function () {
    [owner, ...addrs] = await ethers.getSigners();
    agent = await loadFixture(simpleERC7594AgentFixture);
  });

  it("can setAbilityURI and emit AbilityURLUpdated", async function () {
    expect( await agent.setAbilityURI("https://new-agent-ability-url.com")).to.emit(agent, "AbilityURIUpdated")
  });

  it("can requestAgent and emit AgentRequested", async function () {
    expect( await agent.requestAgent("mint a nft")).to.emit(agent, "AgentRequested")
  });
});
