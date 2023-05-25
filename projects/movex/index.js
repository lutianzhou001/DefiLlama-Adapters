const sui = require("../helper/chain/sui");
const axios = require("axios");

async function tvl(_timestamp, _block, _chainBlocks, { api }) {
  const poolRecords = '-some configs here, poolRecordsId-';
  const res = await sui.getObject(poolRecords);
  const pools = res.data.content.fields.records.fields.contents;
  const poolIds = pools.map((item) => item.fields.value);
  const poolList = await sui.getObjects(poolIds);
  poolList.forEach(({ type, content }) => {
    const coinA = type.split(', ')[1];
    const coinB = type.split(', ')[2].split('>')[0];

    api.add(coinA, content.fields.token1);
    api.add(coinB, content.fields.token2);
  });
}

module.exports = {
  timetravel: false,
  sui: {
    tvl,
  },
};
