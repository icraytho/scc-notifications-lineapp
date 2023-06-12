const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const client = new line.Client(config);


function processEvent(event) {
    'use strict';
    const message = JSON.parse(event);
    const category = message.finding.category;
    const scannerName = message.finding.sourceProperties.ScannerName;
    const findingClass = message.finding.findingClass;
    const explanation = message.finding.sourceProperties.Explanation;
    const state = message.finding.state;
    const severity = message.finding.severity;
    const resourceName = message.finding.resourceName;
    const eventTime = message.finding.eventTime;
    const eventTimeObj = new Date(eventTime);
    const when = eventTimeObj.toUTCString();


    const linemessage = {
        type: 'flex',
        altText: 'SCC Alert!',
        "contents": {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `Severity: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${severity}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `Alert Name: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${category}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `Scanner Name: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${scannerName}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `Finding Class: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${findingClass}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `State: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${state}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `Explanation: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${explanation}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `Resource Name: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${resourceName}`,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [{
                                "type": "text",
                                "text": `When: `,
                                "weight": "bold",
                                "flex": 1,
                                "wrap": true
                            },
                            {
                                "type": "text",
                                "text": `${when}`,
                                "wrap": true
                            }
                        ]
                    }
                ]
            }
        }
    };



    client.pushMessage(process.env.userID, linemessage)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}
exports.helloPubSub = (pubsubMessage, callback) => {
    'use strict';
    const event = Buffer.from(pubsubMessage.data, 'base64').toString();
    console.log(event);
    processEvent(event, callback);
};