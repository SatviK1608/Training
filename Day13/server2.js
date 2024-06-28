const { Sequelize, DataTypes,Transaction } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/dashboard');
const Account = require('./models/Account')(sequelize, DataTypes);

(async () => {
  await sequelize.sync({ force: true });
  const account = await Account.create({ balance: 1000 });

  //const transactionA = await sequelize.transaction();
  const transactionA = await sequelize.transaction({isolationLevel : Transaction.ISOLATION_LEVELS.SERIALIZABLE});


  try {
    const accountA = await Account.findByPk(account.id, { transaction: transactionA });
    console.log('Transaction A - Initial Balance:', accountA.balance); 
    accountA.balance -= 100;
    await accountA.save({ transaction: transactionA });
    console.log('Transaction A - Balance after deduction:', accountA.balance); 

    setTimeout(async () => {
      //const transactionB = await sequelize.transaction();
      const transactionB = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
      },);

      try {
        const accountB = await Account.findByPk(account.id, { transaction: transactionB });
        console.log('Transaction B - Initial Balance:', accountB.balance); 
        accountB.balance -= 100;
        await accountB.save({ transaction: transactionB });
        await transactionB.commit();
        console.log('Transaction B - Balance after deduction:', accountB.balance); 
      } catch (error) {
        await transactionB.rollback();
      }
    }, 1000);
  
    setTimeout(async () => {
      const accountA2 = await Account.findByPk(account.id, { transaction: transactionA });
      console.log('Transaction A - Balance after Transaction B:', accountA2.balance); // Output: 900 (expected 1000 if isolation was intact)
      await transactionA.commit();
    }, 2000);
  } catch (error) {
    await transactionA.rollback();
  }
})();
