# AssuranceEscrow

`AssuranceEscrow` is a standalone GenLayer contract for funding a service obligation and settling it from a quorum of independently authenticated, content-addressed attestations.

The contract begins with the supplied ProofRail implementation's hardened escrow logic, but uses its own public contract name and protocol namespaces:

- Contract: `AssuranceEscrow`
- Policy schema: `assurance-escrow.evidence-policy/v1`
- Counterevidence schema: `assurance-escrow.counterevidence/v1`
- Attestation schema: `assurance-escrow.independent-attestation/v1`

For safe migration, the contract also accepts the predecessor's frozen `proofrail.*` evidence schemas. This is intentionally limited to evidence parsing; the deployed contract remains `AssuranceEscrow` and preserves the full validation, independent-source, and accounting rules.

## Run the end-to-end suite

```bash
pytest -q test_assurance_escrow_e2e.py
```

The suite deploys the real contract in GenLayer Direct Mode and covers funding, claim review, authenticated disputes, settlement, recovery, replay protection, hostile evidence, transfer failures, and accounting conservation.
