

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rules: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false
    },
  }, {
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.password;
      },
      afterUpdate: (record) => {
        delete record.dataValues.password;
      },
    }
  });

  return Users
}