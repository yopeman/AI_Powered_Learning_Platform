import { sequelize, DataTypes } from './config.js';

const FileContents = sequelize.define('FileContents', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    topicId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Topics',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    interactionId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Interactions',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    certificationId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Certifications',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { 
    timestamps: true,
    tableName: 'FileContents',
    uniqueKeys: {
        unq: {
            fields: ['topicId', 'interactionId', 'certificationId']
        }
    }
});

export default FileContents;