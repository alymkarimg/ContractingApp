/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBranchEnv = require('next-branch-env')({ expose: 'BRANCH' });
if (process.env.NODE_ENV !== 'development') process.env.NEXTAUTH_URL = `https://${process.env.BRANCH}.${process.env.ROOT_HOST}`;
module.exports = withBranchEnv(nextConfig);
