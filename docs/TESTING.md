# Testing

## Direct Mode

Run:

```bash
pytest -q test_assurance_escrow_e2e.py
```

The current suite contains 43 tests. It executes the actual `AssuranceEscrow` source in GenLayer Direct Mode and mocks only the external web boundary. Coverage includes:

- primary quorum, receipt provenance, and deterministic uptime classification;
- frozen counterevidence, both challenger roles, bond routing, and dispute-time substitution rejection;
- DID, URL, HTTP-status, digest, metadata, schema, identity, and measurement-fact validation;
- prompt-injection resistance and publisher-outcome non-authority;
- retries, validator disagreement, recovery paths, replay protection, transfer failure atomicity, and conservation;
