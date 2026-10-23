# Testing

## Direct Mode

Run:

```bash
pytest -q test_assurance_escrow_e2e.py
```

The current suite contains 44 tests. It executes the actual `AssuranceEscrow` source in GenLayer Direct Mode and mocks only the external web boundary. Coverage includes:

- primary quorum, receipt provenance, and deterministic uptime classification;
- frozen counterevidence, both challenger roles, bond routing, and dispute-time substitution rejection;
- DID, URL, HTTP-status, digest, metadata, schema, identity, and measurement-fact validation;
- prompt-injection resistance and publisher-outcome non-authority;
- retries, validator disagreement, recovery paths, replay protection, transfer failure atomicity, and conservation;
- compatibility with the frozen ProofRail evidence schema family.

## Real Studionet E2E

On 2026-10-23, `assurance-escrow-v1` completed a real funded lifecycle on rail `1`. All five writes finalized with `MAJORITY_AGREE` and execution evidence:

| Action | Transaction |
| --- | --- |
| Open 0.01 GEN rail | `0xc7f91d2e3d600ddc0b4944ff8fb5e8d74d5851badaf6ca6a411bb02b529bad66` |
| Lodge recipient claim | `0xbc6e5db68c0585582e444b33e00894c82d5ce82bf09eb580c1402a08c154834a` |
| Primary review | `0xbcc84289978e77de2ba672474690a9217f44369b2f0e7af2bdd35fa22a5f242f` |
| Post challenge bond | `0xb39219683a8fde40ab73715ddcb4dbea46b1640c7157856d0eb6079bcc4a1b5b` |
| Counterevidence review and settlement | `0x920d10c4f00e9b33b5593c6dea7fd0567c6dd34ea5f484c7020150c653867992` |

The primary receipt verified 2 agreeing sources for `FULFILLED`. The counter receipt verified 3 agreeing sources for `BREACHED`. Settlement paid `10000000000000000` wei (0.01 GEN) to the recipient and ended with `locked = 0` and `bonds_locked = 0`. The full record is [live E2E evidence](../evidence/live-e2e-assurance-escrow-v1-4.studionet.json).
