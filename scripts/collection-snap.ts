import * as AWS from 'aws-sdk';
import { payload } from '@/src/payload'

const collectionHash = {
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

const s3 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
  s3ForcePathStyle: true,
});

//* snapshot retrieval for content requests
const retrieveSnapshot = async () => {}

//* abstracted functions for job
const getSnapshot = async () => {}

const createSnapshot = async () => {}

const updateSnapshot = async () => {}

const deleteSnapshot = async () => {}