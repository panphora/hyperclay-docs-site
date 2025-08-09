Set up `cron` task on server
```bash
0 4 * * * /var/www/hyperclay/backup_to_s3.sh > /var/www/hyperclay/cron_output.log 2>&1
```

Config: don't allow overwrite on S3
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowBasicOperations",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::546381389004:user/hyperspace"
      },
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:ListBucket",
        "s3:ListBucketVersions",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::hyperspace-backups",
        "arn:aws:s3:::hyperspace-backups/*"
      ]
    },
    {
      "Sid": "DenyDeleteObject",
      "Effect": "Deny",
      "Principal": {
        "AWS": "arn:aws:iam::546381389004:user/hyperspace"
      },
      "Action": [
        "s3:DeleteObject",
        "s3:DeleteObjectVersion"
      ],
      "Resource": "arn:aws:s3:::hyperspace-backups/*"
    }
  ]
}
```

