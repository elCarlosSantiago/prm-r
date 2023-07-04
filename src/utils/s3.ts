import { env } from "../env.mjs"
import { S3 } from "aws-sdk"
import s3Stream from "s3-upload-stream"
import { https } from "follow-redirects"

export const s3 = new S3({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadImage = (key: string, url: string) => {
  return new Promise((resolve, reject) => {
    const upload = s3Stream(s3).upload({
      ACL: "private",
      Key: key,
      Bucket: env.S3_BUCKET_NAME,
    })

    https.get(url, (res) => {
      res.on("error", reject)
      res.on("close", resolve)
      res.pipe(upload)
    })
  })
}
