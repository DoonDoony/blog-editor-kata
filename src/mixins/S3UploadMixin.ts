import Vue from "vue";
import { Component } from "vue-property-decorator";
import AWS from "aws-sdk";
import { v4 as uuid4 } from "uuid";
import * as path from "path";

const region: string = process.env.VUE_APP_AWS_REGION ?? "NO_REGION";
const IdentityPoolId: string =
  process.env.VUE_APP_AWS_COGNITO_IDENTITY_POOL_ID ?? "NO_POOL_ID";
const Bucket: string =
  process.env.VUE_APP_AWS_S3_BUCKET_NAME ?? "NO_BUCKET_NAME";

AWS.config.update({
  region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket }
});

@Component
export default class extends Vue {
  async uploadToS3(file: File): Promise<string> {
    const ext = path.extname(file.name);
    const Key = uuid4() + ext;
    const params = { ACL: "public-read", Bucket, Key, Body: file };
    try {
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
