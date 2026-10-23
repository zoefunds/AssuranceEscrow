# Deployment

## Current Studionet deployment

| Field | Value |
| --- | --- |
| Network | GenLayer Studionet |
| Chain ID | `61999` |
| Release | `assurance-escrow-v1` |
| Contract | `0x1Ed9a0735e29Be57698b49F4A3A3ad151FB8186f` |
| Deployed | 2026-10-23 11:39:44 UTC |
| Deploy transaction | `0x97648e3b7148c1437bec33affed974fd2d57c43df4542a568bc73234cccf6ee4` |
| Consensus | `MAJORITY_AGREE` |
| Source SHA-256 | `34bd9980587073143605e2bb555f205f3e3bb5c6e87cf815d30fb83d7fdfc168` |

The deploy record is [committed evidence](../evidence/deployment.assurance-escrow-v1.studionet.json). It verifies the finalized transaction's returned contract source hash equals the local source hash.

## Deploy a new release

Use a funded account and a new lowercase release ID. Never commit secret keys.

```bash
npm ci
ASSURANCE_ESCROW_DEPLOYER_KEY=... \
ASSURANCE_ESCROW_RELEASE_ID=your-release-id \
npm run deploy
```

The script rejects a deployment unless it finalizes with majority consensus, has execution evidence, returns a contract address, and exposes source bytes whose SHA-256 matches `assurance_escrow.py`.

## Run a live lifecycle

The runner checks that its contract address is the address recorded for the selected release. It then validates the frozen panels, opens a 0.01 GEN rail, lodges the claim, collects the primary review, posts the exact 5% challenge bond, performs the counter review, and checks recipient payment and global accounting.

```bash
ASSURANCE_ESCROW_CONTRACT_ADDRESS=... \
ASSURANCE_ESCROW_ISSUER_KEY=... \
ASSURANCE_ESCROW_RECIPIENT_KEY=... \
ASSURANCE_ESCROW_RELEASE_ID=your-release-id \
ASSURANCE_ESCROW_E2E_SCENARIO=4 \
npm run e2e:studionet
```
