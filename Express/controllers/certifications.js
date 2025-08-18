import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { Courses, Fields, Users, Certifications, Results } from "../models/index.js";
import { Op } from "sequelize";
import { generateQuestion_By_OpenAI, generateQuestion_By_GoogleGenAI } from '../utilities/ai-service.js';
import fs from 'fs/promises';
import { createError } from '../utilities/error-handlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function certification_questions(req, res, next) {
    const { fieldId } = req.params;
    if (!fieldId) {
        return next(createError(400, 'Field ID is required.'));
    }

    try {
        let certification = await Certifications.findOne({ where: { fieldId } });
        
        if (!certification) {
            certification = await Certifications.create({ fieldId });
        }

        if (certification.questions_file_path) {
            const questions = fs.readFile(certification.questions_file_path, 'utf8');
            return res.status(200).json({
                message: 'Certification questions fetched successfully.',
                data: JSON.parse(questions),
                success: true,
            });
        }

        const field = await Fields.findByPk(fieldId);
        const courses = await Courses.findAll({ where: { fieldId } });
        const generatedQuestions = await generateQuestion(field, JSON.stringify(courses));
        
        const dirPath = path.join(__dirname, `../public/Fields_${fieldId}/Certifications`);
        const filePath = path.join(dirPath, `Certifications_${certification.id}.json`);

        await fs.promises.mkdir(dirPath, { recursive: true });
        await fs.promises.writeFile(filePath, generatedQuestions);
        
        certification.questions_file_path = filePath;
        await certification.save();

        res.status(200).json({
            message: 'Certification questions generated successfully.',
            data: generatedQuestions,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function certification_result(req, res, next) {
    const { value, fieldId } = req.body;
    if (!value || !fieldId) {
        return next(createError(400, 'Certification details are required.'));
    }

    if (value < 50) {
        return next(createError(400, 'Your result is below 50%. Please try again.'));
    }

    try {
        const certification = await Certifications.findOne({ where: {fieldId} });
        if (!certification) {
        return next(createError(400, 'Certification not found'));
        }

        const result = await Results.create({
            userId: req.user.id,
            certificationId: certification.id,
            value,
        });

        res.status(201).json({
            message: 'Certification result submitted successfully.',
            data: result,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function certification_get_results(req, res, next) {
    try {
        const results = await Results.findAll();
        
        if (!results.length) {
            return next(createError(404, 'Certification results not found.'));
        }

        res.status(200).json({
            message: 'Certification results fetched successfully.',
            data: results,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function certification_get_by_id(req, res, next) {
    try {
        console.log(`\n\n\n\n\n\n00000000000000\n\n\n\n\n\n\n\n\n`);
        
        const { resultId } = req.params;

        if (!resultId) {
            return next(createError(400, 'Result ID is required.'));
        }

        const result = await Results.findByPk(resultId);

        if (!result) {
            return next(createError(404, 'Result not found.'));
        }

        res.status(200).json({
            message: 'Result fetched successfully.',
            data: result,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function certification_delete(req, res, next) {
    const { resultId } = req.params;
    if (!resultId) {
        return next(createError(400, 'Result ID is required.'));
    }

    try {
        const deletedResultCount = await Results.destroy({ where: { id: resultId } });

        if (!deletedResultCount) {
            return next(createError(404, 'Result not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Result deleted successfully.',
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function get_my_certificate_doc(req, res, next) {
    const { fieldId, userId } = req.params;
    if (!fieldId || !userId) {
        return next(createError(400, 'Field ID and User ID are required.'));
    }

    try {
        const field = await Fields.findByPk(fieldId);
        if (!field) {
            return next(createError(404, 'Field not found.'));
        }

        const user = await Users.findByPk(userId); // Corrected to use userId
        if (!user) {
            return next(createError(404, 'User not found.'));
        }
        
        const certification = await Certifications.findOne({ where: { fieldId } });
        if (!certification) {
            return next(createError(404, 'Certification not found.'));
        }

        const result = await Results.findOne({
            where: {
                [Op.and]: [
                    { userId },
                    { certificationId: certification.id },
                ],
            },
        });
        
        if (!result) {
            return next(createError(404, 'Certification result not found.'));
        }

        res.status(200).send(generate_certificate(field, result, user));
    } catch (err) {
        return next(err);
    }
}

async function redirect_certification_doc(req, res, next) {
    const result = await Results.findByPk(req.params.resultId);
    const userId = result.userId;
    const certification = await Certifications.findByPk(result.certificationId);
    const fieldId = certification.fieldId;

    res.status(200).redirect(`/certifications/field/${fieldId}/user/${userId}/doc`);
}

async function generateQuestion(field, courses) {
    // Uncomment the appropriate AI generation method
    // return await generateQuestion_By_OpenAI(field, courses);
    // return await generateQuestion_By_GoogleGenAI(field, courses);
    return `
[
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    }
]`;
}

function generate_certificate(field, result, user) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion | AiPLP</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;500&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            font-family: 'Montserrat', sans-serif;
        }

        .certificate {
            position: relative;
            width: 100%;
            max-width: 800px;
            background: #fff;
            border: 20px solid transparent;
            border-image: linear-gradient(135deg, #2c3e50, #3498db);
            border-image-slice: 30;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            padding: 50px 40px;
            text-align: center;
            overflow: hidden;
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 120px;
            font-weight: 800;
            color: rgba(52, 152, 219, 0.08);
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
        }

        .header {
            margin-bottom: 30px;
        }

        .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            color: #2c3e50;
            letter-spacing: 4px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .header p {
            color: #7f8c8d;
            font-size: 18px;
            position: relative;
            display: inline-block;
        }

        .header p::after {
            content: "";
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(to right, #3498db, #2c3e50);
            border-radius: 3px;
        }

        .recipient {
            margin: 40px 0;
        }

        .recipient h2 {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            color: #2980b9;
            margin: 10px 0;
            text-transform: uppercase;
        }

        .recipient p {
            font-size: 20px;
            color: #34495e;
        }

        .details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
            text-align: left;
        }

        .detail-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease;
        }

        .detail-card:hover {
            transform: translateY(-5px);
        }

        .detail-card h3 {
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }

        .detail-item {
            margin: 12px 0;
            display: flex;
        }

        .detail-item strong {
            display: inline-block;
            width: 140px;
            color: #7f8c8d;
            font-weight: 500;
        }

        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2c3e50);
            color: white;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: 500;
            font-size: 18px;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .signature {
            display: flex;
            justify-content: space-around;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px dashed #bdc3c7;
        }

        .signature div {
            text-align: center;
        }

        .signature p:first-child {
            margin-top: 20px;
            border-top: 1px solid #7f8c8d;
            display: inline-block;
            padding: 5px 30px;
        }

        .signature p:last-child {
            margin-top: 10px;
            color: #7f8c8d;
        }

        .print-btn {
            margin-top: 30px;
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            border: none;
            border-radius: 30px;
            padding: 14px 35px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
        }

        .print-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(44, 62, 80, 0.3);
        }

        .print-btn:active {
            transform: translateY(1px);
        }

        @media (max-width: 600px) {
            .certificate {
                padding: 30px 20px;
                border-width: 12px;
            }
            
            .header h1 {
                font-size: 32px;
            }
            
            .recipient h2 {
                font-size: 28px;
            }
            
            .details {
                grid-template-columns: 1fr;
            }
            
            .signature {
                flex-direction: column;
                gap: 30px;
            }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="watermark">CERTIFICATE</div>
        
        <div class="header">
            <h1>Certificate of Completion</h1>
            <p>This is to certify that</p>
        </div>
        
        <div class="recipient">
            <p>has successfully completed the course</p>
            <h2>${field.title}</h2>
            <p>with distinction</p>
        </div>
        
        <div class="badge">
            Achievement Score: ${result.value}%
        </div>
        
        <div class="details">
            <div class="detail-card">
                <h3>Field Details</h3>
                <div class="detail-item">
                    <strong>Title:</strong> ${field.title}
                </div>
                <div class="detail-item">
                    <strong>Description:</strong> ${field.description}
                </div>
                <div class="detail-item">
                    <strong>Duration:</strong> ${field.years_length} years
                </div>
            </div>
            
            <div class="detail-card">
                <h3>Recipient Information</h3>
                <div class="detail-item">
                    <strong>Full Name:</strong> ${user.first_name} ${user.last_name}
                </div>
                <div class="detail-item">
                    <strong>Email:</strong> ${user.email}
                </div>
                <div class="detail-item">
                    <strong>Phone:</strong> ${user.phone}
                </div>
            </div>
        </div>
        
        <div class="details">
            <div class="detail-card">
                <h3>Examination Details</h3>
                <div class="detail-item">
                    <strong>Score:</strong> ${result.value}%
                </div>
                <div class="detail-item">
                    <strong>Date Completed:</strong> ${new Date(result.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </div>
        
        <div class="signature">
            <div>
                <p></p>
                <p>AiPLP Director</p>
            </div>
            <div>
                <p></p>
                <p>Date of Issue</p>
            </div>
        </div>
        
        <button class="print-btn" onclick="window.print()">Download Certificate</button>
    </div>
</body>
</html>
    `;
}

export {
    certification_questions,
    certification_result,
    certification_get_results,
    certification_get_by_id,
    certification_delete,
    get_my_certificate_doc,
    redirect_certification_doc
};