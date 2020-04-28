/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('agent', {
    id: {
      value: 1,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id: {
      value: 2,
       type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id: {
      value: 3,
      type: DataTypes.iNTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id: {
      value: 4,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id: {
      value: 5,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      unique: true
    },
    browser_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'browser',
        key: 'id'
      }
    },
    browser_version_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'browser_version',
        key: 'id'
      }
    },
    engine_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'engine',
        key: 'id'
      }
    },
    engine_version_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'engine_version',
        key: 'id'
      }
    },
    os_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'os',
        key: 'id'
      }
    },
    os_version_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'os_version',
        key: 'id'
      }
    },
    device_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'device',
        key: 'id'
      }
    },
    device_type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'device_type',
        key: 'id'
      }
    },
    device_vendor_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'device_vendor',
        key: 'id'
      }
    },
    device_model_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'device_model',
        key: 'id'
      }
    },
    _v: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false, tableName: 'agent'
  });
};
