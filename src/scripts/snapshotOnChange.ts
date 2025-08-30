// import dotenv from 'dotenv'
// dotenv.config({
//   path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development.local',
// })
// import { type CollectionSlug, type CollectionAfterChangeHook } from 'payload'
// // import { payload } from '@/src/payload'
// import {
//   // BUCKET,
//   // r2,
//   bucket,
//   getCollectionData,
// } from './collection-snap'

// // export const snapshotOnChange = (segment: string, collectionSlug: CollectionSlug) => {
// export const snapshotOnChange = (doc: any) => {
//   console.log('docReq', doc)
//   // return async () => {
//   //   try {
//   //     console.log(`[snapshot] ${collectionSlug} changed — publishing…`)
//   //     const collection = await getCollectionData(collectionSlug)
//   //     const formattedCollection = JSON.stringify(collection, null, 2)
//   //     await bucket.upload(formattedCollection, `${segment}/${collectionSlug}.json`)
//   //     console.log(`[snapshot] published ${collectionSlug}.json to R2`)
//   //   } catch (err) {
//   //     console.error(`[snapshot] ${collectionSlug} publish failed`, err);
//   //   }
//   // }
// }

// export const snapshotOnDelete = async (segment: string, collectionSlug: CollectionSlug) => {
//   try {
//     console.log(`[snapshot] ${collectionSlug} deleted — publishing...`)
//     const collection = await getCollectionData(collectionSlug)
//     const formattedCollection = JSON.stringify(collection, null, 2)
//     await bucket.upload(formattedCollection, `${segment}/${collectionSlug}.json`)
//     console.log(`[snapshot] published ${collectionSlug}.json to R2`)
//   } catch (err) {
//     console.error(`[snapshot] ${collectionSlug} delete failed`, err)
//   }
// }
