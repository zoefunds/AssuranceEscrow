# AssuranceEscrow

`AssuranceEscrow` is a standalone GenLayer contract for funding a service obligation and settling it from a quorum of independently authenticated, content-addressed attestations.

The contract begins with the supplied ProofRail implementation's hardened escrow logic, but uses its own public contract name and protocol namespaces:

- Contract: `AssuranceEscrow`
- Policy schema: `assurance-escrow.evidence-policy/v1`
- Counterevidence schema: `assurance-escrow.counterevidence/v1`
- Attestation schema: `assurance-escrow.independent-attestation/v1`

For safe migration, the contract also accepts the predecessor's frozen `proofrail.*` evidence schemas. This is intentionally limited to evidence parsing; the deployed contract remains `AssuranceEscrow` and preserves the full validation, independent-source, and accounting rules.

## Verification

```bash
pytest -q test_assurance_escrow_e2e.py
```

The Direct Mode suite deploys the real contract in a controlled GenLayer runtime. It covers funding, claim review, authenticated disputes, settlement, recovery, replay protection, hostile evidence, transfer failures, migration compatibility, and accounting conservation.

For the documented public-network lifecycle, use the scripts below after providing funded keys:

```bash
npm ci
ASSURANCE_ESCROW_DEPLOYER_KEY=... ASSURANCE_ESCROW_RELEASE_ID=assurance-escrow-v1 npm run deploy
ASSURANCE_ESCROW_CONTRACT_ADDRESS=... ASSURANCE_ESCROW_ISSUER_KEY=... ASSURANCE_ESCROW_RECIPIENT_KEY=... ASSURANCE_ESCROW_RELEASE_ID=assurance-escrow-v1 ASSURANCE_ESCROW_E2E_SCENARIO=4 npm run e2e:studionet
```

## Verified Studionet deployment

`AssuranceEscrow` was deployed to GenLayer Studionet (chain ID `61999`) at `0x1Ed9a0735e29Be57698b49F4A3A3ad151FB8186f` on 2026-10-23. The finalized deploy transaction reached `MAJORITY_AGREE`, and its retrieved on-chain source SHA-256 exactly matches the checked-in source: `34bd9980587073143605e2bb555f205f3e3bb5c6e87cf815d30fb83d7fdfc168`.

The real rail lifecycle is recorded in [evidence/live-e2e-assurance-escrow-v1-4.studionet.json](evidence/live-e2e-assurance-escrow-v1-4.studionet.json): two DID-pinned primary sources verified `FULFILLED`; a bonded challenge then used three different DID-pinned counter sources, which verified `BREACHED`. The recipient received the full `0.01 GEN` escrow and final accounting reports zero locked principal and zero locked bond.

See [architecture](docs/ARCHITECTURE.md), [deployment](docs/DEPLOYMENT.md), [testing](docs/TESTING.md), and [evidence notes](docs/EVIDENCE.md) for current details and verification limits.
