/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import withAuthentication from '@/middleware/withAuthentication'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const GET = withAuthentication(REST_GET(config))
export const POST = withAuthentication(REST_POST(config))
export const DELETE = withAuthentication(REST_DELETE(config))
export const PATCH = withAuthentication(REST_PATCH(config))
export const PUT = withAuthentication(REST_PUT(config))
export const OPTIONS = withAuthentication(REST_OPTIONS(config))
