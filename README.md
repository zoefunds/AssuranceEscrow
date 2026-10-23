# AssuranceEscrow

`AssuranceEscrow` is a standalone GenLayer contract for funding a service obligation and settling it from a quorum of independently authenticated, content-addressed attestations.

The contract uses its own public contract name and protocol namespaces:

- Contract: `AssuranceEscrow`
- Policy schema: `assurance-escrow.evidence-policy/v1`
- Counterevidence schema: `assurance-escrow.counterevidence/v1`
- Attestation schema: `assurance-escrow.independent-attestation/v1`

## Verification

```bash
pytest -q tests/direct/test_assurance_escrow_e2e.py
```

The Direct Mode suite deploys the real contract in a controlled GenLayer runtime. It covers funding, claim review, authenticated disputes, settlement, recovery, replay protection, hostile evidence, transfer failures, and accounting conservation.

For a public-network lifecycle, provide funded keys and your own pinned evidence-policy files:

```bash
npm ci
ASSURANCE_ESCROW_DEPLOYER_KEY=... ASSURANCE_ESCROW_RELEASE_ID=your-release-id npm run deploy
ASSURANCE_ESCROW_CONTRACT_ADDRESS=... ASSURANCE_ESCROW_ISSUER_KEY=... ASSURANCE_ESCROW_RECIPIENT_KEY=... ASSURANCE_ESCROW_RELEASE_ID=your-release-id ASSURANCE_ESCROW_EVIDENCE_POLICY="$(cat evidence-policy.json)" ASSURANCE_ESCROW_COUNTEREVIDENCE="$(cat counterevidence.json)" ASSURANCE_ESCROW_E2E_SCENARIO=4 npm run e2e:studionet
```

See [architecture](docs/ARCHITECTURE.md), [deployment](docs/DEPLOYMENT.md), [testing](docs/TESTING.md), and [evidence notes](docs/EVIDENCE.md) for current details and verification limits.

## Current verified release

`assurance-escrow-v2` is deployed to GenLayer Studionet (chain ID `61999`) at `0xf3D6D3d4ae9cdA138EE7cF21207EBD8e6976f358`. The finalized deployment reached `MAJORITY_AGREE` and returned source bytes whose SHA-256 exactly matches this checkout: `97d0bc0052ee35936696281d3df4aeffa8e7f7d94a401b374bb67e1d0178aff4`.

Its real lifecycle record shows a 2-of-2 primary `FULFILLED` result, a 3-of-3 counterevidence `BREACHED` result, a 0.01 GEN recipient payout, and zero final locked funds or bond. See [deployment evidence](evidence/deployment.assurance-escrow-v2.studionet.json) and [live E2E evidence](evidence/live-e2e-assurance-escrow-v2-4.studionet.json).

## Repository layout

```text
contracts/assurance_escrow.py       Deployable GenLayer contract
tests/direct/                       Direct Mode contract behavior tests
scripts/                            Evidence generation, deployment, and live E2E tools
evidence/                           Public, finalized deployment and E2E records
docs/                               Architecture, deployment, testing, and evidence guides
```
