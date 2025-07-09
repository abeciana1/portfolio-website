// import MillionLint from '@million/lint';
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ab-ph-us-west.s3.us-west-1.amazonaws.com'
      }
    ]
  },
  reactStrictMode: false
}

export default withPayload(nextConfig)
// MillionLint.next({
//   enabled: true,
//   rsc: true,
//   optimizeDOM: true,
//   legacyHmr: true,
//   filter: {
//     include: [
//       "**/components/*.{tsx}",
//       "**/src/blocks/*/component.{tsx}"
//     ]
//   }
// })(withPayload(nextConfig));
