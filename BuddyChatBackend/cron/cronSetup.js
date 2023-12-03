const CronJob = require("cron").CronJob;
const messageM = require("../model/messageM");
const archiveM = require("../model/archiveChatM");
const Sequelize = require("sequelize");

const job = new CronJob("0 0 * * *", async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const oldMessages = await messageM.findAll({
    where: {
      createdAt: {
        [Sequelize.Op.lt]: oneDayAgo,
      },
    },
  });

  for (const message of oldMessages) {
    await archiveM.create({
      msg: message.msg,
      phone: message.phone,
      groupId: message.groupId,
      fileURL: message.fileURL,
      createdAt: message.createdAt,
    });
  }

  //   await messageM.destroy({
  //     where: {
  //       createdAt: {
  //         [Sequelize.Op.lt]: oneDayAgo,
  //       },
  //     },
  //   });
});

job.start();
