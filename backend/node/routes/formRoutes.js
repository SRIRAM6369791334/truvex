const express = require('express');

const { requireAdmin } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { useLimiter } = require('../middleware/rateLimiters');
const { ok, created } = require('../utils/apiResponse');
const { queryRows, queryResult } = require('../utils/db');
const { sendMail, buildHtmlTemplate } = require('../utils/emailService');


function assertIdentifier(value) {
  if (!/^[a-z_]+$/.test(value)) {
    throw new Error(`Unsafe SQL identifier: ${value}`);
  }
}

function pickWritableFields(body, writableFields) {
  return writableFields.reduce((payload, field) => {
    if (body[field] !== undefined && body[field] !== '') {
      payload[field] = body[field];
    }

    return payload;
  }, {});
}

function validatePayload(payload, requiredFields) {
  const missing = requiredFields
    .filter((field) => !payload[field])
    .map((field) => ({ field, message: `${field} is required` }));

  if (missing.length) {
    throw new AppError('Validation failed', 400, missing);
  }
}

function createFormRouter({ table, writableFields, requiredFields }) {
  assertIdentifier(table);
  writableFields.forEach(assertIdentifier);

  const router = express.Router();

  router.post('/', useLimiter('form'), asyncHandler(async (req, res) => {
    const db = req.app.locals.db;
    const payload = pickWritableFields(req.body, writableFields);
    validatePayload(payload, requiredFields);

    const columns = Object.keys(payload);
    const placeholders = columns.map(() => '?').join(', ');
    const values = columns.map((field) => payload[field]);

    const result = await queryResult(
      db,
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
      values,
    );

    // Send email notifications in the background
    let userSubject = 'Submission received - Truvex';
    let userMessage = 'Thank you for your submission. We have received it and will get back to you soon.';
    let adminSubject = `[Admin Alert] New ${table} submission`;
    let adminMessage = `A new entry has been submitted to the ${table} table.`;

    if (table === 'contacts') {
      userSubject = "We've received your inquiry - Truvex";
      userMessage = `Hello ${payload.full_name || 'there'},\n\nThank you for contacting Truvex. We have received your inquiry and our team will get back to you shortly.`;
      adminSubject = '[Admin Alert] New Contact Message';
      adminMessage = 'A new contact message has been submitted on the contact form.';
    } else if (table === 'rfq_requests') {
      adminSubject = '[Admin Alert] New RFQ Sourcing Request';
      adminMessage = 'A new RFQ (Request for Quote) sourcing request has been submitted.';
    } else if (table === 'enquiries') {
      adminSubject = '[Admin Alert] New Quick Enquiry';
      adminMessage = 'A new quick enquiry has been submitted via the slideover/popup.';
    } else if (table === 'newsletters') {
      userSubject = 'Welcome to Truvex Newsletter!';
      userMessage = 'Thank you for subscribing to the Truvex newsletter! We will keep you updated with the latest sourcing opportunities, trends, and market insights.';
      adminSubject = '[Admin Alert] New Newsletter Subscriber';
      adminMessage = 'A new subscriber has joined the Truvex newsletter.';
    } else if (table === 'callback_requests') {
      adminSubject = '[Admin Alert] New Callback Request';
      adminMessage = 'A new callback request has been submitted.';
    } else if (table === 'service_leads') {
      userSubject = 'Your Sourcing Enquiry Received - Truvex';
      userMessage = `Hello ${payload.full_name || 'there'},\n\nThank you for contacting Truvex. We have received your sourcing enquiry and our team will get back to you shortly.`;
      adminSubject = '[Admin Alert] New Service Lead';
      adminMessage = 'A new service sourcing lead has been submitted.';
    }

    const adminHtml = buildHtmlTemplate({
      title: adminSubject,
      message: adminMessage,
      fields: payload,
      isUser: false,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      sendMail({
        to: adminEmail,
        subject: adminSubject,
        html: adminHtml,
      }).catch((err) => console.error('[BG MAIL ERROR] Admin email dispatch failed:', err));
    }

    if (payload.email) {
      const userHtml = buildHtmlTemplate({
        title: userSubject,
        message: userMessage,
        fields: payload,
        isUser: true,
      });

      sendMail({
        to: payload.email,
        subject: userSubject,
        html: userHtml,
      }).catch((err) => console.error('[BG MAIL ERROR] User email dispatch failed:', err));
    }

    return created(res, { id: result.insertId }, 'Form submitted successfully');
  }));

  router.get('/', requireAdmin, asyncHandler(async (req, res) => {
    const rows = await queryRows(
      req.app.locals.db,
      `SELECT *
       FROM ${table}
       ORDER BY created_at DESC
       LIMIT 200`,
    );

    return ok(res, rows, 'Records fetched successfully');
  }));

  return router;
}

module.exports = { createFormRouter };
