# AssuranceEscrow

`AssuranceEscrow` is a standalone GenLayer contract for funding a service obligation and settling it from a quorum of independently authenticated, content-addressed attestations.

The contract uses its own public contract name and protocol namespaces:

- Contract: `AssuranceEscrow`
- Policy schema: `assurance-escrow.evidence-policy/v1`
- Counterevidence schema: `assurance-escrow.counterevidence/v1`
- Attestation schema: `assurance-escrow.independent-attestation/v1`

## Verification

```bash
pytest -q test_assurance_escrow_e2e.py
```

The Direct Mode suite deploys the real contract in a controlled GenLayer runtime. It covers funding, claim review, authenticated disputes, settlement, recovery, replay protection, hostile evidence, transfer failures, migration compatibility, and accounting conservation.

For a public-network lifecycle, provide funded keys and your own pinned evidence-policy files:

```bash
npm ci
ASSURANCE_ESCROW_DEPLOYER_KEY=... ASSURANCE_ESCROW_RELEASE_ID=assurance-escrow-v1 npm run deploy
ASSURANCE_ESCROW_CONTRACT_ADDRESS=... ASSURANCE_ESCROW_ISSUER_KEY=... ASSURANCE_ESCROW_RECIPIENT_KEY=... ASSURANCE_ESCROW_RELEASE_ID=your-release-id ASSURANCE_ESCROW_EVIDENCE_POLICY="$(cat evidence-policy.json)" ASSURANCE_ESCROW_COUNTEREVIDENCE="$(cat counterevidence.json)" ASSURANCE_ESCROW_E2E_SCENARIO=4 npm run e2e:studionet
```

See [architecture](docs/ARCHITECTURE.md), [deployment](docs/DEPLOYMENT.md), [testing](docs/TESTING.md), and [evidence notes](docs/EVIDENCE.md) for current details and verification limits.
