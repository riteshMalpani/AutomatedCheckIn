const { CloudWatchEventsClient, PutRuleCommand } = require("@aws-sdk/client-cloudwatch-events");

const cwEventsClient = new CloudWatchEventsClient({ region: "us-west-2" });

process.env.AWS_ACCESS_KEY_ID = 'your_access_key_id';
process.env.AWS_SECRET_ACCESS_KEY = 'your_secret_access_key';
process.env.AWS_REGION = 'us-west-2';

const putRuleCommand = new PutRuleCommand({
  Name: "YOUR_RULE_NAME",
  ScheduleExpression: "cron(11 10 3 3 4 2023)",
  State: "ENABLED",
  Description: "YOUR_RULE_DESCRIPTION",
  Tags: [
    {
      Key: "YOUR_TAG_KEY",
      Value: "YOUR_TAG_VALUE",
    },
  ],
});

async function createRule() {
  try {
    const result = await cwEventsClient.send(putRuleCommand);
    console.log("Created rule successfully:", result.RuleArn);
  } catch (error) {
    console.error("Error creating rule:", error);
  }
}




module.exports = () => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/

  // router.get('/hello', async (req, res) => {
  //   res.json({msg: "Hello, world!"});
  // });

  // router.get('/hello/:name', async (req, res) => {
  //   res.json({msg: `Hello, ${req.params.name}`});
  // });

  router.post('/res', async (req, res) => {
    const { spawn } = require('child_process');
    const body = JSON.stringify(req.body)
    const pythonProcess = spawn('python', ['src/python_scripts/myscript.py', body]);
    let toReturn = ''
    pythonProcess.stdout.on('data', (data) => {
      toReturn += data.toString()
      // res.send(data)
    });

    pythonProcess.stderr.on('data', err => {
      console.log(String(err));
    });

    pythonProcess.on('close', (code, signal) => {
      res.json({msg: toReturn});
      console.log(toReturn)
      console.log(req.body)
      console.log(`child process exited with code ${code} and signal ${signal}`);
    });
    createRule()

  });

  return router;
}
