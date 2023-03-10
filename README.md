# Frontend to generate ZK proofs for Ketl

## Local launch

1. Install dependencies with `yarn`
2. Add `.env` into your project root with proper variables
3. Run the server with `yarn start`

## Environment variables

| Name                              | Description                                                              |
| --------------------------------- | ------------------------------------------------------------------------ |
| `VITE_ETH_NETWORK`                | Eth network for your providers and contract (defaults to @bwl/constants) |
| `VITE_ETH_RPC`                    | Ethereum node RPC URI (defaults to @bwl/constants)                       |
| `VITE_KETL_OBSS_CONTRACT_ADDRESS` | OBSS contract address, that stores some app data                         |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
