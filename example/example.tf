/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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