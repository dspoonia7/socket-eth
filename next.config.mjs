/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ETH_PROJECT_ID: process.env.ETH_PROJECT_ID,
        ETH_WALLET_ADDRESS: process.env.ETH_WALLET_ADDRESS,
    }
};

export default nextConfig;
