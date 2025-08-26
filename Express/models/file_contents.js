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
    topic_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Topics',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    interaction_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Interactions',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    certification_id: {
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
            fields: ['topic_id', 'interaction_id', 'certification_id']
        }
    }
});

export default FileContents;