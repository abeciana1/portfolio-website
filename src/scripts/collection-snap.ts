import dotenv from "dotenv";
dotenv.config({ path: ".env.development.local" });
import { type CollectionSlug } from 'payload'
import { payload } from '@/src/payload'
import { R2 } from 'node-cloudflare-r2';

interface HashI {
  [key: string]: CollectionSlug[]
}

const collectionHash: HashI = {
  pages: ['pages', 'project-pages'],
  tags: ['project-tags', 'skills'],
  segments: [
    'skills-collection',
    'testimonials',
    'jobs',
    'projects'
  ],
  navigation: [
    'navigation-menu',
    'nav-links',
  ]
}

const BUCKET = process.env.NEXT_PUBLIC_R2_SNAPSHOTS_BUCKET || 'portfolio-snapshots'

const r2 = new R2({
    accountId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCT_ID as string,
    accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY as string,
});

const bucket = r2.bucket(BUCKET)

console.log(await bucket.exists()); // true

export const getCollectionData = async (collectionSlug: CollectionSlug) => {
  return await payload.find({
    collection: collectionSlug,
    limit: 1000,
    depth: 3
  })
}

//* this runs on all collections
const main = async () => {
  const contentAreas = Object.keys(collectionHash)

  for (const contentArea of contentAreas) {
    const collectionSlugs = collectionHash[contentArea]
    for (const collectionSlug of collectionSlugs) {
      const collection = await getCollectionData(collectionSlug)
      const formattedCollection = JSON.stringify(collection, null, 2)
      await bucket.upload(formattedCollection, `${contentArea}/${collectionSlug}.json`);
    }
  }
}

main()

