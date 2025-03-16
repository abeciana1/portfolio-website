import { payload } from '@/src/payload'
import { gql, GraphQLClient } from 'graphql-request'
// import dotenv from 'dotenv';
// dotenv.config();

console.log('process.env.GRAPH_CMS_API_ENDPOINT', process.env.NEXT_PUBLIC_GRAPH_CMS_API_ENDPOINT)
const expClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPH_CMS_API_ENDPOINT || "")

const skillQuery = gql`
  query skills {
    skills(stage: PUBLISHED) {
      name
      id
      image {
        alt
        url(transformation: {document: {output: {format: webp}}})
      }
  }
}
`
const { skills } = await expClient.request(skillQuery)

const migrateSkillsToPayload = async () => {
  console.log('PORTFOLIO SKILLS', skills)
  return await skills?.map(async (skill) => {
    return await payload.create({
      collection: 'skills-collection',
      data: {
        blockType: 'skill-block'
      }
    })
  })
}

migrateSkillsToPayload()