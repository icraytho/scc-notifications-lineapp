# Google Cloud SCC Notifications to Line App

This repository contains provides example code to create Finding Notifications for Security Command Center, and sends the findings to Line using a Line Messaging API.

The infrastructure is written in Terraform, which will create the following components:

- [SCC Finding Notifications](https://cloud.google.com/security-command-center/docs/how-to-notifications)
- [Pub/Sub Topic](https://cloud.google.com/pubsub)
- [GCS Bucket](https://cloud.google.com/storage/docs/creating-buckets)
- [GCS Object](https://cloud.google.com/storage/docs/json_api/v1/objects)
- [Cloud Function](https://cloud.google.com/functions)

The Cloud Function is written in Node.js which will parse the Pub/Sub event and send the details to a Line App Channel using a Flex message with the Line Messaging API.


## Prerequisites 

1. Tested on Terraform v1.0.11 with Google Cloud Provider v4.5.0
2. Google Cloud SDK
3. Enable Cloud Functions API and Cloud Build API
4. Enable Security Command Center
5. Node.js runtime >= 16
6. Getting started with the Messaging API and to create Line Channel - info can be found [here](https://developers.line.biz/en/docs/messaging-api/getting-started/)


## Usage

```ruby
module "scc_notifications" {
    source = "../"

    bucket_name                     = ""
    bucket_location                 = "ASIA-SOUTHEAST1"
    function_name                   = "scc-notification-lineapp"
    function_description            = "SCC Notifications to Line App Channel"
    function_runtime                = "nodejs16"
    topic_name                      = "scc-notifications-topic"
    channelAccessToken              = ""
    channelSecret                   = ""
    userID                          = ""
    topic_iam_role                  = "roles/pubsub.publisher"
    scc_notification_name           = "all-active-alerts"
    org_id                          = ""
    scc_notification_description    = "My Custom Cloud Security Command Center Finding Notification Configuration"
    notification_filter             = "state=\"ACTIVE\" AND (mute=\"UNMUTED\" OR mute=\"UNDEFINED\") AND (severity=\"CRITICAL\" OR severity=\"HIGH\")"


}
```


*Note: This code sample requires you to hardcode the channelAccessToken and channelSecret as an environment variable, using the confidential flag for Terraform. For added security, and to safeguard credentials, consider using Secret Manager with Cloud Functions. For instructions, see [Using secrets](https://cloud.google.com/functions/docs/configuring/secrets) in Cloud Functions documentation.*