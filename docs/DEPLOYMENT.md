# Deployment

## Current verified release

| Field | Value |
| --- | --- |
| Network | GenLayer Studionet |
| Chain ID | `61999` |
| Release | `assurance-escrow-v2` |
| Contract | `0xf3D6D3d4ae9cdA138EE7cF21207EBD8e6976f358` |
| Deploy transaction | `0x8e5b4ce00ac4657ed26471793203eb4d544cccc2dadcf84100db1f1f39c37e9b` |
| Consensus | `MAJORITY_AGREE` |
| Source SHA-256 | `97d0bc0052ee35936696281d3df4aeffa8e7f7d94a401b374bb67e1d0178aff4` |

The complete deployment receipt is committed in [deployment evidence](../evidence/deployment.assurance-escrow-v2.studionet.json). It verifies the finalized transaction's returned source bytes match the source checked into this repository.

## Deploy a new release

Use a funded account and a new lowercase release ID. Never commit secret keys.

```bash
npm ci
ASSURANCE_ESCROW_DEPLOYER_KEY=... \
ASSURANCE_ESCROW_RELEASE_ID=your-release-id \
npm run deploy
```

The script rejects a deployment unless it finalizes with majority consensus, has execution evidence, returns a contract address, and exposes source bytes whose SHA-256 matches `contracts/assurance_escrow.py`.

## Run a live lifecycle

The runner checks that its contract address is the address recorded for the selected release. It then validates the frozen panels, opens a 0.01 GEN rail, lodges the claim, collects the primary review, posts the exact 5% challenge bond, performs the counter review, and checks recipient payment and global accounting. Supply the evidence and counterevidence JSON through the named environment variables, or save them as release-specific files under the ignored `artifacts/` directory.

```bash
ASSURANCE_ESCROW_RELEASE_ID=your-release-id npm run generate-evidence

ASSURANCE_ESCROW_CONTRACT_ADDRESS=... \
ASSURANCE_ESCROW_ISSUER_KEY=... \
ASSURANCE_ESCROW_RECIPIENT_KEY=... \
ASSURANCE_ESCROW_RELEASE_ID=your-release-id \
ASSURANCE_ESCROW_EVIDENCE_POLICY="$(cat artifacts/evidence-policy.your-release-id.json)" \
ASSURANCE_ESCROW_COUNTEREVIDENCE="$(cat artifacts/counterevidence.your-release-id.json)" \
ASSURANCE_ESCROW_E2E_SCENARIO=4 \
npm run e2e:studionet
```
