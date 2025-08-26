import { sequelize } from './config.js';
import Fields from './fields.js';
import Courses from './courses.js';
import Chapters from './chapters.js';
import Topics from './topics.js';
import Users from './users.js';
import Assistants from './assistants.js';
import Subscriptions from './subscriptions.js';
import Payments from './payments.js';
import Interactions from './interactions.js';
import Amounts from './amounts.js';
import Feedbacks from './feedbacks.js';
import Certifications from './certifications.js';
import Results from './results.js';
import FileContents from './file_contents.js'
import bcrypt from 'bcrypt';

(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await sequelize.sync({ force: false });
    await Users.sync();
    await Fields.sync();
    await Courses.sync();
    await Chapters.sync();
    await Topics.sync();
    await Subscriptions.sync();
    await Interactions.sync();
    await Assistants.sync();
    await Certifications.sync();
    await Results.sync();
    await Feedbacks.sync();
    await Amounts.sync();
    await Payments.sync();
    await FileContents.sync();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    
    const adminUser = await Users.findOne({ where: { role: 'admin' } });
    if (!adminUser) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash('0000', salt);
        await Users.create({
            first_name: 'Admin',
            last_name: 'Admin',
            email: 'admin@aiplp.com',
            phone: '0000000000',
            password: hashedPassword,
            role: 'admin',
        });
    }

    const amount = await Amounts.findOne();
    if (!amount) {
        await Amounts.create({ amount: 200.0 });
    }
})();

export {
    sequelize,
    Fields,
    Courses,
    Chapters,
    Topics,
    Users,
    Assistants,
    Subscriptions,
    Payments,
    Interactions,
    Amounts,
    Feedbacks,
    Certifications,
    Results,
    FileContents
};