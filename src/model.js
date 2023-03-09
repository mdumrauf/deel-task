const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

class Profile extends Sequelize.Model {
  /**
   * Checks if it can pay for the given {Job}.
   *
   * @param {Job} job
   * @returns true or false
   */
  canPay(job) {
    return this.balance >= job.price;
  }
}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
    },
    type: {
      type: Sequelize.ENUM('client', 'contractor'),
    },
  },
  {
    sequelize,
    modelName: 'Profile',
  }
);

class Contract extends Sequelize.Model {
  /**
   * Checks if contract belongs to given profile.
   *
   * @param {Profile} profile
   * @returns true or false
   */
  belongsTo(profile) {
    return profile.id === this.ClientId || profile.id === this.ContractorId;
  }
}

Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
    },
  },
  {
    sequelize,
    modelName: 'Contract',
  }
);

class Job extends Sequelize.Model {
  /**
   * Checks if job belongs to given profile.
   *
   * @param {Profile} profile
   * @returns true or false
   */
  belongsTo(profile) {
    return profile.id === this.Contract.ClientId || profile.id === this.Contract.ContractorId;
  }

  /**
   * Checks if the given profile is the Client that owns the job.
   *
   * @param {Profile} profile
   * @returns true or false
   */
  isClient(profile) {
    return profile.id === this.Contract.ClientId;
  }

  /**
   * Checks if job is paid
   * @returns true or false
   */
  isPaid() {
    return this.paid;
  }
}
Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Job',
  }
);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
