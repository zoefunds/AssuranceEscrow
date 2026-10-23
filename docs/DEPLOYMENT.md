# Deployment

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

The runner checks that its contract address is the address recorded for the selected release. It then validates the frozen panels, opens a 0.01 GEN rail, lodges the claim, collects the primary review, posts the exact 5% challenge bond, performs the counter review, and checks recipient payment and global accounting. Supply the evidence and counterevidence JSON through the named environment variables, or save them as release-specific files under the ignored `artifacts/` directory.

```bash
ASSURANCE_ESCROW_CONTRACT_ADDRESS=... \
ASSURANCE_ESCROW_ISSUER_KEY=... \
ASSURANCE_ESCROW_RECIPIENT_KEY=... \
ASSURANCE_ESCROW_RELEASE_ID=your-release-id \
ASSURANCE_ESCROW_E2E_SCENARIO=4 \
npm run e2e:studionet
```
